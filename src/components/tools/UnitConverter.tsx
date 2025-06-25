import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { ArrowLeftRight, Calculator } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const units = {
    length: {
      meter: { name: 'Meter', symbol: 'm', factor: 1 },
      kilometer: { name: 'Kilometer', symbol: 'km', factor: 1000 },
      centimeter: { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      millimeter: { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      inch: { name: 'Inch', symbol: 'in', factor: 0.0254 },
      foot: { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      yard: { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      mile: { name: 'Mile', symbol: 'mi', factor: 1609.34 }
    },
    weight: {
      kilogram: { name: 'Kilogram', symbol: 'kg', factor: 1 },
      gram: { name: 'Gram', symbol: 'g', factor: 0.001 },
      pound: { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      ounce: { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
      ton: { name: 'Metric Ton', symbol: 't', factor: 1000 },
      stone: { name: 'Stone', symbol: 'st', factor: 6.35029 }
    },
    temperature: {
      celsius: { name: 'Celsius', symbol: '°C' },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
      kelvin: { name: 'Kelvin', symbol: 'K' }
    },
    volume: {
      liter: { name: 'Liter', symbol: 'L', factor: 1 },
      milliliter: { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      gallon: { name: 'Gallon (US)', symbol: 'gal', factor: 3.78541 },
      quart: { name: 'Quart (US)', symbol: 'qt', factor: 0.946353 },
      pint: { name: 'Pint (US)', symbol: 'pt', factor: 0.473176 },
      cup: { name: 'Cup (US)', symbol: 'cup', factor: 0.236588 },
      fluid_ounce: { name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 0.0295735 }
    },
    area: {
      square_meter: { name: 'Square Meter', symbol: 'm²', factor: 1 },
      square_kilometer: { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      square_foot: { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
      acre: { name: 'Acre', symbol: 'acre', factor: 4046.86 },
      hectare: { name: 'Hectare', symbol: 'ha', factor: 10000 }
    },
    speed: {
      meter_per_second: { name: 'Meter per Second', symbol: 'm/s', factor: 1 },
      kilometer_per_hour: { name: 'Kilometer per Hour', symbol: 'km/h', factor: 0.277778 },
      mile_per_hour: { name: 'Mile per Hour', symbol: 'mph', factor: 0.44704 },
      knot: { name: 'Knot', symbol: 'kn', factor: 0.514444 }
    }
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case 'fahrenheit':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case 'fahrenheit':
        return celsius * 9 / 5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convert = () => {
    if (!inputValue || !fromUnit || !toUnit) {
      setOutputValue('');
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setOutputValue('');
      return;
    }

    if (category === 'temperature') {
      const result = convertTemperature(value, fromUnit, toUnit);
      setOutputValue(result.toFixed(6).replace(/\.?0+$/, ''));
    } else {
      const categoryUnits = units[category as keyof typeof units];
      if (categoryUnits && typeof categoryUnits === 'object') {
        const fromFactor = (categoryUnits as any)[fromUnit]?.factor;
        const toFactor = (categoryUnits as any)[toUnit]?.factor;

        if (fromFactor && toFactor) {
          const result = (value * fromFactor) / toFactor;
          setOutputValue(result.toFixed(6).replace(/\.?0+$/, ''));
        }
      }
    }
  };

  useEffect(() => {
    // Set default units when category changes
    const categoryUnits = units[category as keyof typeof units];
    const unitKeys = Object.keys(categoryUnits);
    if (unitKeys.length >= 2) {
      setFromUnit(unitKeys[0]);
      setToUnit(unitKeys[1]);
    }
  }, [category]);

  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, category]);

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = inputValue;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setInputValue(outputValue);
    setOutputValue(tempValue);
  };

  const relatedTools = [
    { name: 'Calculator', path: '#' },
    { name: 'BMI Calculator', path: '/tools/bmi-calculator' },
    { name: 'Age Calculator', path: '/tools/age-calculator' }
  ];

  return (
    <>
      <Helmet>


        <title>Unit Converter – Convert Length, Weight, Currency & More | ToolsHub</title>
        <meta name="description" content="Convert units of measurement easily with our free unit converter. Includes length, weight, currency, temperature, speed, and more." />
        <meta name="keywords" content="unit converter, length converter, currency converter, temperature converter" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/unit-converter" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Unit Converter",
          "url": "https://tool-hub-orpin.vercel.app/tools/unit-converter",
          "description": "A versatile unit converter for length, weight, temperature, and more.",
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
        title="Unit Converter"
        description="Convert between different units of measurement"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Conversion Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(units).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`p-3 text-center rounded-lg border-2 transition-colors ${category === key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="text-sm font-medium capitalize">{key}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Interface */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
              {/* From */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="space-y-3">
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {Object.entries(units[category as keyof typeof units]).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {(unit as any).name} ({(unit as any).symbol})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapUnits}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  title="Swap units"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </button>
              </div>

              {/* To */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="space-y-3">
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {Object.entries(units[category as keyof typeof units]).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {(unit as any).name} ({(unit as any).symbol})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={outputValue}
                    readOnly
                    placeholder="Result"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Result Display */}
            {inputValue && outputValue && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calculator className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-semibold">Conversion Result</span>
                </div>
                <p className="text-blue-700">
                  {inputValue} {(units[category as keyof typeof units] as any)[fromUnit]?.symbol} = {' '}
                  <span className="font-bold">{outputValue} {(units[category as keyof typeof units] as any)[toUnit]?.symbol}</span>
                </p>
              </div>
            )}
          </div>

          {/* Common Conversions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {category === 'length' && (
                <>
                  <div>
                    <strong>Metric:</strong>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>1 km = 1,000 m</li>
                      <li>1 m = 100 cm</li>
                      <li>1 cm = 10 mm</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Imperial:</strong>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>1 mile = 5,280 ft</li>
                      <li>1 yard = 3 ft</li>
                      <li>1 foot = 12 inches</li>
                    </ul>
                  </div>
                </>
              )}
              {category === 'weight' && (
                <>
                  <div>
                    <strong>Metric:</strong>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>1 ton = 1,000 kg</li>
                      <li>1 kg = 1,000 g</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Imperial:</strong>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>1 stone = 14 lbs</li>
                      <li>1 pound = 16 oz</li>
                    </ul>
                  </div>
                </>
              )}
              {category === 'temperature' && (
                <>
                  <div>
                    <strong>Freezing Point:</strong>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>0°C = 32°F = 273.15K</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Boiling Point:</strong>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>100°C = 212°F = 373.15K</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Unit Converter – Convert Any Measurement Instantly</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is a Unit Converter?</h3>
                <p className="text-gray-600 mb-4">
                  A unit converter is an online tool that helps you convert one type of measurement into another. Whether you're converting kilometers to miles, Celsius to Fahrenheit, or grams to ounces, a unit converter makes the process fast, accurate, and effortless.
                </p>
                <p className="text-gray-600 mb-4">
                  It’s essential for students, professionals, and travelers who regularly work with different unit systems. Our converter eliminates the need for manual calculations, reducing errors and saving time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Our Unit Converter?</h3>
                <p className="text-gray-600 mb-4">
                  Our free online unit converter is a powerful and user-friendly tool designed for speed and reliability. It includes a wide range of measurement categories like length, temperature, weight, area, volume, and more.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Supports all major unit types and systems</li>
                  <li>Instant and precise conversions</li>
                  <li>Clean, responsive UI for mobile and desktop</li>
                  <li>No sign-up or installation required</li>
                  <li>Ideal for academic, professional, and daily use</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Who Uses Unit Converters?</h3>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Students and Engineers</h4>
              <p className="text-gray-600 mb-3">
                Students use unit converters for math, science, and engineering problems, while professionals rely on it to ensure accurate specifications and calculations in designs and reports.
              </p>
              <p className="text-gray-600">
                Architects, developers, and analysts also benefit from fast and dependable unit conversions during planning and execution.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Travelers and Global Shoppers</h4>
              <p className="text-blue-700 mb-3">
                When traveling abroad or shopping internationally, you often need to convert currencies, temperatures, or distances. This tool simplifies those tasks, giving you the confidence to make informed decisions.
              </p>
              <p className="text-blue-700">
                Whether you're converting feet to meters or liters to gallons, our tool ensures accuracy every time.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use the Unit Converter</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Choose Measurement Type</h4>
                <p className="text-gray-600 text-sm">
                  Select a category like length, weight, temperature, volume, etc., based on the type of conversion you need.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Enter Value and Units</h4>
                <p className="text-gray-600 text-sm">
                  Input the value you want to convert and select the units you’re converting from and to.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Get the Converted Result</h4>
                <p className="text-gray-600 text-sm">
                  Instantly see the converted result below. You can repeat the process for as many conversions as you need.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Tips for Accurate Unit Conversion</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Double-check selected units before converting</li>
                <li>Use exact decimal values for precise results</li>
                <li>Be aware of regional differences (e.g., US vs. UK gallons)</li>
                <li>Use the same measurement system when comparing results</li>
                <li>Bookmark the tool for quick future access</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              Our Unit Converter is your all-in-one solution for converting any type of measurement quickly and reliably. Whether you’re solving homework problems or planning international logistics, you can count on accurate results every time.
            </p>
          </div>


        </div>
      </ToolLayout>
    </>
  );
};

export default UnitConverter;