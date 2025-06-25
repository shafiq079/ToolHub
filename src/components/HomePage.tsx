import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calculator,
  Download,
  Image,
  Key,
  ArrowLeftRight,
  QrCode,
  Volume2,
  Mic,
  FileText,
  Palette,
  Clock,
  FileIcon,
  Activity,
  Shuffle,
  DollarSign,
  Search
} from 'lucide-react';

const HomePage = () => {
  const tools = [
    {
      title: 'Age Calculator',
      description: 'Calculate your exact age in years, months, and days',
      icon: Calculator,
      path: '/tools/age-calculator',
      color: 'bg-blue-500',
      category: 'calculator'
    },
    {
      title: 'YouTube Thumbnail Downloader',
      description: 'Download YouTube video thumbnails in high quality',
      icon: Download,
      path: '/tools/youtube-thumbnail-downloader',
      color: 'bg-red-500',
      category: 'media'
    },
    {
      title: 'Image Compressor',
      description: 'Reduce image file size without losing quality',
      icon: Image,
      path: '/tools/image-compressor',
      color: 'bg-green-500',
      category: 'media'
    },
    {
      title: 'Password Generator',
      description: 'Generate strong, secure passwords instantly',
      icon: Key,
      path: '/tools/password-generator',
      color: 'bg-purple-500',
      category: 'generator'
    },
    {
      title: 'Unit Converter',
      description: 'Convert between different units of measurement',
      icon: ArrowLeftRight,
      path: '/tools/unit-converter',
      color: 'bg-orange-500',
      category: 'converter'
    },
    {
      title: 'QR Code Generator',
      description: 'Create custom QR codes for any text or URL',
      icon: QrCode,
      path: '/tools/qr-code-generator',
      color: 'bg-indigo-500',
      category: 'generator'
    },
    {
      title: 'Text to Speech',
      description: 'Convert written text into natural-sounding audio',
      icon: Volume2,
      path: '/tools/text-to-speech',
      color: 'bg-pink-500',
      category: 'text'
    },
    {
      title: 'Speech to Text',
      description: 'Convert spoken words into written text',
      icon: Mic,
      path: '/tools/speech-to-text',
      color: 'bg-cyan-500',
      category: 'text'
    },
    {
      title: 'Word Counter',
      description: 'Count words, characters, and analyze text',
      icon: FileText,
      path: '/tools/word-counter',
      color: 'bg-teal-500',
      category: 'text'
    },
    {
      title: 'Color Picker',
      description: 'Pick colors and generate beautiful gradients',
      icon: Palette,
      path: '/tools/color-picker',
      color: 'bg-rose-500',
      category: 'generator'
    },
    {
      title: 'Timezone Converter',
      description: 'Convert time between different time zones',
      icon: Clock,
      path: '/tools/timezone-converter',
      color: 'bg-amber-500',
      category: 'converter'
    },
    {
      title: 'File Converter',
      description: 'Convert files between different formats',
      icon: FileIcon,
      path: '/tools/file-converter',
      color: 'bg-emerald-500',
      category: 'converter'
    },
    {
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and health status',
      icon: Activity,
      path: '/tools/bmi-calculator',
      color: 'bg-lime-500',
      category: 'calculator'
    },
    {
      title: 'Random Number Generator',
      description: 'Generate random numbers within specified ranges',
      icon: Shuffle,
      path: '/tools/random-number-generator',
      color: 'bg-violet-500',
      category: 'calculator'
    },
    {
      title: 'EMI Calculator',
      description: 'Calculate loan EMI and payment schedules',
      icon: DollarSign,
      path: '/tools/emi-calculator',
      color: 'bg-sky-500',
      category: 'calculator'
    },
    {
      title: 'Plagiarism Checker',
      description: 'Check text originality and detect plagiarism',
      icon: Search,
      path: '/tools/plagiarism-checker',
      color: 'bg-slate-500',
      category: 'text'
    }
  ];

  return (
    <>
      <Helmet>
        {/* Basic SEO Tags */}
        <title>Free Online Tools - 15+ Tools to Make Your Life Easier | ToolsHub</title>
        <meta
          name="description"
          content="ToolsHub offers 15+ free online tools including calculators, converters, image compressors, QR generators and more – all in one place."
        />
        <meta
          name="keywords"
          content="online tools, free tools, YouTube thumbnail downloader, age calculator, QR code generator, file converter, word counter, plagiarism checker"
        />
        <meta name="author" content="ToolsHub" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Free Online Tools for Everyone | ToolsHub" />
        <meta
          property="og:description"
          content="Discover 15+ free tools including YouTube thumbnail downloader, QR code generator, EMI Calculator, BMI Calculator, File Converter, Image Compressor, Password Generator, Plagiarism Checker, Random Number Generator, Speech to Text, Text To speech, Timezone Converter, Unit Converter, Word Counter and image compressor at ToolHub."
        />
        <meta property="og:url" content="https://tool-hub-orpin.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ToolsHub" />
        <meta property="og:image" content="https://tool-hub-orpin.vercel.app/cover.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Tools - 15+ Tools in One Place | ToolsHub" />
        <meta name="twitter:description" content="ToolsHub offers 15+ useful tools for everyday use. Download, convert, calculate, and compress." />
        <meta name="twitter:image" content="https://tool-hub-orpin.vercel.app/cover.jpg" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free Online Tools - 15+ Tools to Make Your Life Easier | ToolsHub",
          "description": "ToolsHub offers 15+ free online tools including calculators, converters, image compressors, QR generators and more – all in one place.",
          "url": "https://tool-hub-orpin.vercel.app/",
          "publisher": {
            "@type": "Organization",
            "name": "ToolsHub",
            "logo": {
              "@type": "ImageObject",
              "url": "https://tool-hub-orpin.vercel.app/logo.png"
            }
          }
        })}
      </script>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Free Online Tools for
              <span className="text-blue-600"> Everyday Needs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access a comprehensive suite of free online tools designed to make your daily tasks easier.
              From calculators to converters, generators to analyzers - we've got you covered.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                <span className="text-2xl font-bold text-blue-600">{tools.length}+</span>
                <span className="text-gray-600 ml-2">Free Tools</span>
              </div>
              <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                <span className="text-2xl font-bold text-green-600">100%</span>
                <span className="text-gray-600 ml-2">Free Forever</span>
              </div>
              <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                <span className="text-2xl font-bold text-purple-600">0</span>
                <span className="text-gray-600 ml-2">Registration Required</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Choose Your Tool
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className={`${tool.color} rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {tool.description}
                      </p>
                    </div>
                    <div className="px-6 pb-6">
                      <span className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        Try Now
                        <ArrowLeftRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Your Complete Online Toolkit for Daily Tasks
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Essential Calculators & Converters</h3>
                  <p className="text-gray-600 mb-4">
                    Our comprehensive collection of online calculators and converters helps you solve everyday problems quickly and accurately. Whether you need to calculate your <Link to="/tools/age-calculator" className="text-blue-600 hover:underline">exact age in years, months, and days</Link>, determine your <Link to="/tools/bmi-calculator" className="text-blue-600 hover:underline">Body Mass Index for health tracking</Link>, or convert units between different measurement systems, we've got the tools you need.
                  </p>
                  <p className="text-gray-600">
                    From financial planning with our EMI calculator to international communication with timezone converters, these tools are designed to save you time and provide accurate results every time. All calculations are performed instantly in your browser with complete privacy.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Media & File Processing Tools</h3>
                  <p className="text-gray-600 mb-4">
                    Transform and optimize your digital content with our powerful media processing tools. Our <Link to="/tools/image-compressor" className="text-blue-600 hover:underline">image compressor reduces file sizes</Link> without compromising quality, perfect for web optimization and storage management. Need YouTube thumbnails? Our downloader extracts high-resolution images instantly.
                  </p>
                  <p className="text-gray-600">
                    Convert files between formats, generate QR codes for easy sharing, and process text with advanced analytics. These tools work entirely in your browser, ensuring your files remain private and secure throughout the process.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose ToolsHub for Your Online Tool Needs?</h3>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">Privacy-First Approach</h4>
                <p className="text-blue-700">
                  Unlike many online tools that upload your data to servers, most of our tools process information locally in your browser. This means your sensitive data—whether it's personal photos, documents, or calculations—never leaves your device. We believe privacy is a fundamental right, not a premium feature.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">Always Free</h4>
                  <p className="text-green-700 text-sm">
                    Every tool on ToolsHub is completely free to use with no hidden fees, subscription requirements, or premium tiers. We believe essential digital tools should be accessible to everyone.
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">No Registration Required</h4>
                  <p className="text-purple-700 text-sm">
                    Start using any tool immediately without creating accounts or providing personal information. Simply visit the tool page and begin working—it's that simple.
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-orange-800 mb-3">Mobile-Friendly Design</h4>
                  <p className="text-orange-700 text-sm">
                    All our tools are optimized for mobile devices, tablets, and desktops. Work seamlessly across all your devices with responsive designs that adapt to any screen size.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Popular Tool Categories</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Text & Content Tools</h4>
                  <p className="text-gray-600">
                    Enhance your writing and content creation with our text analysis tools. Count words and characters for social media posts, convert text to speech for accessibility, or check content originality with our plagiarism detector. These tools are perfect for students, writers, content creators, and professionals who work with text regularly.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Security & Privacy Tools</h4>
                  <p className="text-gray-600">
                    Protect your digital life with our security-focused tools. Generate strong, unique passwords for all your accounts, create QR codes for secure information sharing, and use our random number generator for cryptographic applications. All security tools use industry-standard algorithms to ensure maximum protection.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Productivity & Efficiency Tools</h4>
                  <p className="text-gray-600">
                    Streamline your workflow with tools designed to save time and increase productivity. Convert between time zones for international collaboration, compress images for faster website loading, and convert files between formats without expensive software. Each tool is optimized for speed and accuracy.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Getting Started is Simple</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Browse our collection of tools above or use the navigation menu to find what you need</li>
                  <li>Click on any tool to access its dedicated page with detailed instructions</li>
                  <li>Enter your data or upload files as needed—everything processes instantly</li>
                  <li>Download results, copy outputs, or use the information directly in your projects</li>
                  <li>Bookmark frequently used tools for quick access in the future</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Tools?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our tools are designed with simplicity, speed, and accuracy in mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  All tools work instantly in your browser with no waiting time
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Secure</h3>
                <p className="text-gray-600">
                  Your data is processed locally and never stored on our servers
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">
                  Works perfectly on all devices - desktop, tablet, and mobile
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;