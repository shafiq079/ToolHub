import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { FileText, Copy, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });
  const [keywordDensity, setKeywordDensity] = useState<Array<{ word: string, count: number, density: number }>>([]);

  const calculateStats = (inputText: string) => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;

    // Words count
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;

    // Sentences count
    const sentences = inputText === '' ? 0 : inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Paragraphs count
    const paragraphs = inputText.trim() === '' ? 0 : inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });

    // Calculate keyword density
    if (words > 0) {
      const wordList = inputText.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2); // Filter out words shorter than 3 characters

      const wordCount: { [key: string]: number } = {};
      wordList.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      const density = Object.entries(wordCount)
        .map(([word, count]) => ({
          word,
          count,
          density: Math.round((count / words) * 10000) / 100
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setKeywordDensity(density);
    } else {
      setKeywordDensity([]);
    }
  };

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      alert('Failed to read clipboard. Please paste manually.');
    }
  };

  const clearText = () => {
    setText('');
  };

  const copyStats = () => {
    const statsText = `
Text Statistics:
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingTime} minute(s)
    `.trim();

    navigator.clipboard.writeText(statsText);
    alert('Statistics copied to clipboard!');
  };

  const relatedTools = [
    { name: 'Text to Speech', path: '/tools/text-to-speech' },
    { name: 'Plagiarism Checker', path: '/tools/plagiarism-checker' },
    { name: 'Password Generator', path: '/tools/password-generator' }
  ];

  return (
    <>
      <Helmet>


        <title>Word & Character Counter – Count Text Instantly | ToolsHub</title>
        <meta name="description" content="Count words, characters, sentences, and paragraphs in your text. Free and real-time text analyzer." />
        <meta name="keywords" content="word counter, character counter, text analyzer, word count online" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/word-counter" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Word Counter",
          "url": "https://tool-hub-orpin.vercel.app/tools/word-counter",
          "description": "Count words, characters, sentences, and paragraphs in your text. Free and real-time text analyzer.",
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
        title="Word Counter"
        description="Count words, characters, sentences, and analyze text statistics"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Enter or paste your text
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={pasteFromClipboard}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Paste from Clipboard
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={clearText}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows={12}
            />
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Characters', value: stats.characters, color: 'bg-blue-50 text-blue-700' },
              { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, color: 'bg-green-50 text-green-700' },
              { label: 'Words', value: stats.words, color: 'bg-purple-50 text-purple-700' },
              { label: 'Sentences', value: stats.sentences, color: 'bg-orange-50 text-orange-700' },
              { label: 'Paragraphs', value: stats.paragraphs, color: 'bg-pink-50 text-pink-700' },
              { label: 'Reading Time', value: `${stats.readingTime} min`, color: 'bg-indigo-50 text-indigo-700' }
            ].map((stat, index) => (
              <div key={index} className={`${stat.color} rounded-lg p-4 text-center`}>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Copy Stats Button */}
          <div className="flex justify-center">
            <button
              onClick={copyStats}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copy Statistics</span>
            </button>
          </div>

          {/* Keyword Density */}
          {keywordDensity.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Keyword Density</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Word</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Count</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordDensity.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-3 font-medium">{item.word}</td>
                        <td className="py-2 px-3">{item.count}</td>
                        <td className="py-2 px-3">{item.density}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to Text Analysis and Word Counting</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Word Counting Matters</h3>
                <p className="text-gray-600 mb-4">
                  Word counting is essential for writers, students, content creators, and professionals who need to meet specific length requirements. Whether you're writing essays, articles, social media posts, or academic papers, accurate word counts ensure you stay within guidelines and communicate effectively.
                </p>
                <p className="text-gray-600 mb-4">
                  Our word counter provides comprehensive text analysis beyond simple word counts, including character analysis, reading time estimation, and keyword density tracking. This detailed analysis helps optimize content for various platforms and purposes.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Features of Our Text Analyzer</h3>
                <p className="text-gray-600 mb-4">
                  Our advanced text analysis tool provides real-time statistics as you type, making it perfect for live editing and content optimization. The tool processes text locally in your browser, ensuring privacy while delivering instant results.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Real-time word and character counting</li>
                  <li>Sentence and paragraph analysis</li>
                  <li>Reading time estimation based on average reading speed</li>
                  <li>Keyword density analysis for SEO optimization</li>
                  <li>Copy-to-clipboard functionality for easy sharing</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Understanding Text Metrics</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Word Count Applications</h4>
                <p className="text-blue-700 mb-3">
                  Word counts are crucial for various writing contexts. Academic essays typically require specific word ranges, social media platforms have character limits, and content marketing often targets optimal word counts for SEO. Our counter helps you meet these requirements precisely.
                </p>
                <p className="text-blue-700">
                  Different platforms have different optimal lengths: Twitter posts (280 characters), Facebook posts (40-80 words), blog posts (1,500-2,500 words), and academic essays (varies by assignment). Use our counter to optimize for your specific platform.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-3">Character Count Importance</h4>
                <p className="text-green-700 mb-3">
                  Character counting is essential for platforms with strict limits like Twitter, SMS messages, and meta descriptions for SEO. Our tool provides both total characters and characters excluding spaces, giving you flexibility for different requirements.
                </p>
                <p className="text-green-700">
                  Meta descriptions should be 150-160 characters, title tags under 60 characters, and social media posts often have specific character limits. Accurate character counting ensures your content displays properly across all platforms.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Reading Time Estimation</h4>
                <p className="text-purple-700 mb-3">
                  Our reading time calculator uses the average reading speed of 200 words per minute to estimate how long it takes to read your content. This metric is valuable for content planning, user experience optimization, and setting reader expectations.
                </p>
                <p className="text-purple-700">
                  Reading time helps readers decide whether to engage with your content and helps you structure articles appropriately. Blog posts with 7-minute reading times typically perform well, while social media content should be much shorter.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Keyword Density Analysis</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">SEO Optimization</h4>
                <p className="text-gray-600 text-sm">
                  Keyword density analysis helps optimize content for search engines by showing which words appear most frequently. Aim for 1-3% density for target keywords while maintaining natural, readable content.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Content Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Understanding word frequency helps identify the main themes and topics in your content. This analysis is useful for content audits, topic clustering, and ensuring comprehensive coverage of your subject matter.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Writing Improvement</h4>
                <p className="text-gray-600 text-sm">
                  Keyword density analysis can reveal overused words or phrases, helping you diversify your vocabulary and improve writing quality. Look for opportunities to use synonyms and vary your language.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Best Practices for Different Content Types</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li><strong>Blog Posts:</strong> 1,500-2,500 words for comprehensive coverage and SEO benefits</li>
                <li><strong>Social Media:</strong> Keep posts concise - 40-80 words for Facebook, 280 characters for Twitter</li>
                <li><strong>Academic Writing:</strong> Follow assignment guidelines precisely, typically 500-5,000 words</li>
                <li><strong>Email Marketing:</strong> 50-125 words for optimal engagement rates</li>
                <li><strong>Product Descriptions:</strong> 150-300 words balancing detail with readability</li>
                <li><strong>Meta Descriptions:</strong> 150-160 characters for proper search result display</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Using the Word Counter Effectively</h3>
            <p className="text-gray-600 mb-4">
              To get the most from our word counter, paste or type your content into the text area and watch real-time statistics update as you edit. Use the keyword density analysis to identify overused words and optimize for SEO. The reading time estimate helps gauge content length for your audience.
            </p>
            <p className="text-gray-600">
              For writers working on multiple drafts, use the copy statistics feature to track progress over time. The tool works entirely in your browser, ensuring your content remains private while providing professional-grade text analysis capabilities.
            </p>
          </div>

          {/* Reading Statistics */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Reading Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700 text-sm">
              <div>
                <strong>Average reading time:</strong> {stats.readingTime} minute(s)
                <br />
                <em>(Based on 200 words per minute)</em>
              </div>
              <div>
                <strong>Speaking time:</strong> {Math.ceil(stats.words / 150)} minute(s)
                <br />
                <em>(Based on 150 words per minute)</em>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default WordCounter;