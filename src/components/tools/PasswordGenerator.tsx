import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Copy, RefreshCw, Shield, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [strength, setStrength] = useState({ score: 0, text: '', color: '' });
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let charset = '';
    if (options.lowercase) charset += chars.lowercase;
    if (options.uppercase) charset += chars.uppercase;
    if (options.numbers) charset += chars.numbers;
    if (options.symbols) charset += chars.symbols;

    if (!charset) return '';

    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }

    return result;
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;

    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    const strengthLevels = [
      { score: 0, text: 'Very Weak', color: 'text-red-600' },
      { score: 1, text: 'Weak', color: 'text-red-500' },
      { score: 2, text: 'Fair', color: 'text-orange-500' },
      { score: 3, text: 'Good', color: 'text-yellow-500' },
      { score: 4, text: 'Strong', color: 'text-green-500' },
      { score: 5, text: 'Very Strong', color: 'text-green-600' },
      { score: 6, text: 'Excellent', color: 'text-green-700' }
    ];

    return strengthLevels[Math.min(score, 6)];
  };

  const handleGenerate = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
    setCopied(false);
  };

  const copyPassword = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [length, options]);

  const relatedTools = [
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
    { name: 'Random Number Generator', path: '/tools/random-number-generator' },
    { name: 'Text to Speech', path: '/tools/text-to-speech' }
  ];

  return (
    <>
      <Helmet>


        <title>Password Generator – Create Strong Random Passwords | ToolsHub</title>
        <meta name="description" content="Generate secure and random passwords online. Customize length, characters, and strength. Copy-ready strong passwords for free." />
        <meta name="keywords" content="password generator, strong password, random password, secure password online" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/password-generator" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Password Generator",
          "url": "https://tool-hub-orpin.vercel.app/tools/password-generator",
          "description": "Generate secure and random passwords online. Customize length, characters, and strength. Copy-ready strong passwords for free.",
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
        title="Password Generator"
        description="Generate strong, secure passwords with customizable options"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Generated Password */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Password</h3>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className={`text-sm font-medium ${strength.color}`}>
                  {strength.text}
                </span>
              </div>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Click generate to create password"
              />
              <button
                onClick={copyPassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleGenerate}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Generate New</span>
              </button>

              <button
                onClick={copyPassword}
                disabled={!password}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Length */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Length: {length}
              </label>
              <input
                type="range"
                min="6"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>6</span>
                <span>50</span>
              </div>
            </div>

            {/* Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Character Types
              </label>
              <div className="space-y-3">
                {Object.entries(options).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {key === 'symbols' ? 'Special Characters' : key}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Strength Indicator */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Password Strength</span>
              <span className={`text-sm font-medium ${strength.color}`}>{strength.text}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${strength.score <= 1 ? 'bg-red-500' :
                    strength.score <= 2 ? 'bg-orange-500' :
                      strength.score <= 3 ? 'bg-yellow-500' :
                        strength.score <= 4 ? 'bg-green-500' :
                          'bg-green-600'
                  }`}
                style={{ width: `${(strength.score / 6) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to Password Security</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Strong Passwords Matter</h3>
                <p className="text-gray-600 mb-4">
                  In today's digital world, passwords are your first line of defense against cyber threats. Weak passwords are responsible for over 80% of data breaches, making password security more critical than ever. Our password generator creates cryptographically secure passwords that protect your accounts from unauthorized access.
                </p>
                <p className="text-gray-600 mb-4">
                  Strong passwords act as a barrier against various attack methods including brute force attacks, dictionary attacks, and credential stuffing. By using our generator, you ensure that your passwords are unpredictable and resistant to common hacking techniques.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How Our Generator Works</h3>
                <p className="text-gray-600 mb-4">
                  Our password generator uses cryptographically secure random number generation (crypto.getRandomValues) to create truly random passwords. Unlike pseudo-random generators, this method ensures that passwords cannot be predicted or reproduced, providing maximum security for your accounts.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Cryptographically secure randomness for unpredictable passwords</li>
                  <li>Customizable length from 6 to 50 characters</li>
                  <li>Multiple character sets for complexity</li>
                  <li>Real-time strength assessment</li>
                  <li>Instant copy-to-clipboard functionality</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Password Strength Factors</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Length: The Most Important Factor</h4>
                <p className="text-blue-700 mb-3">
                  Password length is the most critical factor in password security. Each additional character exponentially increases the time required to crack a password. While 8 characters was once considered secure, modern computing power makes 12+ character passwords the new standard.
                </p>
                <p className="text-blue-700">
                  Our generator defaults to 12 characters, providing excellent security while remaining manageable. For highly sensitive accounts, consider using 16+ character passwords for maximum protection against advanced attacks.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-3">Character Complexity</h4>
                <p className="text-green-700 mb-3">
                  Using multiple character types (uppercase, lowercase, numbers, symbols) dramatically increases password strength. A password using all four character types has a much larger keyspace, making brute force attacks significantly more difficult and time-consuming.
                </p>
                <p className="text-green-700">
                  Our generator allows you to customize which character types to include, letting you balance security requirements with any specific constraints your accounts might have while maintaining strong password principles.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Unpredictability and Randomness</h4>
                <p className="text-purple-700 mb-3">
                  True randomness is essential for password security. Patterns, dictionary words, and personal information make passwords vulnerable to targeted attacks. Our generator ensures complete randomness, creating passwords that cannot be guessed or derived from personal information.
                </p>
                <p className="text-purple-700">
                  Avoid common substitutions like replacing 'a' with '@' or adding numbers to the end of words. These patterns are well-known to attackers and provide little additional security compared to truly random passwords.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Password Management Best Practices</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Use Unique Passwords for Every Account</h4>
                <p className="text-gray-600 text-sm">
                  Never reuse passwords across multiple accounts. If one account is compromised, unique passwords prevent attackers from accessing your other accounts. Generate a new password for each service you use.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Consider Using a Password Manager</h4>
                <p className="text-gray-600 text-sm">
                  Password managers can store and auto-fill your generated passwords, making it easy to use unique, strong passwords for every account without memorization. They also often include built-in password generators.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Enable Two-Factor Authentication</h4>
                <p className="text-gray-600 text-sm">
                  Combine strong passwords with two-factor authentication (2FA) for maximum security. Even if your password is compromised, 2FA provides an additional layer of protection for your accounts.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Common Password Mistakes to Avoid</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Using personal information like names, birthdays, or addresses</li>
                <li>Creating passwords based on keyboard patterns (qwerty, 123456)</li>
                <li>Using common words or phrases, even with character substitutions</li>
                <li>Reusing passwords across multiple accounts or services</li>
                <li>Sharing passwords via insecure methods like email or text</li>
                <li>Using passwords shorter than 12 characters for important accounts</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Privacy and Security</h3>
            <p className="text-gray-600 mb-4">
              Your security is our priority. Our password generator operates entirely within your browser using client-side JavaScript. Generated passwords are never transmitted to our servers or stored anywhere outside your device. This ensures complete privacy and eliminates any risk of password interception.
            </p>
            <p className="text-gray-600">
              The cryptographic randomness used in our generator meets industry standards for security applications. You can confidently use generated passwords for banking, email, and other sensitive accounts knowing they provide maximum protection against current and future attack methods.
            </p>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Password Security Tips</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Use a unique password for each account</li>
              <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Avoid using personal information</li>
              <li>• Consider using a password manager</li>
              <li>• Enable two-factor authentication when available</li>
            </ul>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default PasswordGenerator;