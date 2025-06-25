import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Activity, User, Scale } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [result, setResult] = useState<any>(null);

  const calculateBMI = () => {
    if (!height || !weight) {
      setResult(null);
      return;
    }

    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100; // Convert cm to meters
      weightInKg = parseFloat(weight);
    } else {
      // Imperial: height in inches, weight in pounds
      heightInMeters = (parseFloat(height) * 2.54) / 100; // Convert inches to meters
      weightInKg = parseFloat(weight) * 0.453592; // Convert pounds to kg
    }

    if (heightInMeters <= 0 || weightInKg <= 0) {
      setResult({ error: 'Please enter valid height and weight values' });
      return;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    let category = '';
    let categoryColor = '';
    let healthRisk = '';
    let recommendations = [];

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-blue-600';
      healthRisk = 'Increased risk';
      recommendations = [
        'Consult with a healthcare provider',
        'Consider a balanced diet with adequate calories',
        'Include strength training exercises',
        'Monitor your health regularly'
      ];
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      categoryColor = 'text-green-600';
      healthRisk = 'Low risk';
      recommendations = [
        'Maintain your current healthy lifestyle',
        'Continue regular physical activity',
        'Eat a balanced, nutritious diet',
        'Regular health check-ups'
      ];
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      categoryColor = 'text-yellow-600';
      healthRisk = 'Increased risk';
      recommendations = [
        'Consider a balanced weight loss plan',
        'Increase physical activity',
        'Reduce caloric intake moderately',
        'Consult with a healthcare provider'
      ];
    } else {
      category = 'Obese';
      categoryColor = 'text-red-600';
      healthRisk = 'High risk';
      recommendations = [
        'Consult with a healthcare provider immediately',
        'Consider professional weight management',
        'Increase physical activity gradually',
        'Focus on long-term lifestyle changes'
      ];
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      categoryColor,
      healthRisk,
      recommendations,
      idealWeightRange: {
        min: (18.5 * heightInMeters * heightInMeters).toFixed(1),
        max: (24.9 * heightInMeters * heightInMeters).toFixed(1)
      }
    });
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, unit]);

  const relatedTools = [
    { name: 'Age Calculator', path: '/tools/age-calculator' },
    { name: 'Unit Converter', path: '/tools/unit-converter' },
    { name: 'EMI Calculator', path: '/tools/emi-calculator' }
  ];

  return (
    <>
      <Helmet>

        <title>BMI Calculator – Body Mass Index Checker | ToolsHub</title>
        <meta name="description" content="Calculate your BMI with our easy-to-use BMI Calculator. Enter your weight and height to check your health status." />
        <meta name="keywords" content="BMI calculator, body mass index, health calculator, weight calculator" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/bmi-calculator" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "BMI Calculator",
          "url": "https://tool-hub-orpin.vercel.app/tools/bmi-calculator",
          "description": "Calculate your Body Mass Index (BMI) to assess your health status based on your height and weight.",
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
        title="BMI Calculator"
        description="Calculate your Body Mass Index and get health recommendations"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Unit Selection */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setUnit('metric')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === 'metric'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Metric (cm, kg)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === 'imperial'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Imperial (ft/in, lbs)
              </button>
            </div>
          </div>

          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height {unit === 'metric' ? '(cm)' : '(inches)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {unit === 'imperial' && (
                <p className="text-xs text-gray-500 mt-1">
                  Example: 5'8" = 68 inches
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in pounds'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <Scale className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {result.error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{result.error}</p>
                </div>
              ) : (
                <>
                  {/* BMI Result */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <Activity className="h-8 w-8 text-blue-600 mr-2" />
                        <h3 className="text-2xl font-bold text-gray-900">Your BMI</h3>
                      </div>
                      <div className="text-5xl font-bold text-blue-600 mb-2">{result.bmi}</div>
                      <div className={`text-xl font-semibold ${result.categoryColor} mb-2`}>
                        {result.category}
                      </div>
                      <div className="text-gray-600">Health Risk: {result.healthRisk}</div>
                    </div>
                  </div>

                  {/* BMI Scale */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">BMI Scale</h4>
                    <div className="space-y-2">
                      {[
                        { range: 'Below 18.5', category: 'Underweight', color: 'bg-blue-500' },
                        { range: '18.5 - 24.9', category: 'Normal weight', color: 'bg-green-500' },
                        { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-yellow-500' },
                        { range: '30.0 and above', category: 'Obese', color: 'bg-red-500' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-4 h-4 rounded ${item.color} mr-3`}></div>
                          <div className="flex-1 flex justify-between">
                            <span className="text-sm text-gray-600">{item.range}</span>
                            <span className={`text-sm font-medium ${result.category === item.category ? result.categoryColor : 'text-gray-600'
                              }`}>
                              {item.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal Weight Range */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Ideal Weight Range</h4>
                    <p className="text-green-700">
                      For your height, a healthy weight range is{' '}
                      <span className="font-semibold">
                        {result.idealWeightRange.min} - {result.idealWeightRange.max}{' '}
                        {unit === 'metric' ? 'kg' : 'lbs'}
                      </span>
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-medium text-blue-800 mb-3">Health Recommendations</h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((recommendation: string, index: number) => (
                        <li key={index} className="flex items-start text-blue-700 text-sm">
                          <span className="text-blue-500 mr-2">•</span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding BMI: Your Complete Health Assessment Guide</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is Body Mass Index (BMI)?</h3>
                <p className="text-gray-600 mb-4">
                  Body Mass Index (BMI) is a widely-used health assessment tool that evaluates whether your weight is appropriate for your height. Developed in the 19th century by Belgian mathematician Adolphe Quetelet, BMI provides a quick screening method to categorize individuals into weight status categories that may indicate health risks.
                </p>
                <p className="text-gray-600 mb-4">
                  Our BMI calculator uses the standard formula: weight (kg) divided by height (meters) squared, or weight (lbs) divided by height (inches) squared multiplied by 703. This calculation provides a numerical value that corresponds to specific health categories, helping healthcare providers and individuals assess potential health risks associated with weight.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why BMI Matters for Your Health</h3>
                <p className="text-gray-600 mb-4">
                  BMI serves as an important screening tool for identifying potential weight-related health issues. Research shows strong correlations between BMI categories and risks for conditions like heart disease, diabetes, high blood pressure, and certain cancers. While BMI isn't a diagnostic tool, it provides valuable insights for health monitoring.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Quick assessment of weight-related health risks</li>
                  <li>Standardized measurement used globally by healthcare providers</li>
                  <li>Helpful for tracking weight management progress</li>
                  <li>Useful for insurance and medical evaluations</li>
                  <li>Foundation for personalized health recommendations</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">BMI Categories and Health Implications</h3>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Underweight (BMI Below 18.5)</h4>
                <p className="text-blue-700 mb-3">
                  Being underweight may indicate insufficient nutrition or underlying health conditions. While some people are naturally thin, significantly low BMI can lead to weakened immune system, osteoporosis, and fertility issues. Our calculator helps identify if you fall into this category and provides guidance for healthy weight gain.
                </p>
                <p className="text-blue-700">
                  If your BMI indicates underweight status, consider consulting with a healthcare provider to rule out underlying conditions and develop a healthy weight gain plan that includes nutrient-dense foods and appropriate exercise.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-3">Normal Weight (BMI 18.5-24.9)</h4>
                <p className="text-green-700 mb-3">
                  A BMI in the normal range indicates a healthy weight for your height and is associated with the lowest risk of weight-related health problems. People in this category typically have reduced risks of heart disease, diabetes, and other chronic conditions compared to other BMI categories.
                </p>
                <p className="text-green-700">
                  Maintaining a normal BMI involves balanced nutrition, regular physical activity, and healthy lifestyle choices. Our BMI calculator helps you monitor your status and maintain optimal health.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-800 mb-3">Overweight (BMI 25.0-29.9)</h4>
                <p className="text-yellow-700 mb-3">
                  Overweight status indicates excess weight that may pose health risks. While not as concerning as obesity, being overweight increases the risk of developing high blood pressure, type 2 diabetes, and cardiovascular disease. Early intervention can prevent progression to obesity.
                </p>
                <p className="text-yellow-700">
                  Weight loss of even 5-10% can significantly improve health outcomes. Focus on sustainable lifestyle changes including portion control, increased physical activity, and dietary improvements rather than extreme dieting.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-800 mb-3">Obese (BMI 30.0 and Above)</h4>
                <p className="text-red-700 mb-3">
                  Obesity significantly increases the risk of serious health conditions including heart disease, stroke, type 2 diabetes, sleep apnea, and certain cancers. The good news is that even modest weight loss can lead to substantial health improvements.
                </p>
                <p className="text-red-700">
                  If your BMI indicates obesity, consider working with healthcare professionals to develop a comprehensive weight management plan. This may include dietary counseling, exercise programs, behavioral therapy, and in some cases, medical interventions.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">How to Use Our BMI Calculator Effectively</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Accurate Measurements</h4>
                <p className="text-gray-600 text-sm">
                  For the most accurate BMI calculation, measure your height without shoes and your weight in minimal clothing, preferably in the morning. Use the same scale consistently and ensure it's calibrated properly.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Choose the Right Units</h4>
                <p className="text-gray-600 text-sm">
                  Our calculator supports both metric (centimeters and kilograms) and imperial (inches and pounds) measurements. Select the unit system you're most comfortable with for accurate input.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Interpret Results Carefully</h4>
                <p className="text-gray-600 text-sm">
                  Remember that BMI is a screening tool, not a diagnostic test. Consider factors like muscle mass, bone density, and overall health when interpreting results. Athletes and very muscular individuals may have high BMIs despite being healthy.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">BMI Limitations and Considerations</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>BMI doesn't distinguish between muscle mass and fat mass</li>
                <li>May not be accurate for athletes with high muscle mass</li>
                <li>Different considerations apply to children, elderly, and pregnant women</li>
                <li>Ethnicity can affect the relationship between BMI and health risks</li>
                <li>Should be used alongside other health assessments for complete evaluation</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              Our BMI calculator provides a valuable starting point for understanding your weight status and potential health risks. Use it as part of a comprehensive approach to health that includes regular medical check-ups, balanced nutrition, physical activity, and attention to overall well-being. Remember that healthy living is about more than just numbers—it's about feeling your best and maintaining long-term wellness.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Important Disclaimer</h4>
            <p className="text-yellow-700 text-sm">
              BMI is a screening tool and does not diagnose body fatness or health. It may not be accurate for
              athletes, pregnant women, elderly, or children. Always consult with a healthcare professional
              for personalized health advice and before making significant lifestyle changes.
            </p>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default BMICalculator;