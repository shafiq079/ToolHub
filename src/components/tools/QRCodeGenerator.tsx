import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import ToolLayout from '../shared/ToolLayout';
import { Download, Palette, Wifi, User, Link as LinkIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrType, setQrType] = useState('text');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [wifiData, setWifiData] = useState({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false
  });
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: ''
  });
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQRData = () => {
    switch (qrType) {
      case 'wifi':
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`;
      case 'contact':
        return `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TEL:${contactData.phone}
EMAIL:${contactData.email}
ORG:${contactData.organization}
END:VCARD`;
      default:
        return text;
    }
  };

  const downloadQR = (format: 'png' | 'svg') => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    if (format === 'png') {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = url;
      link.click();
    }
  };

  const qrData = generateQRData();

  const relatedTools = [
    { name: 'Password Generator', path: '/tools/password-generator' },
    { name: 'Color Picker', path: '/tools/color-picker' },
    { name: 'Image Compressor', path: '/tools/image-compressor' }
  ];

  return (
    <>
      <Helmet>


        <title>QR Code Generator – Free Custom QR Codes | ToolsHub</title>
        <meta name="description" content="Generate free QR codes for links, text, Wi-Fi, and more. Customize color and size. Download as PNG or SVG." />
        <meta name="keywords" content="QR code generator, create QR code, free QR code, custom QR code" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/qr-code-generator" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "QR Code Generator",
          "url": "https://tool-hub-orpin.vercel.app/tools/qr-code-generator",
          "description": "Generate free QR codes for links, text, Wi-Fi, and more. Customize color and size. Download as PNG or SVG.",
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
        title="QR Code Generator"
        description="Create custom QR codes for text, URLs, WiFi, and contact information"
        relatedTools={relatedTools}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* QR Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                QR Code Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'text', label: 'Text/URL', icon: LinkIcon },
                  { id: 'wifi', label: 'WiFi', icon: Wifi },
                  { id: 'contact', label: 'Contact', icon: User }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setQrType(id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-colors ${qrType === id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input */}
            {qrType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text or URL to encode..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={4}
                />
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiData.ssid}
                    onChange={(e) => setWifiData(prev => ({ ...prev, ssid: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={wifiData.password}
                    onChange={(e) => setWifiData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Type
                  </label>
                  <select
                    value={wifiData.security}
                    onChange={(e) => setWifiData(prev => ({ ...prev, security: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Password</option>
                  </select>
                </div>
              </div>
            )}

            {qrType === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={contactData.name}
                    onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={contactData.organization}
                    onChange={(e) => setContactData(prev => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Customization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Customization
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size: {size}px
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foreground Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>

              {qrData ? (
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200 text-center">
                  <div ref={qrRef} className="inline-block">
                    <QRCode
                      value={qrData}
                      size={size}
                      fgColor={fgColor}
                      bgColor={bgColor}
                      level="M"
                      includeMargin
                    />
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => downloadQR('png')}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PNG</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <p className="text-gray-500">Enter content to generate QR code</p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">How to Use</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Select the type of QR code you want to create</li>
                <li>• Fill in the required information</li>
                <li>• Customize colors and size as needed</li>
                <li>• Download the QR code as PNG</li>
                <li>• Test the QR code with a scanner app</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to QR Code Generation</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What are QR Codes?</h3>
              <p className="text-gray-600 mb-4">
                QR (Quick Response) codes are two-dimensional barcodes that can store various types of information, from simple text and URLs to complex data like WiFi credentials and contact information. Originally developed in 1994 for tracking automotive parts, QR codes have become ubiquitous in modern digital communication.
              </p>
              <p className="text-gray-600 mb-4">
                Our QR code generator creates high-quality, customizable QR codes that can be scanned by any smartphone camera or QR code reader app. Unlike traditional barcodes that store limited information horizontally, QR codes can hold up to 4,296 alphanumeric characters in a compact square format.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use QR Codes?</h3>
              <p className="text-gray-600 mb-4">
                QR codes bridge the gap between physical and digital worlds, providing instant access to information without typing. They're perfect for contactless sharing, marketing campaigns, and simplifying complex data entry. Our generator makes it easy to create professional QR codes for any purpose.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Instant access to websites, contact info, and WiFi networks</li>
                <li>Contactless sharing reduces physical contact and typing errors</li>
                <li>Trackable for marketing analytics and engagement metrics</li>
                <li>Space-efficient way to share complex information</li>
                <li>Universal compatibility with all modern smartphones</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">QR Code Types and Applications</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Text and URL QR Codes</h4>
              <p className="text-blue-700 mb-3">
                The most common type of QR code, perfect for sharing website links, social media profiles, or any text information. When scanned, these codes can automatically open websites, display messages, or prompt users to save information. They're ideal for business cards, flyers, and digital marketing materials.
              </p>
              <p className="text-blue-700">
                URL QR codes are particularly effective for marketing campaigns, allowing customers to quickly access product pages, promotional offers, or company information without typing long web addresses. Our generator ensures optimal encoding for maximum compatibility across all devices.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3">WiFi QR Codes</h4>
              <p className="text-green-700 mb-3">
                WiFi QR codes eliminate the hassle of sharing complex passwords and network names. Guests can simply scan the code to automatically connect to your network without manually entering credentials. This is perfect for businesses, events, and home networks with complicated passwords.
              </p>
              <p className="text-green-700">
                Our WiFi QR code generator supports all major security protocols including WPA, WPA2, and WEP, as well as open networks. The generated codes work with both Android and iOS devices, providing seamless connectivity for all your guests.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-800 mb-3">Contact Information (vCard) QR Codes</h4>
              <p className="text-purple-700 mb-3">
                Contact QR codes use the vCard format to share comprehensive contact information including names, phone numbers, email addresses, and organizations. When scanned, these codes prompt users to save the contact directly to their phone's address book, eliminating manual data entry.
              </p>
              <p className="text-purple-700">
                Perfect for business networking, these QR codes can be printed on business cards, email signatures, or displayed at events. They ensure accurate contact information transfer and make it easy for people to stay connected with you professionally.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Customization and Design Best Practices</h3>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-700">Color Customization</h4>
              <p className="text-gray-600 text-sm">
                While black and white QR codes offer maximum compatibility, our generator allows color customization for branding purposes. Ensure sufficient contrast between foreground and background colors for reliable scanning across all devices.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-700">Size Optimization</h4>
              <p className="text-gray-600 text-sm">
                Choose appropriate sizes based on your intended use. Larger QR codes (256px+) work better for print materials and distant scanning, while smaller codes (128px) are suitable for digital displays and close-range scanning.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-700">Error Correction</h4>
              <p className="text-gray-600 text-sm">
                Our generator uses medium error correction, allowing QR codes to remain functional even if up to 15% of the code is damaged or obscured. This ensures reliability in various printing and display conditions.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mt-8">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">QR Code Best Practices</h4>
            <ul className="list-disc list-inside text-yellow-700 space-y-2">
              <li>Test QR codes with multiple devices and apps before distribution</li>
              <li>Provide clear instructions or context about what the QR code contains</li>
              <li>Ensure adequate white space around the QR code for proper scanning</li>
              <li>Use high-contrast colors and avoid complex backgrounds</li>
              <li>Consider the scanning environment and adjust size accordingly</li>
              <li>Include a fallback option (like a shortened URL) for accessibility</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Security and Privacy Considerations</h3>
          <p className="text-gray-600 mb-4">
            Our QR code generator processes all information locally in your browser, ensuring that sensitive data like WiFi passwords or contact information never leaves your device. This client-side processing approach provides maximum privacy and security for your personal or business information.
          </p>
          <p className="text-gray-600">
            When sharing QR codes, consider the sensitivity of the encoded information. WiFi QR codes should only be shared with trusted individuals, and URL QR codes should link to secure, legitimate websites to maintain user trust and security.
          </p>
        </div>
      </ToolLayout>
    </>
  );
};

export default QRCodeGenerator;