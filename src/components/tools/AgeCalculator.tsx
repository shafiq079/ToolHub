import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Calendar, Copy } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      setResult({ error: 'Birth date cannot be in the future' });
      return;
    }

    const diffTime = target.getTime() - birth.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const birthYear = birth.getFullYear();
    const historicalFacts = [
      `In ${birthYear}, the world population was approximately ${Math.floor(3.5 + (birthYear - 1970) * 0.08)} billion.`,
      `${birthYear} was ${2024 - birthYear} years ago.`,
      `You were born in the ${Math.floor((birthYear - 1900) / 10) * 10}s decade.`
    ];

    setResult({
      years,
      months,
      days,
      totalDays: diffDays,
      totalHours: diffHours,
      totalMinutes: diffMinutes,
      historicalFact: historicalFacts[Math.floor(Math.random() * historicalFacts.length)]
    });
  };

  useEffect(() => {
    if (birthDate) {
      calculateAge();
    }
  }, [birthDate, targetDate]);

  const copyResult = () => {
    if (result && !result.error) {
      const text = `Age: ${result.years} years, ${result.months} months, ${result.days} days (${result.totalDays} total days)`;
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  };

  const relatedTools = [
    { name: 'BMI Calculator', path: '/tools/bmi-calculator' },
    { name: 'Unit Converter', path: '/tools/unit-converter' },
    { name: 'Timezone Converter', path: '/tools/timezone-converter' }
  ];

  return (
    <>
      <Helmet>
        <title>Age Calculator – Find Your Age Instantly | ToolsHub</title>
        <meta name="description" content="Use our free Age Calculator to calculate your exact age in years, months, days, and more. Fast, accurate, and easy to use." />
        <meta name="keywords" content="age calculator, how old am I, birth date calculator, calculate age online" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/age-calculator" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Age Calculator",
          "operatingSystem": "All",
          "applicationCategory": "WebApplication",
          "url": "https://tool-hub-orpin.vercel.app/tools/age-calculator",
          "description": "Calculate your age in years, months, days, hours, and minutes using our free online age calculator.",
          "publisher": {
            "@type": "Organization",
            "name": "ToolsHub"
          }
        })}
      </script>
      <ToolLayout
        title="Age Calculator"
        description="Calculate your exact age in years, months, days, hours, and minutes"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  max={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculate Age On (Optional)
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {result && (
            <div className="mt-8">
              {result.error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{result.error}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Your Age</h3>
                      <button
                        onClick={copyResult}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="text-sm">Copy</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{result.years}</div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{result.months}</div>
                        <div className="text-sm text-gray-600">Months</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{result.days}</div>
                        <div className="text-sm text-gray-600">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{result.totalDays.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Days</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Total Hours: <span className="font-medium">{result.totalHours.toLocaleString()}</span></div>
                      <div>Total Minutes: <span className="font-medium">{result.totalMinutes.toLocaleString()}</span></div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Fun Fact</h4>
                    <p className="text-green-700 text-sm">{result.historicalFact}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to Age Calculation</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is an Age Calculator?</h3>
                <p className="text-gray-600 mb-4">
                  An age calculator is a digital tool that determines your exact age by calculating the time difference between your birth date and any specified date. Unlike simple mental math, our age calculator provides precise results down to days, hours, and even minutes, making it perfect for official documents, milestone celebrations, or personal curiosity.
                </p>
                <p className="text-gray-600 mb-4">
                  This tool is particularly useful for determining eligibility for age-restricted activities, calculating retirement dates, or planning milestone celebrations. Many people use age calculators for legal documents, insurance applications, or simply to satisfy their curiosity about their exact age in different units of time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Our Age Calculator?</h3>
                <p className="text-gray-600 mb-4">
                  Our free online age calculator goes beyond basic age calculation by providing comprehensive results including total days lived, hours, and minutes. This level of detail is valuable for various purposes, from academic research to personal milestones tracking.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Instant calculation with precise results</li>
                  <li>Multiple time units for comprehensive age analysis</li>
                  <li>Historical context and fun facts about your birth year</li>
                  <li>Copy-to-clipboard functionality for easy sharing</li>
                  <li>No registration or personal data storage required</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Common Uses for Age Calculators</h3>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Professional and Legal Applications</h4>
              <p className="text-gray-600 mb-3">
                Age calculators are essential tools in many professional contexts. HR departments use them to verify employment eligibility, insurance companies calculate premiums based on exact age, and legal professionals determine age-related rights and responsibilities. Our calculator provides the precision needed for these critical applications.
              </p>
              <p className="text-gray-600">
                Healthcare providers also rely on accurate age calculations for dosage determinations, treatment protocols, and health screening schedules. The ability to calculate age to the day can be crucial in pediatric care and geriatric medicine.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Personal and Social Uses</h4>
              <p className="text-blue-700 mb-3">
                Beyond professional applications, age calculators serve many personal purposes. Plan milestone birthdays, calculate relationship anniversaries, or determine how many days you've been alive. Many people enjoy discovering interesting facts about their birth year and comparing their age in different time units.
              </p>
              <p className="text-blue-700">
                Social media enthusiasts often use age calculators to create engaging content about their life milestones, while parents track their children's development with precise age measurements. The tool also helps in planning age-appropriate activities and understanding developmental stages.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use the Age Calculator Effectively</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Enter Your Birth Date</h4>
                <p className="text-gray-600 text-sm">
                  Select your exact birth date using the date picker. The calculator accepts dates from the early 1900s to the present day, ensuring accuracy for users of all ages.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Choose Target Date (Optional)</h4>
                <p className="text-gray-600 text-sm">
                  By default, the calculator uses today's date, but you can specify any future or past date to calculate your age on that specific day. This feature is useful for planning events or determining past ages.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: View Comprehensive Results</h4>
                <p className="text-gray-600 text-sm">
                  Get instant results showing your age in years, months, days, total days lived, hours, and minutes. The calculator also provides interesting historical context about your birth year.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Tips for Accurate Age Calculation</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Always use your exact birth date, including the correct month and day</li>
                <li>Consider time zones if calculating age for international purposes</li>
                <li>Remember that leap years affect total day calculations</li>
                <li>Use the copy function to save results for official documents</li>
                <li>Double-check your birth date entry to ensure accuracy</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              Whether you need to calculate age for professional requirements, personal curiosity, or milestone planning, our age calculator provides the accuracy and detail you need. The tool processes all calculations locally in your browser, ensuring your personal information remains private while delivering instant, precise results.
            </p>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default AgeCalculator;