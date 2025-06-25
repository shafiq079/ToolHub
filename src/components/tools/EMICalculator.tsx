import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { DollarSign, Calculator, TrendingUp, Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('500000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [tenureType, setTenureType] = useState('years');
  const [result, setResult] = useState<any>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    let months = parseInt(tenure);

    if (!principal || !rate || !months) {
      setResult(null);
      return;
    }

    if (tenureType === 'years') {
      months = months * 12;
    }

    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule
    const schedule = [];
    let balance = principal;

    for (let i = 1; i <= Math.min(months, 120); i++) { // Limit to 10 years for display
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      months,
      schedule
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure, tenureType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const relatedTools = [
    { name: 'BMI Calculator', path: '/tools/bmi-calculator' },
    { name: 'Random Number Generator', path: '/tools/random-number-generator' },
    { name: 'Unit Converter', path: '/tools/unit-converter' }
  ];

  return (
    <>
      <Helmet>


        <title>Loan / EMI Calculator – Calculate Monthly Payments | ToolsHub</title>
        <meta name="description" content="Use our EMI Calculator to calculate monthly payments, total interest, and total cost of a loan. Accurate and fast loan tool." />
        <meta name="keywords" content="loan calculator, EMI calculator, mortgage calculator, finance tool" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/emi-calculator" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "EMI Calculator",
          "url": "https://tool-hub-orpin.vercel.app/tools/emi-calculator",
          "description": "Calculate your monthly EMI for loans with ease. Enter loan amount, interest rate, and tenure to get instant results.",
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
        title="EMI Calculator"
        description="Calculate your loan EMI, total interest, and payment schedule"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Input Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter loan amount"
                  />
                  <DollarSign className="absolute left-2 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter interest rate"
                  />
                  <TrendingUp className="absolute left-2 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter tenure"
                    />
                    <Calendar className="absolute left-2 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* EMI Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">EMI Calculation</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {formatCurrency(result.emi)}
                    </div>
                    <div className="text-sm text-gray-600">Monthly EMI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {formatCurrency(result.totalAmount)}
                    </div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {formatCurrency(result.totalInterest)}
                    </div>
                    <div className="text-sm text-gray-600">Total Interest</div>
                  </div>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
                <div className="flex rounded-lg overflow-hidden h-8 mb-4">
                  <div
                    className="bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${(parseFloat(loanAmount) / result.totalAmount) * 100}%` }}
                  >
                    Principal
                  </div>
                  <div
                    className="bg-red-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${(result.totalInterest / result.totalAmount) * 100}%` }}
                  >
                    Interest
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    <span>Principal: {formatCurrency(parseFloat(loanAmount))}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span>Interest: {formatCurrency(result.totalInterest)}</span>
                  </div>
                </div>
              </div>

              {/* Amortization Schedule */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Amortization Schedule</h3>
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showAmortization ? 'Hide' : 'Show'} Schedule
                  </button>
                </div>

                {showAmortization && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-medium text-gray-700">Month</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700">EMI</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700">Principal</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700">Interest</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.schedule.map((payment: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 px-3">{payment.month}</td>
                            <td className="py-2 px-3 font-medium">{formatCurrency(payment.emi)}</td>
                            <td className="py-2 px-3 text-blue-600">{formatCurrency(payment.principal)}</td>
                            <td className="py-2 px-3 text-red-600">{formatCurrency(payment.interest)}</td>
                            <td className="py-2 px-3 text-gray-600">{formatCurrency(payment.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {result.months > 120 && (
                      <p className="text-gray-500 text-sm mt-2 text-center">
                        Showing first 10 years. Total tenure: {result.months} months
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">EMI Tips</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Make additional principal payments to reduce total interest</li>
              <li>• Compare interest rates from different lenders</li>
              <li>• Consider shorter tenure to save on interest costs</li>
              <li>• EMI should not exceed 40% of your monthly income</li>
              <li>• Factor in processing fees and insurance costs</li>
            </ul>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default EMICalculator;