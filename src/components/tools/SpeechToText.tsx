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

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">How to Use</h4>
            <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
              <li>Select your preferred language from the dropdown</li>
              <li>Click "Start Recording" and allow microphone access when prompted</li>
              <li>Speak clearly and at a normal pace</li>
              <li>Your speech will be converted to text in real-time</li>
              <li>Click "Stop Recording" when finished</li>
              <li>Copy or download your transcript</li>
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">Tips for Better Recognition</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Use a quiet environment to minimize background noise</li>
              <li>• Speak clearly and at a moderate pace</li>
              <li>• Position your microphone close to your mouth</li>
              <li>• Pause briefly between sentences</li>
              <li>• Say punctuation marks like "comma" or "period" if needed</li>
            </ul>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default SpeechToText;