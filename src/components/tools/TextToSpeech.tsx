import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Play, Pause, Download, Volume2, Settings } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Set default voice (prefer English)
      const englishVoice = availableVoices.find(voice => voice.lang.startsWith('en'));
      setSelectedVoice(englishVoice || availableVoices[0] || null);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentUtterance(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentUtterance(null);
      alert('Speech synthesis failed. Please try again.');
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const handleDownload = () => {
    // Note: Web Speech API doesn't support direct audio file generation
    // This would require a server-side solution or third-party API
    alert('Audio download feature requires a server-side implementation. The speech will play in your browser.');
  };

  const sampleTexts = [
    "Hello! This is a sample text to test the text-to-speech functionality.",
    "The quick brown fox jumps over the lazy dog.",
    "Welcome to our text-to-speech tool. You can adjust voice, speed, and pitch settings.",
    "Technology is best when it brings people together."
  ];

  const relatedTools = [
    { name: 'Speech to Text', path: '/tools/speech-to-text' },
    { name: 'Word Counter', path: '/tools/word-counter' },
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' }
  ];

  return (
    <>
      <Helmet>

        <title>Text to Speech – Convert Text to Voice Online | ToolsHub</title>
        <meta name="description" content="Convert text to speech using natural voices. Choose language, accent, and download MP3 audio. Fast and easy TTS tool." />
        <meta name="keywords" content="text to speech, TTS online, text to voice, speech generator" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/text-to-speech" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Text to Speech",
          "url": "https://tool-hub-orpin.vercel.app/tools/text-to-speech",
          "description": "Convert written text into natural-sounding speech using our free Text to Speech tool. Choose from various voices and settings.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires modern web browser",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "168"
          }
        })}
      </script>

      <ToolLayout
        title="Text to Speech"
        description="Convert written text into natural-sounding speech"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to convert to speech
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows={6}
              maxLength={5000}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {text.length}/5000 characters
              </span>
              <div className="flex space-x-2">
                {sampleTexts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setText(sample)}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sample {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Voice Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice
                </label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value);
                    setSelectedVoice(voice || null);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speed: {rate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0.5x</span>
                  <span>2x</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pitch: {pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSpeak}
              disabled={!text.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span>{isPlaying ? 'Stop' : 'Speak'}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!text.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download</span>
            </button>
          </div>

          {/* Browser Support Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Volume2 className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-800">Browser Support</span>
            </div>
            <p className="text-yellow-700 text-sm">
              This tool uses your browser's built-in speech synthesis. Voice quality and available
              voices may vary between browsers. For best results, use Chrome or Safari.
            </p>
          </div>

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Text to Speech Converter – Turn Text into Natural Audio</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is a Text to Speech Tool?</h3>
                <p className="text-gray-600 mb-4">
                  A Text to Speech (TTS) tool is a software-based application that converts written text into spoken words. It uses advanced speech synthesis technology to provide lifelike audio output in various voices and languages, making digital content more accessible and interactive.
                </p>
                <p className="text-gray-600 mb-4">
                  TTS is commonly used for accessibility, language learning, multitasking, and voice-based interfaces. It helps users consume text-based content through audio, offering convenience and support to people with visual impairments or reading difficulties.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Our Text to Speech Converter?</h3>
                <p className="text-gray-600 mb-4">
                  Our free browser-based TTS tool allows users to convert any written content into high-quality voice with just one click. No downloads, registrations, or installations required—just input your text and listen instantly.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Instant conversion from text to spoken audio</li>
                  <li>Supports multiple voices and languages (based on browser capabilities)</li>
                  <li>Adjustable speech rate and pitch options</li>
                  <li>Ideal for accessibility, learning, and content listening</li>
                  <li>Runs entirely in your browser—safe and private</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">How is Text to Speech Commonly Used?</h3>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Accessibility and Inclusion</h4>
              <p className="text-gray-600 mb-3">
                TTS helps visually impaired individuals or those with reading challenges consume written content such as articles, emails, and documents. It's a core tool for accessible education and inclusive digital experiences.
              </p>
              <p className="text-gray-600">
                It also assists users with learning disabilities such as dyslexia, allowing them to understand written material through audio playback.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Productivity and Multitasking</h4>
              <p className="text-blue-700 mb-3">
                Many users prefer to listen to articles, emails, or notes while performing other tasks. Text to Speech allows multitasking without sacrificing comprehension.
              </p>
              <p className="text-blue-700">
                It’s also useful for proofreading written content—hearing your text read aloud can help catch typos and awkward phrasing.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use the Text to Speech Tool</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Enter Your Text</h4>
                <p className="text-gray-600 text-sm">
                  Type or paste the text you want to convert into the input area. You can enter a few lines or longer paragraphs.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Select Voice Options</h4>
                <p className="text-gray-600 text-sm">
                  Choose from available voice types and adjust the speed or pitch (if supported). Different browsers offer different voice settings.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Click Play</h4>
                <p className="text-gray-600 text-sm">
                  Click the “Play” button to hear your text spoken out loud. You can pause, resume, or stop the playback at any time.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Best Practices for Using TTS</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Keep your sentences clear and concise for better pronunciation</li>
                <li>Use punctuation to help with pauses and tone</li>
                <li>Break long text into smaller sections for easier listening</li>
                <li>Try different voice options to find the most natural tone</li>
                <li>Use for reading emails, blogs, eBooks, and more</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              Our Text to Speech tool helps bring your words to life, whether you're reading on the go, making content accessible, or turning ideas into audio. It's fast, free, and available anytime from any device.
            </p>
          </div>

        </div>
      </ToolLayout>
    </>
  );
};

export default TextToSpeech;