#!/bin/bash

# Setup development environment
echo "🚀 Setting up development environment..."

# Ensure permissions are set correctly
chmod +x ../build.sh

# No need to copy files since we're referencing them in their original location
# Instead, we'll make sure the HTML can be tested in development mode

echo "✅ Development environment setup complete!"
echo "- To work on your site, edit files in the src directory"
echo "- To test your site, open src/html/index.html in a browser"
echo "- To build for production, run ../build.sh from this directory"