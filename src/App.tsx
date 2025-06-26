import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutUs from './components/pages/AboutUs';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import ContactUs from './components/pages/ContactUs';
import AgeCalculator from './components/tools/AgeCalculator';
import YouTubeThumbnailDownloader from './components/tools/YouTubeThumbnailDownloader';
import ImageCompressor from './components/tools/ImageCompressor';
import PasswordGenerator from './components/tools/PasswordGenerator';
import UnitConverter from './components/tools/UnitConverter';
import QRCodeGenerator from './components/tools/QRCodeGenerator';
import TextToSpeech from './components/tools/TextToSpeech';
import SpeechToText from './components/tools/SpeechToText';
import WordCounter from './components/tools/WordCounter';
import ColorPicker from './components/tools/ColorPicker';
import TimezoneConverter from './components/tools/TimezoneConverter';
import FileConverter from './components/tools/FileConverter';
import BMICalculator from './components/tools/BMICalculator';
import RandomNumberGenerator from './components/tools/RandomNumberGenerator';
import EMICalculator from './components/tools/EMICalculator';
import PlagiarismChecker from './components/tools/PlagiarismChecker';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 font-inter">
        <Helmet>
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "ToolsHub",
                "url": "https://tool-hub-orpin.vercel.app/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://tool-hub-orpin.vercel.app/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}
          </script>

          <title>Free Online Tools - Essential Utilities for Daily Use | ToolsHub</title>
          <meta name="description" content="Access 15+ free online tools including calculators, converters, generators, and utilities. Age calculator, password generator, QR code maker, image compressor, and more!" />
          <meta name="keywords" content="online tools, free calculators, password generator, QR code generator, image compressor, unit converter, BMI calculator, word counter, file converter, age calculator" />
          <meta name="author" content="ToolsHub" />
          <meta property="og:title" content="Free Online Tools - Essential Utilities for Daily Use | ToolsHub" />
          <meta property="og:description" content="Access 15+ free online tools including calculators, converters, generators, and utilities." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Free Online Tools - Essential Utilities for Daily Use | ToolsHub" />
          <meta name="twitter:description" content="Access 15+ free online tools including calculators, converters, generators, and utilities." />
        </Helmet>

        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/youtube-thumbnail-downloader" element={<YouTubeThumbnailDownloader />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
            <Route path="/tools/text-to-speech" element={<TextToSpeech />} />
            <Route path="/tools/speech-to-text" element={<SpeechToText />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/color-picker" element={<ColorPicker />} />
            <Route path="/tools/timezone-converter" element={<TimezoneConverter />} />
            <Route path="/tools/file-converter" element={<FileConverter />} />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/random-number-generator" element={<RandomNumberGenerator />} />
            <Route path="/tools/emi-calculator" element={<EMICalculator />} />
            <Route path="/tools/plagiarism-checker" element={<PlagiarismChecker />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;