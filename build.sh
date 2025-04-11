#!/bin/bash

# Create a production build from source files
echo "🚀 Starting build process..."

# Create a clean build
echo "🧹 Cleaning up previous build files..."
rm -f styles.min.css scripts.min.js critical.min.css index.html

# Minify CSS
echo "🎨 Minifying CSS..."
cleancss -o styles.min.css src/css/styles.css
cleancss -o critical.min.css src/css/critical.css

# Minify JavaScript
echo "📜 Minifying JavaScript..."
uglifyjs src/js/scripts.js -o scripts.min.js

# Process HTML - Replace references to non-minified files with minified versions
# and update all relative paths from development to production structure
echo "📄 Processing HTML..."
cat src/html/index.html | \
  sed 's/\.\.\/css\/critical\.css/critical\.min\.css/g' | \
  sed 's/\.\.\/css\/styles\.css/styles\.min\.css/g' | \
  sed 's/\.\.\/js\/scripts\.js/scripts\.min\.js/g' | \
  sed 's/\.\.\/images\//images\//g' | \
  sed 's/\.\.\/icons\//icons\//g' | \
  sed 's/\.\.\/site\.webmanifest/site\.webmanifest/g' > index.html

# Try to minify HTML if the tool is available
if command -v html-minifier &> /dev/null; then
  echo "⚡️ Minifying HTML with html-minifier..."
  mv index.html index.html.temp
  html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype index.html.temp > index.html
  rm index.html.temp
else
  echo "⚠️  html-minifier not found - HTML compression skipped. To enable HTML minification, install with: npm install -g html-minifier"
fi

# Copy webmanifest file if it has changed
echo "📋 Copying webmanifest file..."
cp -f src/site.webmanifest ./

echo "✅ Build completed! Files have been generated in the root directory."