import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
   <>
   <Helmet>
  <title>Contact Us | ToolsHub</title>
  <meta name="description" content="Have questions or need help? Contact the ToolsHub team via our support page. We're here to assist you with any queries." />
  <meta name="keywords" content="contact toolshub, toolshub support, help, contact form" />
  <link rel="canonical" href="https://tool-hub-orpin.vercel.app/contact" />
  
  {/* Open Graph */}
  <meta property="og:title" content="Contact Us | ToolsHub" />
  <meta property="og:description" content="Have questions or need help? Contact the ToolsHub team via our support page." />
  <meta property="og:url" content="https://tool-hub-orpin.vercel.app/contact" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Contact Us | ToolsHub" />
  <meta name="twitter:description" content="Reach out to ToolsHub for any inquiries or support." />
</Helmet>

<script type="application/ld+json">
  {`
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Us",
      "url": "https://tool-hub-orpin.vercel.app/contact",
      "description": "Get in touch with the ToolsHub support team for any questions or technical issues."
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
          <span>Contact Us</span>
        </div>

        {/* Main Content */}
        <main className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question, suggestion, or feedback? We'd love to hear from you. 
              Get in touch and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="flex items-center mb-6">
                <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700 text-sm">
                    Thank you for contacting us. We'll get back to you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="bug-report">Bug Report</option>
                      <option value="feature-request">Feature Request</option>
                      <option value="tool-suggestion">New Tool Suggestion</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                      placeholder="Please describe your inquiry, feedback, or suggestion in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    * Required fields. We typically respond within 24-48 hours.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Email Support</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    For general inquiries and support:
                  </p>
                  <a 
                    href="mailto:support@toolshub.example.com" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    support@toolshub.example.com
                  </a>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Response Time</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• General inquiries: 24-48 hours</li>
                    <li>• Bug reports: 12-24 hours</li>
                    <li>• Feature requests: 2-5 business days</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">What to Include</h3>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Detailed description of your issue or request</li>
                    <li>• Browser and device information (for bug reports)</li>
                    <li>• Steps to reproduce the problem</li>
                    <li>• Screenshots if applicable</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Before You Contact Us</h3>
                  <p className="text-yellow-800 text-sm mb-3">
                    Check if your question might already be answered:
                  </p>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Try refreshing the page or clearing your browser cache</li>
                    <li>• Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge)</li>
                    <li>• Check if the issue persists in an incognito/private window</li>
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Are your tools really free?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes! All our tools are completely free to use with no hidden fees, registration requirements, or premium tiers.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Is my data safe when using your tools?</h4>
                    <p className="text-gray-600 text-sm">
                      Absolutely. Most of our tools process data locally in your browser, meaning your information never leaves your device.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Can I suggest a new tool?</h4>
                    <p className="text-gray-600 text-sm">
                      We'd love to hear your suggestions! Use the contact form above with "New Tool Suggestion" as the subject.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
   </>
  );
};

export default ContactUs;