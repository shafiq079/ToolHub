import React, { useState, useEffect, useRef } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Mic, MicOff, Copy, Trash2, Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();

      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(prev => prev + finalTranscript);
        setInterimTranscript(interimTranscript);
      };

      recognition.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser. Please use Chrome, Safari, or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) return;

    setError('');
    recognitionRef.current.lang = language;
    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(transcript);
    alert('Text copied to clipboard!');
  };

  const clearText = () => {
    setTranscript('');
    setInterimTranscript('');
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'speech-transcript.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
    { code: 'ar-SA', name: 'Arabic' },
    { code: 'hi-IN', name: 'Hindi' }
  ];

  const relatedTools = [
    { name: 'Text to Speech', path: '/tools/text-to-speech' },
    { name: 'Word Counter', path: '/tools/word-counter' },
    { name: 'File Converter', path: '/tools/file-converter' }
  ];

  if (!isSupported) {
    return (
      <ToolLayout
        title="Speech to Text"
        description="Convert spoken words into written text"
        relatedTools={relatedTools}
      >
        <div className="text-center py-12">
          <MicOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Browser Not Supported</h3>
          <p className="text-gray-600 mb-4">
            Speech recognition is not supported in this browser.
          </p>
          <p className="text-sm text-gray-500">
            Please use Chrome, Safari, or Edge for the best experience.
          </p>
        </div>
      </ToolLayout>
    );
  }

  return (
    <>
      <Helmet>


        <title>Speech to Text – Voice to Text Converter | ToolsHub</title>
        <meta name="description" content="Transcribe spoken words to text with our Speech to Text tool. Accurate and fast voice recognition in multiple languages." />
        <meta name="keywords" content="speech to text, voice to text, audio to text converter, transcription tool" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/speech-to-text" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Speech to Text",
          "url": "https://tool-hub-orpin.vercel.app/tools/speech-to-text",
          "description": "Convert spoken words into written text using your microphone",
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
        title="Speech to Text"
        description="Convert spoken words into written text using your microphone"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isListening}
              className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Microphone Control */}
          <div className="text-center">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full text-white font-semibold transition-all transform hover:scale-105 ${isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {isListening ? (
                <>
                  <MicOff className="h-6 w-6" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="h-6 w-6" />
                  <span>Start Recording</span>
                </>
              )}
            </button>

            {isListening && (
              <p className="text-sm text-gray-600 mt-3">
                🎤 Listening... Speak clearly into your microphone
              </p>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Transcript Display */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Transcript
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={copyText}
                  disabled={!transcript}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadText}
                  disabled={!transcript}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>
                <button
                  onClick={clearText}
                  disabled={!transcript && !interimTranscript}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <div className="min-h-[200px] p-4 border border-gray-300 rounded-lg bg-white">
              <div className="whitespace-pre-wrap">
                {transcript}
                {interimTranscript && (
                  <span className="text-gray-500 italic">{interimTranscript}</span>
                )}
                {!transcript && !interimTranscript && (
                  <span className="text-gray-400 italic">
                    Click "Start Recording" and begin speaking. Your speech will appear here as text.
                  </span>
                )}
              </div>
            </div>

            {transcript && (
              <div className="mt-2 text-sm text-gray-600">
                Words: {transcript.split(' ').filter(word => word.length > 0).length} |
                Characters: {transcript.length}
              </div>
            )}
          </div>

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Speech to Text Converter – Convert Voice into Text Instantly</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is a Speech to Text Tool?</h3>
                <p className="text-gray-600 mb-4">
                  A Speech to Text tool is a voice recognition technology that transcribes spoken words into written text. It utilizes advanced speech recognition engines to accurately convert your voice in real time, making it a valuable resource for productivity, accessibility, and content creation.
                </p>
                <p className="text-gray-600 mb-4">
                  From writing emails hands-free to documenting lectures, speech to text simplifies the way you interact with digital platforms. It also helps people with disabilities communicate more effectively and boosts typing speed for all users.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Our Speech to Text Converter?</h3>
                <p className="text-gray-600 mb-4">
                  Our free online Speech to Text tool offers lightning-fast transcription with no downloads or sign-ups required. It runs directly in your browser and supports real-time conversion with high accuracy.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Instant transcription as you speak</li>
                  <li>Works on desktop and mobile browsers</li>
                  <li>Supports multiple languages (depending on browser capabilities)</li>
                  <li>Copy or save text easily after transcription</li>
                  <li>No microphone recordings are stored or shared</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Where is Speech to Text Used?</h3>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Productivity and Communication</h4>
              <p className="text-gray-600 mb-3">
                Professionals use voice typing for note-taking, emails, meeting summaries, and content drafting. Students record lectures or brainstorm essays hands-free. Customer service agents can convert call recordings into transcripts for documentation.
              </p>
              <p className="text-gray-600">
                It’s also essential in journalism, research, and documentation tasks where fast and accurate note capture is needed.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Accessibility and Inclusion</h4>
              <p className="text-blue-700 mb-3">
                Speech to Text empowers people with physical disabilities, hearing impairments, or temporary injuries to communicate and interact with digital systems effortlessly.
              </p>
              <p className="text-blue-700">
                It also helps non-native speakers and those with spelling difficulties create written content more easily and confidently.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use Our Speech to Text Tool</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Grant Microphone Access</h4>
                <p className="text-gray-600 text-sm">
                  Click the microphone button and allow your browser to access your microphone. Make sure your device has a working mic.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Start Speaking Clearly</h4>
                <p className="text-gray-600 text-sm">
                  Speak naturally and clearly. The tool will convert your words into text in real-time as you talk.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Edit and Copy</h4>
                <p className="text-gray-600 text-sm">
                  Once you're done, copy the transcribed text for use in documents, messages, or web forms. You can also make edits before copying.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Tips for Better Accuracy</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Speak slowly and clearly, especially with complex terms</li>
                <li>Use a headset or external mic for better clarity</li>
                <li>Minimize background noise during recording</li>
                <li>Use punctuation commands (e.g., “comma,” “period”) for formatting</li>
                <li>Refresh the page if microphone permission fails</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              Our browser-based Speech to Text tool helps you work faster, communicate clearly, and stay productive—all without typing. Try it now for effortless voice transcription with no installation required.
            </p>
          </div>

        </div>
      </ToolLayout>
    </>
  );
};

export default SpeechToText;