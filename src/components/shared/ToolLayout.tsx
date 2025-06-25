import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  relatedTools?: Array<{
    name: string;
    path: string;
  }>;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  children,
  relatedTools = []
}) => {
  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span>/</span>
          <span>{title}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
            <button
              onClick={shareUrl}
              className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Ad Placeholder - Medium Rectangle */}
        <div className="ad-banner bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center">
          <p className="text-gray-500 text-sm">Advertisement Space (300x250)</p>
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {children}
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Related Tools</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <a href={tool.path} className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <span className="text-blue-600 font-medium">{tool.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolLayout;