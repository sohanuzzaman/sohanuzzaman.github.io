#!/bin/bash

# WebP conversion script
# This script converts images from original_images to WebP format and places them in src/images

echo "🖼️  Starting WebP image conversion..."

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
  echo "❌ cwebp is not installed. Please install it using: brew install webp"
  exit 1
fi

# Create directory if it doesn't exist
mkdir -p ../src/images

# Process JPG and PNG files
for file in ../original_images/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  # Skip if no files match the pattern
  [ -e "$file" ] || continue
  
  # Get filename without extension and path
  filename=$(basename -- "$file")
  name="${filename%.*}"
  
  echo "🔄 Converting $filename to WebP..."
  
  # Create standard WebP version
  cwebp -q 85 "$file" -o "../src/images/${name}.webp"
  
  # Create smaller version for mobile
  width=$(identify -format "%w" "$file")
  if [ $width -gt 800 ]; then
    echo "  ➕ Creating smaller version for mobile..."
    cwebp -q 75 -resize 400 0 "$file" -o "../src/images/${name}-400w.webp"
  elif [ $width -gt 500 ]; then
    echo "  ➕ Creating smaller version for mobile..."
    cwebp -q 75 -resize 300 0 "$file" -o "../src/images/${name}-300w.webp"
  fi
done

echo "✅ WebP conversion completed! Images are in src/images/"