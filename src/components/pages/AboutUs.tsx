import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Target, Users, Shield, Zap } from 'lucide-react';

const AboutUs = () => {
  
  return (
   <>
   <Helmet>
  <title>About ToolsHub | Who We Are & What We Do</title>
  <meta name="description" content="Learn about ToolsHub – the team behind your favorite online tools. Our mission is to simplify daily tasks with smart web utilities." />
  <meta name="keywords" content="about ToolsHub, our mission, online tool developers, who is ToolsHub" />
  <link rel="canonical" href="https://tool-hub-orpin.vercel.app/about" />

  {/* Open Graph */}
  <meta property="og:title" content="About ToolsHub" />
  <meta property="og:description" content="ToolsHub was created to simplify digital life with efficient tools." />
  <meta property="og:url" content="https://tool-hub-orpin.vercel.app/about" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="About ToolsHub" />
  <meta name="twitter:description" content="Get to know the team and mission behind ToolsHub." />
</Helmet>

<script type="application/ld+json">
  {`
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About ToolsHub",
      "url": "https://tool-hub-orpin.vercel.app/about",
      "description": "ToolsHub is a platform offering essential online tools to simplify your digital life."
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
          <span>About Us</span>
        </div>

        {/* Main Content */}
        <main className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About ToolsHub</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted destination for free, powerful online tools that simplify everyday tasks and boost productivity.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Target className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              At ToolsHub, we believe that powerful tools shouldn't come with a price tag. Our mission is to provide 
              free, accessible, and user-friendly online utilities that help people accomplish their daily tasks more 
              efficiently. Whether you're a student working on assignments, a professional managing projects, or a 
              small business owner handling various operations, our tools are designed to save you time and effort.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We're committed to democratizing access to essential digital tools, ensuring that everyone can benefit 
              from technology regardless of their budget or technical expertise.
            </p>
          </section>

          {/* Who We Serve */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Who We Serve</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Students</h3>
                <p className="text-blue-700 text-sm">
                  From word counting for essays to unit conversions for science projects, our tools help students 
                  excel in their academic pursuits.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Professionals</h3>
                <p className="text-green-700 text-sm">
                  Streamline your workflow with our productivity tools, from password generators to file converters, 
                  designed for the modern workplace.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Small Business Owners</h3>
                <p className="text-purple-700 text-sm">
                  Manage your business operations efficiently with our calculators, converters, and generators 
                  without expensive software subscriptions.
                </p>
              </div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Commitment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy First</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Your data stays with you. All our tools process information locally in your browser, ensuring 
                  your sensitive data never leaves your device.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Always Free</h3>
                <p className="text-gray-700 text-sm">
                  We believe essential tools should be accessible to everyone. All our utilities are completely 
                  free to use with no hidden fees or premium tiers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">User-Centric Design</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Our tools are designed with simplicity and usability in mind. No complex interfaces or 
                  confusing workflows – just straightforward solutions.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-700 text-sm">
                  We follow WCAG guidelines to ensure our tools are accessible to users with disabilities, 
                  making technology inclusive for everyone.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Why Choose ToolsHub?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Lightning-fast performance with instant results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Mobile-responsive design that works on any device</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">No registration or sign-up required</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Regular updates with new tools and features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Secure, privacy-focused tool processing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Clean, ad-free user experience</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Explore our comprehensive collection of free online tools and discover how they can simplify your daily tasks.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Our Tools
            </Link>
          </div>
        </main>
      </div>
    </div>
  
   </>
   );
};

export default AboutUs;