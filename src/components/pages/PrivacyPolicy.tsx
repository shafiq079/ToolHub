import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
   <>
   
<Helmet>
  <title>Privacy Policy | ToolsHub</title>
  <meta name="description" content="Read our privacy policy to understand how ToolsHub collects, uses, and protects your personal information." />
  <meta name="keywords" content="privacy policy, data protection, personal data, user data, ToolsHub policy" />
  <link rel="canonical" href="https://tool-hub-orpin.vercel.app/privacy-policy" />

  {/* Open Graph */}
  <meta property="og:title" content="Privacy Policy | ToolsHub" />
  <meta property="og:description" content="Learn how ToolsHub collects and manages your data." />
  <meta property="og:url" content="https://tool-hub-orpin.vercel.app/privacy-policy" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Privacy Policy | ToolsHub" />
  <meta name="twitter:description" content="ToolsHub respects your privacy. Read our full privacy policy here." />
</Helmet>

<script type="application/ld+json">
  {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "url": "https://tool-hub-orpin.vercel.app/privacy-policy",
      "description": "Details about how ToolsHub handles and protects user data, including cookies and analytics."
    }
  `}
</script>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span>/</span>
          <span>Privacy Policy</span>
        </div>

        {/* Main Content */}
        <main className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              At ToolsHub, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our online tools and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe in transparency and want you to understand exactly what information we collect and how we use it. 
              By using our website, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Personal Information</h3>
              <p className="text-blue-800 text-sm mb-3">
                We do not require registration or collect personal information to use our tools. However, we may collect:
              </p>
              <ul className="text-blue-800 text-sm space-y-1 list-disc list-inside">
                <li>Contact information if you reach out to us via our contact form</li>
                <li>Feedback and suggestions you voluntarily provide</li>
                <li>Email addresses if you subscribe to updates (when available)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                <li><strong>Usage Data:</strong> Information about how you interact with our tools and website</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device characteristics</li>
                <li><strong>Log Data:</strong> IP address, access times, and pages visited</li>
                <li><strong>Cookies:</strong> Small data files stored on your device for functionality and analytics</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Service Provision</h3>
                <ul className="text-green-800 text-sm space-y-1 list-disc list-inside">
                  <li>Provide and maintain our online tools</li>
                  <li>Improve user experience and functionality</li>
                  <li>Respond to user inquiries and support requests</li>
                  <li>Ensure website security and prevent abuse</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Analytics & Improvement</h3>
                <ul className="text-purple-800 text-sm space-y-1 list-disc list-inside">
                  <li>Analyze usage patterns and preferences</li>
                  <li>Monitor website performance and errors</li>
                  <li>Develop new features and tools</li>
                  <li>Optimize user interface and experience</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Processing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Data Processing</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Privacy-First Approach</h3>
              <p className="text-yellow-800 text-sm mb-3">
                Most of our tools process your data locally in your browser, which means:
              </p>
              <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
                <li>Your sensitive data (passwords, personal files, text) never leaves your device</li>
                <li>We cannot access or store the content you process with our tools</li>
                <li>All calculations and conversions happen on your computer</li>
                <li>Your privacy is protected by design</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Globe className="h-5 w-5 text-orange-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Analytics</h3>
                <p className="text-gray-700 text-sm">
                  We use Google Analytics to understand how visitors interact with our website. This service may collect 
                  information about your visits, including pages viewed, time spent, and general location data. 
                  You can opt out of Google Analytics tracking by installing the 
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hosting Services</h3>
                <p className="text-gray-700 text-sm">
                  Our website is hosted on secure servers that may collect standard web server logs, including IP addresses 
                  and access times, for security and performance monitoring purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">GDPR Rights (EU Users)</h3>
                <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                  <li>Right to access your personal data</li>
                  <li>Right to rectify inaccurate information</li>
                  <li>Right to erase your personal data</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">CCPA Rights (California Users)</h3>
                <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of the sale of personal information</li>
                  <li>Right to non-discrimination for exercising rights</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 text-sm mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. These may include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Essential Cookies</h4>
                  <p className="text-gray-600 text-xs">Required for basic website functionality</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Analytics Cookies</h4>
                  <p className="text-gray-600 text-xs">Help us understand website usage</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Preference Cookies</h4>
                  <p className="text-gray-600 text-xs">Remember your settings and preferences</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 text-sm mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
              the internet or electronic storage is 100% secure.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> While we strive to protect your personal information, we cannot guarantee 
                absolute security. Please use our services at your own discretion.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 text-sm mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                Email: privacy@toolshub.example.com<br />
                Response time: We aim to respond within 48 hours
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Policy Updates</h2>
            <p className="text-gray-700 text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy 
              Policy periodically for any changes.
            </p>
          </section>
        </main>
      </div>
    </div>
   </>
  );
};

export default PrivacyPolicy;