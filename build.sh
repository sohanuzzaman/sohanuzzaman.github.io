#!/bin/bash

# Minify CSS
echo "Minifying CSS..."
cleancss -o dist/styles.min.css styles.css

# Minify JavaScript
echo "Minifying JavaScript..."
uglifyjs scripts.js -o dist/scripts.min.js

echo "Build completed! Minified files updated in the dist folder."