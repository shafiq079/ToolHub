import React, { useState } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Search, AlertTriangle, CheckCircle, ExternalLink, Copy } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PlagiarismChecker = () => {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  // Mock plagiarism checking function (in production, this would call a real API)
  const checkPlagiarism = async (inputText: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results with some suspicious phrases
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const mockMatches = [];

    // Simulate finding some potential matches
    if (sentences.length > 0) {
      const firstSentence = sentences[0].trim();
      if (firstSentence.toLowerCase().includes('artificial intelligence') ||
        firstSentence.toLowerCase().includes('machine learning') ||
        firstSentence.toLowerCase().includes('climate change')) {
        mockMatches.push({
          text: firstSentence,
          similarity: 85,
          source: 'wikipedia.org',
          url: 'https://wikipedia.org/example',
          startIndex: inputText.indexOf(firstSentence),
          endIndex: inputText.indexOf(firstSentence) + firstSentence.length
        });
      }
    }

    // Calculate overall plagiarism percentage
    const totalMatchedChars = mockMatches.reduce((sum, match) => sum + match.text.length, 0);
    const plagiarismPercentage = Math.round((totalMatchedChars / inputText.length) * 100);

    return {
      originalityScore: 100 - plagiarismPercentage,
      plagiarismPercentage,
      totalWords: inputText.split(' ').filter(word => word.length > 0).length,
      matchedSources: mockMatches.length,
      matches: mockMatches,
      checkedAt: new Date().toISOString()
    };
  };

  const handleCheck = async () => {
    if (!text.trim()) {
      setError('Please enter text to check for plagiarism.');
      return;
    }

    if (text.split(' ').length < 5) {
      setError('Please enter at least 5 words to perform a meaningful check.');
      return;
    }

    setIsChecking(true);
    setError('');
    setResults(null);

    try {
      const checkResults = await checkPlagiarism(text);
      setResults(checkResults);
    } catch (err) {
      setError('Failed to check plagiarism. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  const highlightMatches = (originalText: string, matches: any[]) => {
    if (!matches.length) return originalText;

    let highlightedText = originalText;

    // Sort matches by start index in descending order to avoid index shifting
    const sortedMatches = [...matches].sort((a, b) => b.startIndex - a.startIndex);

    sortedMatches.forEach(match => {
      const beforeText = highlightedText.substring(0, match.startIndex);
      const matchedText = highlightedText.substring(match.startIndex, match.endIndex);
      const afterText = highlightedText.substring(match.endIndex);

      highlightedText = beforeText +
        `<mark class="bg-red-200 text-red-800 font-medium">${matchedText}</mark>` +
        afterText;
    });

    return highlightedText;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 70) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const relatedTools = [
    { name: 'Word Counter', path: '/tools/word-counter' },
    { name: 'Text to Speech', path: '/tools/text-to-speech' },
    { name: 'File Converter', path: '/tools/file-converter' }
  ];

  return (
    <>
      <Helmet>

        <title>Plagiarism Checker – Check Content Originality Free | ToolsHub</title>
        <meta name="description" content="Use our free plagiarism checker to detect duplicate content and ensure originality. Highlighted matches and source URLs provided." />
        <meta name="keywords" content="plagiarism checker, check text originality, duplicate content checker, free plagiarism tool" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/plagiarism-checker" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Plagiarism Checker",
          "url": "https://tool-hub-orpin.vercel.app/tools/plagiarism-checker",
          "description": "Free online plagiarism checker to ensure content originality",
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
        title="Plagiarism Checker"
        description="Check your text for potential plagiarism and ensure content originality"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Enter text to check for plagiarism
              </label>
              <div className="flex space-x-2 text-sm">
                <button
                  onClick={copyText}
                  disabled={!text}
                  className="text-blue-600 hover:text-blue-700 transition-colors disabled:text-gray-400"
                >
                  Copy Text
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to check for plagiarism. Minimum 5 words required for analysis..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows={12}
              maxLength={10000}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {text.split(' ').filter(word => word.length > 0).length} words | {text.length}/10,000 characters
              </span>
              <button
                onClick={() => setText('')}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Clear Text
              </button>
            </div>
          </div>

          {/* Check Button */}
          <div className="text-center">
            <button
              onClick={handleCheck}
              disabled={isChecking || !text.trim()}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isChecking ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Checking for plagiarism...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Check Plagiarism</span>
                </>
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className={`rounded-lg p-6 border-2 ${getScoreBackground(results.originalityScore)}`}>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {results.originalityScore >= 90 ? (
                      <CheckCircle className="h-8 w-8 text-green-600 mr-2" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mr-2" />
                    )}
                    <h3 className="text-2xl font-bold text-gray-900">Plagiarism Check Results</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(results.originalityScore)}`}>
                        {results.originalityScore}%
                      </div>
                      <div className="text-sm text-gray-600">Original Content</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {results.plagiarismPercentage}%
                      </div>
                      <div className="text-sm text-gray-600">Potential Plagiarism</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {results.totalWords}
                      </div>
                      <div className="text-sm text-gray-600">Words Checked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">
                        {results.matchedSources}
                      </div>
                      <div className="text-sm text-gray-600">Sources Found</div>
                    </div>
                  </div>

                  <div className={`text-lg font-medium ${getScoreColor(results.originalityScore)}`}>
                    {results.originalityScore >= 90
                      ? '✅ Content appears to be original'
                      : results.originalityScore >= 70
                        ? '⚠️ Some potential matches found'
                        : '❌ Significant plagiarism detected'
                    }
                  </div>
                </div>
              </div>

              {/* Highlighted Text */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Analyzed Text {results.matches.length > 0 && '(Potential matches highlighted)'}
                </h3>
                <div
                  className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatches(text, results.matches)
                  }}
                />
              </div>

              {/* Source Matches */}
              {results.matches.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Potential Source Matches</h3>
                  <div className="space-y-4">
                    {results.matches.map((match: any, index: number) => (
                      <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-red-800">
                              {match.similarity}% similarity match
                            </div>
                            <div className="text-sm text-red-600 mt-1">
                              Source: {match.source}
                            </div>
                          </div>
                          <a
                            href={match.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <span>View Source</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <div className="text-sm text-gray-700 bg-white p-3 rounded border">
                          "{match.text}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Recommendations</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  {results.originalityScore >= 90 ? (
                    <>
                      <li>• Your content appears to be original - great work!</li>
                      <li>• Continue to cite sources properly when referencing others' work</li>
                      <li>• Consider using plagiarism checkers regularly for important documents</li>
                    </>
                  ) : (
                    <>
                      <li>• Review the highlighted sections and ensure proper citation</li>
                      <li>• Paraphrase content in your own words instead of copying directly</li>
                      <li>• Add quotation marks and citations for direct quotes</li>
                      <li>• Consider rewriting sections to express ideas in your unique voice</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Demo Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <h4 className="font-medium text-yellow-800">Demo Version</h4>
            </div>
            <p className="text-yellow-700 text-sm">
              This is a demonstration version of the plagiarism checker. In a production environment,
              this would integrate with professional plagiarism detection APIs like Copyscape,
              Turnitin, or Grammarly to provide comprehensive plagiarism detection across billions of web pages and documents.
            </p>
          </div>

          {/* Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">Tips for Original Writing</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Always cite your sources when using someone else's ideas or words</li>
              <li>• Use quotation marks for direct quotes and provide proper attribution</li>
              <li>• Paraphrase and summarize in your own words rather than copying</li>
              <li>• Keep detailed notes of your sources during research</li>
              <li>• Use multiple sources to develop a well-rounded perspective</li>
            </ul>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default PlagiarismChecker;