import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Mail, Shield, FileText, Calculator, Image, Type, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">ToolsHub</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your one-stop destination for free online tools that make everyday tasks easier and more efficient.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-6 h-6 bg-gray-400 hover:bg-blue-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-6 h-6 bg-gray-400 hover:bg-blue-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-6 h-6 bg-gray-400 hover:bg-blue-400 rounded"></div>
              </a>
            </div>
          </div>

          {/* Calculators */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Calculator className="h-5 w-5 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Calculators</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools/age-calculator" className="text-gray-400 hover:text-white transition-colors">
                  Age Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/bmi-calculator" className="text-gray-400 hover:text-white transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/emi-calculator" className="text-gray-400 hover:text-white transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/random-number-generator" className="text-gray-400 hover:text-white transition-colors">
                  Random Number Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Generators & Converters */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Wrench className="h-5 w-5 text-green-400 mr-2" />
              <h3 className="text-lg font-semibold">Generators & Converters</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools/password-generator" className="text-gray-400 hover:text-white transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/qr-code-generator" className="text-gray-400 hover:text-white transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/unit-converter" className="text-gray-400 hover:text-white transition-colors">
                  Unit Converter
                </Link>
              </li>
              <li>
                <Link to="/tools/file-converter" className="text-gray-400 hover:text-white transition-colors">
                  File Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ToolsHub. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Developed by <a href="shafiq-webdev.vercel.app" className="text-blue-400 hover:underline">ShafiqWebDev</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;