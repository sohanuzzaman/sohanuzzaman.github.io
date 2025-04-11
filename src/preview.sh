#!/bin/bash

# Start a development server for previewing the site
echo "🚀 Starting development preview server..."

# Change to the src directory
cd "$(dirname "$0")"

# Check if Python is available for serving
if command -v python3 &> /dev/null; then
  echo "🌐 Starting Python HTTP server on port 8000..."
  echo "📱 Preview your site at: http://localhost:8000/html/"
  python3 -m http.server 8000
elif command -v python &> /dev/null; then
  # Fall back to Python 2 if Python 3 is not available
  echo "🌐 Starting Python HTTP server on port 8000..."
  echo "📱 Preview your site at: http://localhost:8000/html/"
  python -m SimpleHTTPServer 8000
else
  echo "❌ Python is not installed. Please install Python or use an alternative method to preview your site."
  echo "💡 You can open the HTML file directly in your browser:"
  echo "file://$(pwd)/html/index.html"
  
  # Try to open the file directly in the default browser
  if command -v open &> /dev/null; then
    echo "🌐 Opening HTML file in your default browser..."
    open "html/index.html"
  fi
fi