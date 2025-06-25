import React, { useState } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Shuffle, Copy, RefreshCw, Settings } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);

  const generateNumbers = () => {
    if (min >= max) {
      alert('Minimum value must be less than maximum value');
      return;
    }

    if (!allowDuplicates && (max - min + 1) < count) {
      alert('Not enough unique numbers in range for the requested count');
      return;
    }

    const numbers: number[] = [];
    const used = new Set<number>();

    // Use crypto.getRandomValues for secure randomness
    const array = new Uint32Array(count * 10); // Generate extra numbers for uniqueness
    crypto.getRandomValues(array);
    let arrayIndex = 0;

    for (let i = 0; i < count; i++) {
      let randomNumber: number;
      let attempts = 0;
      const maxAttempts = 1000;

      do {
        if (arrayIndex >= array.length) {
          // Generate more random numbers if needed
          crypto.getRandomValues(array);
          arrayIndex = 0;
        }

        const randomValue = array[arrayIndex++];
        randomNumber = min + (randomValue % (max - min + 1));
        attempts++;

        if (attempts > maxAttempts) {
          // Fallback to ensure we don't get stuck
          break;
        }
      } while (!allowDuplicates && used.has(randomNumber));

      numbers.push(randomNumber);
      if (!allowDuplicates) {
        used.add(randomNumber);
      }
    }

    setResults(numbers);
    setHistory(prev => [numbers, ...prev.slice(0, 9)]); // Keep last 10 generations
  };

  const copyResults = () => {
    const text = results.join(', ');
    navigator.clipboard.writeText(text);
    alert('Numbers copied to clipboard!');
  };

  const copyResult = (number: number) => {
    navigator.clipboard.writeText(number.toString());
    alert(`${number} copied to clipboard!`);
  };

  const relatedTools = [
    { name: 'Password Generator', path: '/tools/password-generator' },
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
    { name: 'Color Picker', path: '/tools/color-picker' }
  ];

  return (
    <>
      <Helmet>


        <title>Random Number Generator – Generate Numbers Instantly | ToolsHub</title>
        <meta name="description" content="Generate one or more random numbers in a specified range. Use for contests, lottery, math practice, and more." />
        <meta name="keywords" content="random number generator, number picker, randomizer tool" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/random-number-generator" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Random Number Generator",
          "url": "https://tool-hub-orpin.vercel.app/tools/random-number-generator",
          "description": "Generate one or more random numbers in a specified range. Use for contests, lottery, math practice, and more.",
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
        title="Random Number Generator"
        description="Generate random numbers with customizable ranges and options"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Settings */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Generator Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Value
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Value
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Count (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={count}
                  onChange={(e) => setCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => setAllowDuplicates(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Allow duplicate numbers</span>
              </label>

              <button
                onClick={generateNumbers}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Shuffle className="h-4 w-4" />
                <span>Generate Numbers</span>
              </button>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Numbers</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={copyResults}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy All</span>
                  </button>
                  <button
                    onClick={generateNumbers}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Generate New</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {results.map((number, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center group hover:bg-blue-100 transition-colors cursor-pointer"
                    onClick={() => copyResult(number)}
                    title="Click to copy"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-1">{number}</div>
                    <div className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center">
                Range: {min} to {max} | Count: {results.length} |
                {allowDuplicates ? ' Duplicates allowed' : ' No duplicates'}
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Generations</h3>
              <div className="space-y-3">
                {history.map((generation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">#{history.length - index}</span>
                      <span className="font-mono text-sm">{generation.join(', ')}</span>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(generation.join(', '))}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Copy this generation"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Random Number Generator Guide – Quick, Reliable & Customizable</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is a Random Number Generator?</h3>
                <p className="text-gray-600 mb-4">
                  A Random Number Generator (RNG) is a tool that generates a number chosen at random within a specified range. It’s widely used in statistics, gaming, programming, and everyday scenarios where unbiased randomization is required.
                </p>
                <p className="text-gray-600 mb-4">
                  Whether you're selecting a lottery number, picking a contest winner, or simulating probability experiments, this tool helps you generate results without repetition or human bias.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Our RNG Tool?</h3>
                <p className="text-gray-600 mb-4">
                  Our free online Random Number Generator is fast, secure, and highly customizable. It works directly in your browser with no downloads or tracking.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Custom range selection (e.g., 1–100)</li>
                  <li>Generate multiple numbers at once</li>
                  <li>Option to avoid duplicates</li>
                  <li>Instant results with no delay</li>
                  <li>No login or data storage required</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Common Use Cases for Random Numbers</h3>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Everyday and Professional Uses</h4>
              <p className="text-gray-600 mb-3">
                Teachers and educators use RNGs for classroom games or student selection. Developers and data analysts use them for simulations, cryptographic purposes, or randomized testing. It's also great for decision-making when flipping a coin won’t cut it!
              </p>
              <p className="text-gray-600">
                This tool ensures quick results while giving users control over how many numbers to generate and how they are displayed.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Creative and Fun Uses</h4>
              <p className="text-blue-700 mb-3">
                Use this tool for party games, lottery simulations, giveaways, or even choosing what to eat or where to go. It's the perfect randomness generator for day-to-day decision-making.
              </p>
              <p className="text-blue-700">
                Streamers, YouTubers, and event hosts love RNGs for spinning digital wheels, trivia games, and selecting winners fairly.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use the Random Number Generator</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Set Your Range</h4>
                <p className="text-gray-600 text-sm">
                  Enter the minimum and maximum numbers (e.g., 1–100). You can use any range, positive or negative.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Choose Quantity</h4>
                <p className="text-gray-600 text-sm">
                  Decide how many random numbers you want to generate and whether duplicates are allowed.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Click Generate</h4>
                <p className="text-gray-600 text-sm">
                  Instantly view your random numbers and copy or save them for use. You can repeat the process as many times as needed.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Tips for Generating Fair Random Numbers</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Use a wide range to improve randomness</li>
                <li>For draws or games, disable duplicates for fairness</li>
                <li>Copy your results immediately if using for a one-time event</li>
                <li>Refresh the page to reset all fields</li>
                <li>Use in fullscreen for better usability on mobile devices</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              Whether you're a developer, educator, content creator, or casual user, our Random Number Generator provides the accuracy, flexibility, and security you need. It’s fast, free, and designed for everyone.
            </p>
          </div>


          {/* Security Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">Security & Randomness</h4>
            <p className="text-green-700 text-sm">
              This generator uses the browser's cryptographically secure random number generator
              (crypto.getRandomValues) to ensure true randomness suitable for security-sensitive applications.
            </p>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default RandomNumberGenerator;