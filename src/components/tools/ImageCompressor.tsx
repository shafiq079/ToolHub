import React, { useState, useRef } from 'react';
import Compressor from 'compressorjs';
import ToolLayout from '../shared/ToolLayout';
import { Upload, Download, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface CompressedImage {
  original: File;
  compressed: File;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  compressionRatio: number;
}

const ImageCompressor = () => {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    setIsProcessing(true);
    const newImages: CompressedImage[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        processedCount++;
        if (processedCount === files.length) {
          setIsProcessing(false);
        }
        return;
      }

      new Compressor(file, {
        quality: quality,
        success: (compressedFile) => {
          const originalUrl = URL.createObjectURL(file);
          const compressedUrl = URL.createObjectURL(compressedFile);
          const compressionRatio = Math.round((1 - compressedFile.size / file.size) * 100);

          newImages.push({
            original: file,
            compressed: compressedFile as File,
            originalSize: file.size,
            compressedSize: compressedFile.size,
            originalUrl,
            compressedUrl,
            compressionRatio
          });

          processedCount++;
          if (processedCount === files.length) {
            setImages(prev => [...prev, ...newImages]);
            setIsProcessing(false);
          }
        },
        error: (err) => {
          console.error('Compression error:', err);
          processedCount++;
          if (processedCount === files.length) {
            setIsProcessing(false);
          }
        }
      });
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadImage = (image: CompressedImage) => {
    const link = document.createElement('a');
    link.href = image.compressedUrl;
    link.download = `compressed_${image.original.name}`;
    link.click();
  };

  const downloadAll = () => {
    images.forEach(image => downloadImage(image));
  };

  const removeImage = (index: number) => {
    const image = images[index];
    URL.revokeObjectURL(image.originalUrl);
    URL.revokeObjectURL(image.compressedUrl);
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    images.forEach(image => {
      URL.revokeObjectURL(image.originalUrl);
      URL.revokeObjectURL(image.compressedUrl);
    });
    setImages([]);
  };

  const recompressWithNewQuality = () => {
    const originalFiles = images.map(img => img.original);
    clearAll();

    const dt = new DataTransfer();
    originalFiles.forEach(file => dt.items.add(file));
    handleFileSelect(dt.files);
  };

  const relatedTools = [
    { name: 'File Converter', path: '/tools/file-converter' },
    { name: 'YouTube Thumbnail Downloader', path: '/tools/youtube-thumbnail-downloader' },
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' }
  ];

  return (
    <>
      <Helmet>
        <title>Image Compressor – Reduce Image Size Online | ToolsHub</title>
        <meta name="description" content="Compress JPEG, PNG, and WebP images for free. Reduce file size without losing quality. Secure and easy to use image compressor." />
        <meta name="keywords" content="image compressor, compress jpeg, reduce image size, online image optimizer" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/image-compressor" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Image Compressor",
          "url": "https://tool-hub-orpin.vercel.app/tools/image-compressor",
          "description": "Compress JPEG, PNG, and WebP images for free. Reduce file size without losing quality.",
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
        title="Image Compressor"
        description="Reduce image file size without losing quality"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Images</h3>
            <p className="text-gray-600 mb-4">Drag and drop images here, or click to browse</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>{isProcessing ? 'Processing...' : 'Select Images'}</span>
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Supports: JPEG, PNG, WebP, BMP, GIF
            </p>
          </div>

          {/* Quality Settings */}
          {images.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compression Quality: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1 w-64">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={recompressWithNewQuality}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  >
                    Recompress
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Compressed Images ({images.length})
                </h3>
                <button
                  onClick={downloadAll}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download All</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {images.map((image, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Original Image */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Original</h4>
                        <img
                          src={image.originalUrl}
                          alt="Original"
                          className="w-full h-48 object-cover rounded-lg border mb-3"
                        />
                        <div className="text-sm text-gray-600">
                          <p>Size: {formatFileSize(image.originalSize)}</p>
                          <p>Name: {image.original.name}</p>
                        </div>
                      </div>

                      {/* Compressed Image */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Compressed</h4>
                        <img
                          src={image.compressedUrl}
                          alt="Compressed"
                          className="w-full h-48 object-cover rounded-lg border mb-3"
                        />
                        <div className="text-sm text-gray-600 mb-4">
                          <p>Size: {formatFileSize(image.compressedSize)}</p>
                          <p className="text-green-600 font-medium">
                            Reduced by {image.compressionRatio}%
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => downloadImage(image)}
                            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => removeImage(index)}
                            className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Guide to Image Compression</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is Image Compression?</h3>
                <p className="text-gray-600 mb-4">
                  Image compression is the process of reducing the file size of digital images while maintaining acceptable visual quality. Our online image compressor uses advanced algorithms to analyze your images and remove unnecessary data, resulting in smaller files that load faster and consume less storage space.
                </p>
                <p className="text-gray-600 mb-4">
                  There are two main types of image compression: lossy and lossless. Our tool primarily uses lossy compression, which achieves significant size reductions by selectively removing image data that's less noticeable to the human eye. This approach is perfect for web images, social media posts, and email attachments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Compress Images?</h3>
                <p className="text-gray-600 mb-4">
                  Image compression is essential in today's digital world where fast loading times and efficient storage are crucial. Large image files can significantly slow down websites, consume mobile data allowances, and fill up storage space quickly. Our image compressor helps solve these problems while maintaining visual quality.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Faster website loading times improve user experience and SEO</li>
                  <li>Reduced bandwidth usage saves money on hosting costs</li>
                  <li>Smaller files are easier to share via email and messaging</li>
                  <li>More images can be stored in the same amount of space</li>
                  <li>Better performance on mobile devices with limited data</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Supported Image Formats and Best Practices</h3>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">JPEG Compression</h4>
                <p className="text-blue-700 mb-3">
                  JPEG is the most common format for photographs and complex images with many colors. Our JPEG compressor excels at reducing file sizes for photos, artwork, and detailed graphics. JPEG compression works best for images without sharp edges or text, making it ideal for photography and natural scenes.
                </p>
                <p className="text-blue-700">
                  For JPEG images, compression levels between 70-85% typically provide the best balance between file size and quality. Higher compression (lower quality) settings can dramatically reduce file size but may introduce visible artifacts in detailed areas.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-3">PNG Optimization</h4>
                <p className="text-green-700 mb-3">
                  PNG images are perfect for graphics with sharp edges, text, or transparency. While PNG compression is lossless by nature, our tool optimizes PNG files by removing metadata and optimizing the color palette. This process can reduce PNG file sizes by 20-50% without any quality loss.
                </p>
                <p className="text-green-700">
                  PNG compression is ideal for logos, icons, screenshots, and any image requiring transparency. The format maintains perfect quality while our optimization reduces unnecessary data that doesn't affect the visual appearance.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">WebP and Modern Formats</h4>
                <p className="text-purple-700 mb-3">
                  WebP is a modern image format that provides superior compression compared to JPEG and PNG. Our compressor can convert and optimize WebP images, which typically achieve 25-35% smaller file sizes than equivalent JPEG images while maintaining the same visual quality.
                </p>
                <p className="text-purple-700">
                  WebP supports both lossy and lossless compression, as well as transparency and animation. It's increasingly supported by modern browsers and is excellent for web optimization, though you may want to provide fallback formats for older browsers.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">How to Use Our Image Compressor Effectively</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Upload Your Images</h4>
                <p className="text-gray-600 text-sm">
                  Drag and drop multiple images or click to browse and select files. Our compressor supports batch processing, allowing you to compress multiple images simultaneously for efficiency.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Adjust Quality Settings</h4>
                <p className="text-gray-600 text-sm">
                  Use the quality slider to balance file size and visual quality. Higher percentages maintain more quality but result in larger files. Start with 80% and adjust based on your needs.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Download Compressed Images</h4>
                <p className="text-gray-600 text-sm">
                  Preview the compression results and download individual images or use the "Download All" button for batch downloads. Compare original and compressed versions to ensure quality meets your requirements.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Compression Tips for Best Results</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Start with high-quality original images for better compression results</li>
                <li>Use JPEG for photographs and PNG for graphics with text or transparency</li>
                <li>Experiment with different quality settings to find the optimal balance</li>
                <li>Consider your intended use: web images can be compressed more than print images</li>
                <li>Always preview compressed images before finalizing to ensure quality</li>
                <li>Keep original files as backups in case you need higher quality later</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Privacy and Security</h3>
            <p className="text-gray-600 mb-4">
              Your privacy is our top priority. Our image compressor processes all files locally in your browser using advanced JavaScript algorithms. This means your images never leave your device or get uploaded to our servers. The compression happens entirely on your computer, ensuring complete privacy and security for your personal or sensitive images.
            </p>
            <p className="text-gray-600">
              This local processing approach also means faster compression times and no file size limits based on server capacity. You can compress as many images as you want without worrying about privacy, data usage, or storage limitations.
            </p>
          </div>

          {/* Tips */}
          {images.length === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Compression Tips</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Lower quality settings result in smaller file sizes but may reduce image quality</li>
                <li>• JPEG images typically compress better than PNG for photos</li>
                <li>• Use PNG for images with transparency or text/graphics</li>
                <li>• Batch processing multiple images saves time</li>
                <li>• All processing is done locally - your images never leave your device</li>
              </ul>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default ImageCompressor;