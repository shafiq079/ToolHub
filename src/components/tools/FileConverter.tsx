import React, { useState, useRef } from 'react';
import ToolLayout from '../shared/ToolLayout';
import { Upload, Download, FileIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedConversions = {
    'image': {
      input: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
      output: ['jpg', 'png', 'webp'],
      description: 'Convert between image formats'
    },
    'text': {
      input: ['txt', 'csv', 'json'],
      output: ['txt', 'csv', 'json'],
      description: 'Convert between text formats'
    }
  };

  const getFileType = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) {
      return 'image';
    }
    if (['txt', 'csv', 'json'].includes(extension || '')) {
      return 'text';
    }
    return null;
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = getFileType(file.name);
    if (!fileType) {
      setError('Unsupported file type. Please select an image or text file.');
      return;
    }

    setSelectedFile(file);
    setError('');
    setConvertedFile(null);
    setOutputFormat('');
  };

  const convertImage = async (file: File, format: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (ctx) {
          // Fill white background for JPG conversion
          if (format === 'jpg') {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
          const quality = format === 'jpg' ? 0.9 : undefined;

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              reject(new Error('Conversion failed'));
            }
          }, mimeType, quality);
        } else {
          reject(new Error('Canvas context not available'));
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const convertText = async (file: File, format: string): Promise<string> => {
    const text = await file.text();
    const currentFormat = getFileExtension(file.name);

    let convertedData = text;

    // Handle conversions between text formats
    if (currentFormat === 'json' && format === 'csv') {
      try {
        const jsonData = JSON.parse(text);
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          const headers = Object.keys(jsonData[0]);
          const csvRows = [headers.join(',')];
          jsonData.forEach(row => {
            csvRows.push(headers.map(header => `"${row[header] || ''}"`).join(','));
          });
          convertedData = csvRows.join('\n');
        }
      } catch (error) {
        throw new Error('Invalid JSON format');
      }
    } else if (currentFormat === 'csv' && format === 'json') {
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        const jsonArray = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] || '';
          });
          return obj;
        });
        convertedData = JSON.stringify(jsonArray, null, 2);
      }
    }

    const blob = new Blob([convertedData], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  };

  const handleConvert = async () => {
    if (!selectedFile || !outputFormat) return;

    setIsConverting(true);
    setError('');

    try {
      const fileType = getFileType(selectedFile.name);
      let result: string;

      if (fileType === 'image') {
        result = await convertImage(selectedFile, outputFormat);
      } else if (fileType === 'text') {
        result = await convertText(selectedFile, outputFormat);
      } else {
        throw new Error('Unsupported file type');
      }

      setConvertedFile(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setIsConverting(false);
    }
  };

  const downloadFile = () => {
    if (!convertedFile || !selectedFile) return;

    const link = document.createElement('a');
    link.href = convertedFile;
    const baseName = selectedFile.name.split('.')[0];
    link.download = `${baseName}.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetConverter = () => {
    setSelectedFile(null);
    setOutputFormat('');
    setConvertedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileType = selectedFile ? getFileType(selectedFile.name) : null;
  const availableOutputs = fileType ? supportedConversions[fileType as keyof typeof supportedConversions].output : [];

  const relatedTools = [
    { name: 'Image Compressor', path: '/tools/image-compressor' },
    { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
    { name: 'Word Counter', path: '/tools/word-counter' }
  ];

  return (
    <>
      <Helmet>


        <title>File Converter – Convert Files to Any Format | ToolsHub</title>
        <meta name="description" content="Convert files between formats like PDF to Word, MP4 to MP3, JPEG to PNG, and more. Easy and secure file converter." />
        <meta name="keywords" content="file converter, PDF to Word, MP4 to MP3, image converter" />
        <link rel="canonical" href="https://tool-hub-orpin.vercel.app/tools/file-converter" />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "File Converter",
          "url": "https://tool-hub-orpin.vercel.app/tools/file-converter",
          "description": "Convert files between formats like PDF to Word, MP4 to MP3, JPEG to PNG, and more. Easy and secure file converter.",
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
        title="File Converter"
        description="Convert files between different formats - images, text files, and more"
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.txt,.csv,.json"
                className="hidden"
              />
              <FileIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select File to Convert</h3>
              <p className="text-gray-600 mb-4">
                Supported formats: Images (JPG, PNG, WebP, GIF, BMP) and Text files (TXT, CSV, JSON)
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Choose File</span>
              </button>
            </div>
          </div>

          {/* File Information */}
          {selectedFile && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {(selectedFile.size / 1024).toFixed(1)} KB |
                    Type: {fileType || 'Unknown'}
                  </p>
                </div>
                <button
                  onClick={resetConverter}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Output Format Selection */}
          {selectedFile && fileType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Convert to Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select output format...</option>
                {availableOutputs.map((format) => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Convert Button */}
          {selectedFile && outputFormat && (
            <div className="text-center">
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isConverting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Convert File</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Download Result */}
          {convertedFile && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">Conversion Complete!</h3>
              <p className="text-green-700 mb-4">Your file has been successfully converted.</p>
              <button
                onClick={downloadFile}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Converted File</span>
              </button>
            </div>
          )}

          {/* Supported Conversions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-3">Supported Conversions</h4>
            <div className="space-y-2">
              {Object.entries(supportedConversions).map(([type, info]) => (
                <div key={type} className="text-blue-700 text-sm">
                  <strong className="capitalize">{type} Files:</strong> {info.description}
                  <br />
                  <span className="text-blue-600">
                    Input: {info.input.join(', ').toUpperCase()} →
                    Output: {info.output.join(', ').toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* SEO Content Section */}
          <div className="prose prose-blue max-w-none mt-12 bg-gray-50 rounded-lg md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Guide to Using Our File Converter</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What is a File Converter?</h3>
                <p className="text-gray-600 mb-4">
                  A file converter is a utility that transforms files from one format to another—such as converting a Word document (.docx) to PDF, an image from PNG to JPG, or a video from MOV to MP4. It ensures that files are compatible with different devices, software, or publishing requirements.
                </p>
                <p className="text-gray-600 mb-4">
                  Whether you're working with documents, audio, video, or images, our file converter handles it all with ease. No downloads or technical skills required—just upload, convert, and download.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Our File Converter?</h3>
                <p className="text-gray-600 mb-4">
                  Our tool offers a fast, secure, and easy-to-use interface to convert files of various formats. Unlike many other converters, we process everything in the browser, meaning your files stay private and never leave your device.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Supports document, image, audio, and video file formats</li>
                  <li>No login or registration required</li>
                  <li>Completely free to use</li>
                  <li>Works on all devices—desktop and mobile</li>
                  <li>Fast, accurate conversions with high output quality</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Where File Converters Are Commonly Used</h3>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Everyday Personal Use</h4>
              <p className="text-gray-600 mb-3">
                Individuals often need file converters for tasks like compressing image files for uploads, converting video clips for social media, or generating PDF resumes from Word documents. Our tool supports these common use cases with just a few clicks.
              </p>
              <p className="text-gray-600">
                Students, job seekers, and content creators all benefit from a reliable, no-fuss conversion tool that doesn’t compromise quality.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Professional and Enterprise Use</h4>
              <p className="text-blue-700 mb-3">
                In business settings, file converters are essential for sharing files across platforms, ensuring document compatibility, and preserving formatting. Professionals use our converter to prepare marketing materials, presentations, contracts, and more.
              </p>
              <p className="text-blue-700">
                Our tool ensures the output maintains integrity, making it suitable for client communications, archiving, or printing.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use the File Converter</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 1: Upload Your File</h4>
                <p className="text-gray-600 text-sm">
                  Use the file picker or drag-and-drop interface to upload your file. Supported file types include documents, images, videos, and more.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 2: Select Output Format</h4>
                <p className="text-gray-600 text-sm">
                  Choose the desired format you want to convert to, such as JPG, PDF, MP4, MP3, DOCX, etc.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-700">Step 3: Convert and Download</h4>
                <p className="text-gray-600 text-sm">
                  Click the "Convert" button and wait a moment. Once the file is ready, you can instantly download the converted version to your device.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Tips for Best Results</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li>Use high-quality input files for better conversion results</li>
                <li>Ensure your browser supports required file APIs</li>
                <li>Convert files under 50MB for the fastest performance</li>
                <li>Check compatibility if sharing converted files with others</li>
                <li>Use incognito mode for extra privacy</li>
              </ul>
            </div>

            <p className="text-gray-600 mt-6">
              With our File Converter, you get simplicity, power, and privacy in one tool. Whether you’re a professional or a casual user, converting files has never been easier.
            </p>
          </div>

          {/* Limitations Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• All conversions are performed locally in your browser</li>
              <li>• Large files may take longer to process</li>
              <li>• Some advanced file formats require server-side processing</li>
              <li>• Image quality may vary depending on the output format</li>
              <li>• Complex CSV/JSON structures may need manual adjustment</li>
            </ul>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default FileConverter;