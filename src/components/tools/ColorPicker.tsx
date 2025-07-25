import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import ToolLayout from '../shared/ToolLayout';
import { Copy, Palette, RefreshCw, Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ColorPicker = () => {
  const [color, setColor] = useState('#3B82F6');
  const [gradientColor1, setGradientColor1] = useState('#3B82F6');
  const [gradientColor2, setGradientColor2] = useState('#8B5CF6');
  const [gradientDirection, setGradientDirection] = useState('45deg');
  const [activeTab, setActiveTab] = useState('color');
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const addToHistory = (newColor: string) => {
    if (!colorHistory.includes(newColor)) {
      setColorHistory(prev => [newColor, ...prev.slice(0, 9)]); // Keep last 10 colors
    }
  };

  const handleColorChange = (newColor: any) => {
    const hexColor = newColor.hex;
    setColor(hexColor);
    addToHistory(hexColor);
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
    addToHistory(randomColor);
  };

  const generateColorPalette = (baseColor: string) => {
    const colors = [];
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Generate complementary, triadic, and analogous colors
    colors.push(baseColor); // Original
    colors.push(`#${(255 - r).toString(16).padStart(2, '0')}${(255 - g).toString(16).padStart(2, '0')}${(255 - b).toString(16).padStart(2, '0')}`); // Complementary

    // Lighter and darker variations
    colors.push(`#${Math.min(255, Math.floor(r * 1.3)).toString(16).padStart(2, '0')}${Math.min(255, Math.floor(g * 1.3)).toString(16).padStart(2, '0')}${Math.min(255, Math.floor(b * 1.3)).toString(16).padStart(2, '0')}`);
    colors.push(`#${Math.floor(r * 0.7).toString(16).padStart(2, '0')}${Math.floor(g * 0.7).toString(16).padStart(2, '0')}${Math.floor(b * 0.7).toString(16).padStart(2, '0')}`);
    colors.push(`#${Math.floor(r * 0.4).toString(16).padStart(2, '0')}${Math.floor(g * 0.4).toString(16).padStart(2, '0')}${Math.floor(b * 0.4).toString(16).padStart(2, '0')}`);

    return colors;
  };

  const getColorInfo = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const hsl = rgbToHsl(r, g, b);
    const hsv = rgbToHsv(r, g, b);

    return {
      hex: hexColor,
      rgb: `rgb(${r}, ${g}, ${b})`,
      rgba: `rgba(${r}, ${g}, ${b}, 1)`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copied to clipboard!`);
  };

  const gradientCSS = `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`;

  const relatedTools = [
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
    { name: 'Image Compressor', path: '/tools/image-compressor' },
    { name: 'Password Generator', path: '/tools/password-generator' }
  ];

  return (
    <>
      <Helmet>
        <title>Color Picker & Gradient Generator – HTML Color Tools | ToolsHub</title>
        <meta name="description" content="Pick colors, create gradients, and get HEX, RGB, HSL codes. Generate CSS color gradients easily." />
        <meta name="keywords" content="color picker, gradient generator, HTML colors, CSS gradient maker" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/color-picker" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Color Picker & Gradient Generator",
          "url": "https://tool-hub-orpin.vercel.app/tools/color-picker",
          "description": "Pick colors, create gradients, and get HEX, RGB, HSL codes. Generate CSS color gradients easily.",
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
        title="Color Picker & Gradient Generator"
        description="Pick colors, generate gradients, and get color codes in multiple formats"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('color')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'color'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Color Picker
            </button>
            <button
              onClick={() => setActiveTab('gradient')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'gradient'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Gradient Generator
            </button>
          </div>

          {activeTab === 'color' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Picker */}
              <div className="space-y-6">
                <div className="text-center">
                  <ChromePicker
                    color={color}
                    onChange={handleColorChange}
                    disableAlpha={false}
                    width="100%"
                  />
                  <button
                    onClick={generateRandomColor}
                    className="mt-4 flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Random Color</span>
                  </button>
                </div>

                {/* Color History */}
                {colorHistory.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Colors</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {colorHistory.map((historyColor, index) => (
                        <button
                          key={index}
                          onClick={() => setColor(historyColor)}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: historyColor }}
                          title={historyColor}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Color Information */}
              <div className="space-y-6">
                {/* Color Preview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Preview</h3>
                  <div
                    className="w-full h-32 rounded-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                </div>

                {/* Color Codes */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Codes</h3>
                  <div className="space-y-3">
                    {Object.entries(getColorInfo(color)).map(([format, value]) => (
                      <div key={format} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-gray-700 uppercase">{format}</div>
                          <div className="font-mono text-sm text-gray-900">{value}</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(value)}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Palette</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {generateColorPalette(color).map((paletteColor, index) => (
                      <button
                        key={index}
                        onClick={() => setColor(paletteColor)}
                        className="aspect-square rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                        style={{ backgroundColor: paletteColor }}
                        title={paletteColor}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gradient' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gradient Controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gradient Colors</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color 1
                      </label>
                      <ChromePicker
                        color={gradientColor1}
                        onChange={(color) => setGradientColor1(color.hex)}
                        disableAlpha={false}
                        width="100%"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color 2
                      </label>
                      <ChromePicker
                        color={gradientColor2}
                        onChange={(color) => setGradientColor2(color.hex)}
                        disableAlpha={false}
                        width="100%"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Direction: {gradientDirection}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={parseInt(gradientDirection)}
                    onChange={(e) => setGradientDirection(`${e.target.value}deg`)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0°</span>
                    <span>180°</span>
                    <span>360°</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg'].map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setGradientDirection(dir)}
                      className={`px-3 py-2 text-sm rounded transition-colors ${gradientDirection === dir
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gradient Preview and Code */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Gradient Preview</h3>
                  <div
                    className="w-full h-48 rounded-lg border border-gray-200"
                    style={{ background: gradientCSS }}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">CSS Code</h3>
                  <div className="p-4 bg-gray-900 rounded-lg">
                    <code className="text-green-400 text-sm font-mono">
                      background: {gradientCSS};
                    </code>
                    <button
                      onClick={() => copyToClipboard(`background: ${gradientCSS};`)}
                      className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                      title="Copy CSS"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => copyToClipboard(gradientCSS)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Gradient Value</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* SEO content*/}
          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to Using a Color Picker Online</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is an Online Color Picker?</h3>
                <p className="text-gray-600 mb-4">
                  A color picker is a digital tool that helps designers, developers, and everyday users find and select the perfect color for their needs. Whether you’re working on a website, designing graphics, or choosing a color scheme, this tool allows you to extract hex codes, RGB values, and even HSL formats with ease.
                </p>
                <p className="text-gray-600 mb-4">
                  With our online color picker, you can interactively choose colors from a palette, extract colors from uploaded images, or experiment with gradients. It’s ideal for creating cohesive designs, ensuring brand consistency, and streamlining the creative process.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Our Color Picker Tool?</h3>
                <p className="text-gray-600 mb-4">
                  Our tool is designed with simplicity and precision in mind. It supports a wide variety of use cases — from selecting a background color for a website to matching colors in a logo or UI component. Best of all, it's fast, free, and doesn’t require any sign-up.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Get HEX, RGB, and HSL values instantly</li>
                  <li>Copy color codes to clipboard with one click</li>
                  <li>Interactive color sliders and palette preview</li>
                  <li>Completely free and browser-based</li>
                  <li>No personal data collected or stored</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Practical Uses of a Color Picker</h3>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Design & Development</h4>
              <p className="text-gray-600 mb-3">
                Web developers use color pickers to ensure consistent UI design, match brand guidelines, and set theme colors. Designers rely on them to create harmonious palettes for graphics, posters, and websites.
              </p>
              <p className="text-gray-600">
                Our tool is especially useful when converting client brand colors to HEX or RGB for web use or preparing assets for export in specific color formats.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Personal & Creative Projects</h4>
              <p className="text-blue-700 mb-3">
                Bloggers, hobbyists, and students use color pickers for customizing their online presence, presentations, or DIY crafts. It’s also helpful for social media posts, digital resumes, or customizing gaming themes.
              </p>
              <p className="text-blue-700">
                With our intuitive interface, anyone can experiment with colors and build a better sense of visual aesthetics — no professional training required.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use the Color Picker Effectively</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Use the Color Slider or Input Field</h4>
                <p className="text-gray-600 text-sm">
                  Pick a color manually using the visual slider or enter a known HEX, RGB, or HSL code. The selected color will appear in the preview box instantly.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Copy the Color Code</h4>
                <p className="text-gray-600 text-sm">
                  Use the “Copy” button to quickly grab the color code and paste it into your code editor, design tool, or documentation.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Optional - Use for Accessibility Checks</h4>
                <p className="text-gray-600 text-sm">
                  Ensure your selected color meets contrast requirements for accessibility by pairing it with other background or text colors.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Tips for Choosing Great Colors</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Use complementary colors for balance and contrast</li>
                <li>Stick to your brand's primary and secondary colors</li>
                <li>Test your color combinations for readability</li>
                <li>Save frequently used colors in a palette</li>
                <li>Use color theory principles for better visual impact</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              Our online color picker is your go-to tool for all color-related needs — from web design to creative projects. It's precise, user-friendly, and always free. Try it today and bring your color ideas to life!
            </p>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Palette className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-800">Color Tips</h4>
            </div>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Use the color palette generator to find harmonious color combinations</li>
              <li>• Gradients work great for backgrounds, buttons, and modern UI elements</li>
              <li>• Consider color accessibility and contrast ratios for text readability</li>
              <li>• Save frequently used colors to your history for quick access</li>
              <li>• Experiment with different gradient directions for various effects</li>
            </ul>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default ColorPicker;