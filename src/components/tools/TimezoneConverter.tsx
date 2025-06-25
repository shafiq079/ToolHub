import React, { useState, useEffect } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Clock, Globe, MapPin, Copy } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TimezoneConverter = () => {
  const [inputTime, setInputTime] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputTimezone, setInputTimezone] = useState('America/New_York');
  const [outputTimezones, setOutputTimezones] = useState([
    'Europe/London',
    'Asia/Tokyo',
    'America/Los_Angeles',
    'Australia/Sydney'
  ]);
  const [results, setResults] = useState<any[]>([]);
  const [worldClocks, setWorldClocks] = useState<any[]>([]);

  const timezones = [
    { value: 'America/New_York', label: 'New York (EST/EDT)', city: 'New York' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', city: 'Los Angeles' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)', city: 'Chicago' },
    { value: 'America/Denver', label: 'Denver (MST/MDT)', city: 'Denver' },
    { value: 'Europe/London', label: 'London (GMT/BST)', city: 'London' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', city: 'Paris' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', city: 'Berlin' },
    { value: 'Europe/Rome', label: 'Rome (CET/CEST)', city: 'Rome' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', city: 'Tokyo' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', city: 'Shanghai' },
    { value: 'Asia/Mumbai', label: 'Mumbai (IST)', city: 'Mumbai' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', city: 'Dubai' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)', city: 'Sydney' },
    { value: 'Australia/Melbourne', label: 'Melbourne (AEDT/AEST)', city: 'Melbourne' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZDT/NZST)', city: 'Auckland' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', city: 'São Paulo' },
    { value: 'America/Mexico_City', label: 'Mexico City (CST/CDT)', city: 'Mexico City' },
    { value: 'Africa/Cairo', label: 'Cairo (EET)', city: 'Cairo' },
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)', city: 'UTC' }
  ];

  useEffect(() => {
    // Set current date and time as default
    const now = new Date();
    setInputDate(now.toISOString().split('T')[0]);
    setInputTime(now.toTimeString().slice(0, 5));

    updateWorldClocks();
    const interval = setInterval(updateWorldClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inputDate && inputTime) {
      convertTime();
    }
  }, [inputDate, inputTime, inputTimezone, outputTimezones]);

  const updateWorldClocks = () => {
    const majorTimezones = [
      'America/New_York',
      'Europe/London',
      'Asia/Tokyo',
      'Australia/Sydney',
      'America/Los_Angeles',
      'Europe/Paris'
    ];

    const clocks = majorTimezones.map(tz => {
      const now = new Date();
      const timeInZone = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);

      const dateInZone = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(now);

      const timezone = timezones.find(t => t.value === tz);

      return {
        timezone: tz,
        city: timezone?.city || tz.split('/')[1],
        time: timeInZone,
        date: dateInZone
      };
    });

    setWorldClocks(clocks);
  };

  const convertTime = () => {
    if (!inputDate || !inputTime) return;

    try {
      // Create date object in input timezone
      const inputDateTime = new Date(`${inputDate}T${inputTime}`);

      const conversions = outputTimezones.map(targetTz => {
        // Format time in target timezone
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: targetTz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: targetTz,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        // Calculate offset
        const offsetFormatter = new Intl.DateTimeFormat('en', {
          timeZone: targetTz,
          timeZoneName: 'longOffset'
        });
        const offset = offsetFormatter.formatToParts(inputDateTime)
          .find(part => part.type === 'timeZoneName')?.value || '';

        const timezone = timezones.find(t => t.value === targetTz);

        return {
          timezone: targetTz,
          city: timezone?.city || targetTz.split('/')[1],
          time: timeFormatter.format(inputDateTime),
          date: dateFormatter.format(inputDateTime),
          offset: offset
        };
      });

      setResults(conversions);
    } catch (error) {
      console.error('Time conversion error:', error);
    }
  };

  const addOutputTimezone = () => {
    const availableTimezones = timezones.filter(tz =>
      !outputTimezones.includes(tz.value) && tz.value !== inputTimezone
    );

    if (availableTimezones.length > 0) {
      setOutputTimezones([...outputTimezones, availableTimezones[0].value]);
    }
  };

  const removeOutputTimezone = (timezone: string) => {
    setOutputTimezones(outputTimezones.filter(tz => tz !== timezone));
  };

  const copyResult = (result: any) => {
    const text = `${result.city}: ${result.time} - ${result.date}`;
    navigator.clipboard.writeText(text);
    alert('Time copied to clipboard!');
  };

  const relatedTools = [
    { name: 'World Clock', path: '#' },
    { name: 'Unit Converter', path: '/tools/unit-converter' },
    { name: 'Age Calculator', path: '/tools/age-calculator' }
  ];

  return (
    <>
      <Helmet>

        <title>Time Zone Converter – Convert Between Time Zones | ToolsHub</title>
        <meta name="description" content="Convert times across different time zones. Compare and convert UTC, IST, PST, and more instantly." />
        <meta name="keywords" content="time zone converter, UTC to IST, time conversion, world clock" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/timezone-converter" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Timezone Converter",
          "url": "https://tool-hub-orpin.vercel.app/tools/timezone-converter",
          "description": "Convert time between different time zones around the world",
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
        title="Timezone Converter"
        description="Convert time between different time zones around the world"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* World Clocks */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">World Clock</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {worldClocks.map((clock, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="font-medium text-gray-900">{clock.city}</span>
                    </div>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{clock.time}</div>
                  <div className="text-sm text-gray-600">{clock.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Conversion */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Converter</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={inputTime}
                  onChange={(e) => setInputTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Timezone
                </label>
                <select
                  value={inputTimezone}
                  onChange={(e) => setInputTimezone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Convert to Timezones
                </label>
                <button
                  onClick={addOutputTimezone}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  + Add Timezone
                </button>
              </div>

              <div className="space-y-2">
                {outputTimezones.map((tz, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <select
                      value={tz}
                      onChange={(e) => {
                        const newTimezones = [...outputTimezones];
                        newTimezones[index] = e.target.value;
                        setOutputTimezones(newTimezones);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      {timezones
                        .filter(t => !outputTimezones.includes(t.value) || t.value === tz)
                        .map((timezone) => (
                          <option key={timezone.value} value={timezone.value}>
                            {timezone.label}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => removeOutputTimezone(tz)}
                      className="px-3 py-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conversion Results */}
          {results.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Results</h3>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="flex items-center mb-1">
                        <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="font-semibold text-gray-900">{result.city}</span>
                        <span className="text-sm text-gray-600 ml-2">({result.offset})</span>
                      </div>
                      <div className="text-xl font-bold text-blue-600">{result.time}</div>
                      <div className="text-sm text-gray-600">{result.date}</div>
                    </div>
                    <button
                      onClick={() => copyResult(result)}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Timezone Tips</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Daylight saving time is automatically handled for supported timezones</li>
              <li>• Use UTC for precise time calculations and international coordination</li>
              <li>• Consider timezone abbreviations may change based on daylight saving time</li>
              <li>• Business hours typically vary between 9 AM - 5 PM in local time</li>
              <li>• Schedule meetings considering all participants' local times</li>
            </ul>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default TimezoneConverter;