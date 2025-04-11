# Mohan Solutions Website

This is the source code repository for the Mohan Solutions digital strategy and automation portfolio website.

## Project Structure

```
mohansolution/
│
├── build/              # Build output directory
├── icons/              # Favicon and other icons
├── images/             # Optimized images
├── original_images/    # Original, unoptimized images
├── src/                # Source files
│   ├── assets/         # Additional assets
│   ├── css/            # CSS source files
│   ├── html/           # HTML source files
│   ├── icons/          # Icon source files
│   ├── images/         # Image source files
│   ├── js/             # JavaScript source files
│   ├── setup-dev.sh    # Development setup script
│   ├── preview.sh      # Local preview script
│   └── site.webmanifest # Web app manifest
│
├── .gitignore          # Git ignore file
├── build.sh            # Build script
├── CNAME               # Custom domain name for GitHub Pages
├── critical.min.css    # Minified critical CSS
├── index.html          # Main HTML file (built)
├── package.json        # NPM package configuration
├── README.md           # This file
├── scripts.min.js      # Minified JavaScript
├── styles.min.css      # Minified CSS
└── site.webmanifest    # Web app manifest (built)
```

## Development Workflow

### First-time Setup

1. Make sure Node.js is installed
2. Run the setup script: `npm run setup` or `bash ./src/setup-dev.sh`
3. This will install necessary development tools and create configuration files

### Development

1. Run `npm run dev` to start the development server
2. Edit files in the `src/` directory
3. The browser will automatically reload when files change

### Image Optimization

1. Place original images in the `original_images/` directory
2. Run `npm run imagemin` to optimize and convert images to WebP format
3. Optimized images will be placed in `src/images/`

### Building for Production

1. Run `npm run build` to create minified production files
2. All optimized files will be placed in the root directory
3. Deploy these files to your hosting service

### Deployment

The site is designed to be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Any traditional web hosting service

## Available Scripts

- `npm run setup` - Set up the development environment
- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run build:dev` - Build with source maps for debugging
- `npm run imagemin` - Optimize images from original_images/ directory
- `npm run deploy` - Build for production and prepare for deployment

## Browser Support

This website supports all modern browsers and has been optimized for:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS/iPadOS (latest 2 versions)
- Android (latest 2 versions)

Internet Explorer is not supported.