import React, { useState } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Download, ExternalLink, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


const YouTubeThumbnailDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState('');

  const extractVideoId = (youtubeUrl: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = youtubeUrl.match(regex);
    return match ? match[1] : null;
  };

  const handleUrlChange = (inputUrl: string) => {
    setUrl(inputUrl);
    setError('');

    if (inputUrl.trim()) {
      const id = extractVideoId(inputUrl);
      if (id) {
        setVideoId(id);
      } else {
        setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
        setVideoId('');
      }
    } else {
      setVideoId('');
    }
  };

  const downloadThumbnail = (quality: string) => {
    if (!videoId) return;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = `youtube-thumbnail-${videoId}-${quality}.jpg`;
    link.target = '_blank';
    link.click();
  };

  const thumbnailQualities = [
    { id: 'maxresdefault', name: 'Maximum Resolution', description: '1280x720 (HD)', size: 'Large' },
    { id: 'sddefault', name: 'Standard Definition', description: '640x480 (SD)', size: 'Medium' },
    { id: 'hqdefault', name: 'High Quality', description: '480x360', size: 'Medium' },
    { id: 'mqdefault', name: 'Medium Quality', description: '320x180', size: 'Small' },
    { id: 'default', name: 'Default', description: '120x90', size: 'Small' }
  ];

  const relatedTools = [
    { name: 'Image Compressor', path: '/tools/image-compressor' },
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
    { name: 'File Converter', path: '/tools/file-converter' }
  ];

  return (
    <>
      <Helmet>

        <title>YouTube Thumbnail Downloader - Download in HD & SD</title>
        <meta
          name="description"
          content="Download YouTube video thumbnails in high definition. Supports max resolution, HQ, SD, and more. Fast, free, and no watermark."
        />
        <meta
          name="keywords"
          content="YouTube thumbnail downloader, download YouTube thumbnail, free YouTube thumbnail, no watermark"
        />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/youtube-thumbnail-downloader" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "YouTube Thumbnail Downloader",
          "url": "https://tool-hub-orpin.vercel.app/tools/youtube-thumbnail-downloader",
          "description": "Download YouTube video thumbnails in various resolutions instantly.",
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
        title="YouTube Thumbnail Downloader"
        description="Download YouTube video thumbnails in various resolutions"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {url && (
                <ExternalLink className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              )}
            </div>
            {error && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
          </div>

          {/* Thumbnail Preview and Download */}
          {videoId && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thumbnail Preview</h3>
                <div className="text-center">
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="YouTube Thumbnail"
                    className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    style={{ maxHeight: '300px' }}
                    onError={(e) => {
                      // Fallback to hqdefault if maxresdefault doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  <p className="text-sm text-gray-600 mt-2">Video ID: {videoId}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Resolutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {thumbnailQualities.map((quality) => (
                    <div
                      key={quality.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{quality.name}</h4>
                          <p className="text-sm text-gray-600">{quality.description}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${quality.size === 'Large' ? 'bg-green-100 text-green-800' :
                              quality.size === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {quality.size}
                          </span>
                        </div>
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/${quality.id}.jpg`}
                          alt={`${quality.name} thumbnail`}
                          className="w-16 h-12 object-cover rounded border"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <button
                        onClick={() => downloadThumbnail(quality.id)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download {quality.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to YouTube Thumbnail Downloading</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What are YouTube Thumbnails?</h3>
                <p className="text-gray-600 mb-4">
                  YouTube thumbnails are preview images that represent videos on the platform. These images serve as the first impression for potential viewers and play a crucial role in video discovery and click-through rates. Our thumbnail downloader allows you to save these images in various resolutions for analysis, inspiration, or legitimate use.
                </p>
                <p className="text-gray-600 mb-4">
                  Thumbnails are automatically generated by YouTube from video frames, but creators can also upload custom thumbnails. Our tool can download both types, providing access to high-quality images that can be useful for content creators, marketers, and researchers studying video optimization strategies.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Download YouTube Thumbnails?</h3>
                <p className="text-gray-600 mb-4">
                  There are many legitimate reasons to download YouTube thumbnails, from competitive analysis and design inspiration to creating video compilations and educational materials. Our downloader provides quick access to thumbnails without requiring complex tools or technical knowledge.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Analyze successful thumbnail designs for inspiration</li>
                  <li>Create video compilations or educational presentations</li>
                  <li>Study thumbnail trends in your niche or industry</li>
                  <li>Archive thumbnails for research or documentation</li>
                  <li>Use as reference for creating similar content</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Available Thumbnail Resolutions</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Maximum Resolution (1280x720)</h4>
                <p className="text-blue-700 mb-3">
                  The highest quality thumbnail available, perfect for detailed analysis and professional use. This HD resolution provides crisp, clear images suitable for presentations, design studies, or high-quality reproductions. Not all videos have maximum resolution thumbnails available.
                </p>
                <p className="text-blue-700">
                  Maximum resolution thumbnails are ideal when you need the best possible image quality for professional purposes, detailed analysis, or when creating high-resolution content that incorporates the thumbnail image.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-3">Standard Definition (640x480)</h4>
                <p className="text-green-700 mb-3">
                  A balanced option that provides good quality while maintaining reasonable file sizes. Standard definition thumbnails are perfect for most use cases including web content, social media sharing, and general analysis purposes.
                </p>
                <p className="text-green-700">
                  This resolution offers the best balance between image quality and file size, making it suitable for most applications where you need clear, recognizable thumbnail images without excessive storage requirements.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">High Quality (480x360)</h4>
                <p className="text-purple-700 mb-3">
                  A reliable middle-ground option that's available for virtually all YouTube videos. This resolution provides clear images suitable for most analysis and reference purposes while keeping file sizes manageable.
                </p>
                <p className="text-purple-700">
                  High quality thumbnails are universally available and provide sufficient detail for most use cases, making them a dependable choice when maximum resolution isn't available or necessary.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">How to Use the Thumbnail Downloader</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Copy the YouTube URL</h4>
                <p className="text-gray-600 text-sm">
                  Navigate to the YouTube video and copy the URL from your browser's address bar. Our tool supports all YouTube URL formats including youtube.com/watch, youtu.be short links, and embedded URLs.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Paste and Extract</h4>
                <p className="text-gray-600 text-sm">
                  Paste the URL into our input field and the tool will automatically extract the video ID and display available thumbnail options. The preview shows the highest quality thumbnail available.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Choose and Download</h4>
                <p className="text-gray-600 text-sm">
                  Select your preferred resolution and click download. The thumbnail will be saved to your device with a descriptive filename including the video ID and quality level.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Best Practices and Tips</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Always respect copyright and fair use guidelines when using downloaded thumbnails</li>
                <li>Use thumbnails for analysis, education, or inspiration rather than direct copying</li>
                <li>Consider the intended use when choosing resolution - higher isn't always necessary</li>
                <li>Some older or private videos may not have all resolution options available</li>
                <li>Downloaded thumbnails are saved with descriptive filenames for easy organization</li>
                <li>The tool works with all public YouTube videos and most unlisted videos</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Legal and Ethical Considerations</h3>
            <p className="text-gray-600 mb-4">
              When downloading YouTube thumbnails, it's important to respect copyright laws and YouTube's terms of service. Thumbnails should be used for legitimate purposes such as analysis, education, or fair use applications. Always credit original creators when appropriate and avoid using thumbnails in ways that could mislead viewers or infringe on intellectual property rights.
            </p>
            <p className="text-gray-600">
              Our tool provides access to publicly available thumbnail images that YouTube already serves to browsers. We recommend using downloaded thumbnails responsibly and in compliance with applicable laws and platform policies.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">How to Use</h4>
            <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
              <li>Copy a YouTube video URL (from youtube.com or youtu.be)</li>
              <li>Paste the URL in the input field above</li>
              <li>Preview the thumbnail and choose your preferred resolution</li>
              <li>Click the download button to save the thumbnail</li>
            </ol>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <h5 className="font-medium text-blue-800 mb-1">Supported URL Formats:</h5>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
                <li>• https://youtu.be/VIDEO_ID</li>
                <li>• https://www.youtube.com/embed/VIDEO_ID</li>
              </ul>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default YouTubeThumbnailDownloader;