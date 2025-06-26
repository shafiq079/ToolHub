import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, Wrench, Calculator, Image, Type, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toolCategories = {
    calculators: {
      name: 'Calculators',
      icon: Calculator,
      tools: [
        { name: 'Age Calculator', path: '/tools/age-calculator' },
        { name: 'BMI Calculator', path: '/tools/bmi-calculator' },
        { name: 'EMI Calculator', path: '/tools/emi-calculator' },
      ]
    },
    converters: {
      name: 'Converters',
      icon: Globe,
      tools: [
        { name: 'Unit Converter', path: '/tools/unit-converter' },
        { name: 'Timezone Converter', path: '/tools/timezone-converter' },
        { name: 'File Converter', path: '/tools/file-converter' }
      ]
    },
    generators: {
      name: 'Generators',
      icon: Wrench,
      tools: [
        { name: 'Password Generator', path: '/tools/password-generator' },
        { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
        { name: 'Color Picker', path: '/tools/color-picker' },
        { name: 'Random Number Generator', path: '/tools/random-number-generator' }
      ]
    },
    media: {
      name: 'Media Tools',
      icon: Image,
      tools: [
        { name: 'Image Compressor', path: '/tools/image-compressor' },
        { name: 'YouTube Thumbnail Downloader', path: '/tools/youtube-thumbnail-downloader' }
      ]
    },
    text: {
      name: 'Text Tools',
      icon: Type,
      tools: [
        { name: 'Word Counter', path: '/tools/word-counter' },
        { name: 'Text to Speech', path: '/tools/text-to-speech' },
        { name: 'Speech to Text', path: '/tools/speech-to-text' },
        { name: 'Plagiarism Checker', path: '/tools/plagiarism-checker' }
      ]
    }
  };

  const allTools = Object.values(toolCategories).flatMap(category => category.tools);

  const filteredTools = allTools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDropdownToggle = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeDropdowns}>
              <Wrench className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ToolsHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-md"
              onClick={closeDropdowns}
            >
              Home
            </Link>

            {/* Tool Categories */}
            {Object.entries(toolCategories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <div key={key} className="relative">
                  <button
                    onClick={() => handleDropdownToggle(key)}
                    className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-md"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        {category.name}
                      </div>
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              to="/about"
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-md"
              onClick={closeDropdowns}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-md"
              onClick={closeDropdowns}
            >
              Contact
            </Link>
          </nav>

          {/* Right section: Search + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button & Input */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tools..."
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  {searchTerm && (
                    <div className="mt-2 max-h-60 overflow-y-auto">
                      {filteredTools.length > 0 ? (
                        filteredTools.map((tool) => (
                          <Link
                            key={tool.path}
                            to={tool.path}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchTerm('');
                              closeDropdowns();
                            }}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                          >
                            {tool.name}
                          </Link>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 px-3 py-2">No tools found</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>

              {Object.entries(toolCategories).map(([key, category]) => (
                <div key={key} className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center">
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </div>
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-6 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdowns}
        />
      )}
    </header>
  );
};

export default Header;