import { useEffect, useRef } from 'react';

interface CalendlyPreloadOptions {
  preloadDelay?: number;
  defaultUrl?: string;
}

export const useCalendlyPreload = (options: CalendlyPreloadOptions = {}) => {
  const { preloadDelay = 3000, defaultUrl = 'https://calendly.com/mohan94/15min' } = options;
  const isPreloaded = useRef(false);

  useEffect(() => {
    const preloadCalendly = () => {
      if (isPreloaded.current) return;

      // Check if Calendly is already loaded
      if (window.Calendly) {
        isPreloaded.current = true;
        return;
      }

      // Preload Calendly CSS
      const calendlyCSS = document.createElement('link');
      calendlyCSS.rel = 'stylesheet';
      calendlyCSS.href = 'https://assets.calendly.com/assets/external/widget.css';
      calendlyCSS.onload = () => {
        console.log('Calendly CSS preloaded');
      };
      document.head.appendChild(calendlyCSS);

      // Preload Calendly JavaScript
      const calendlyScript = document.createElement('script');
      calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
      calendlyScript.async = true;
      calendlyScript.onload = () => {
        console.log('Calendly JS preloaded');
        isPreloaded.current = true;

        // Create a hidden preload instance to warm up Calendly
        if (defaultUrl) {
          const preloadContainer = document.createElement('div');
          preloadContainer.style.cssText = `
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
            visibility: hidden;
          `;
          
          // Create the Calendly inline widget element
          const calendlyWidget = document.createElement('div');
          calendlyWidget.className = 'calendly-inline-widget';
          calendlyWidget.setAttribute('data-url', `${defaultUrl}?hide_event_type_details=1&hide_gdpr_banner=1`);
          calendlyWidget.style.cssText = 'min-width: 320px; height: 1px;';
          
          preloadContainer.appendChild(calendlyWidget);
          document.body.appendChild(preloadContainer);

          // Initialize Calendly for the hidden widget if the API is available
          if (window.Calendly?.initInlineWidget) {
            setTimeout(() => {
              try {
                window.Calendly?.initInlineWidget({
                  url: defaultUrl,
                  parentElement: calendlyWidget,
                  prefill: {},
                  utm: {}
                });
              } catch (error) {
                console.warn('Calendly preload initialization failed:', error);
              }

              // Clean up the preload container after initialization
              setTimeout(() => {
                if (document.body.contains(preloadContainer)) {
                  document.body.removeChild(preloadContainer);
                }
              }, 2000);
            }, 1000);
          }
        }
      };
      
      calendlyScript.onerror = () => {
        console.warn('Failed to preload Calendly script');
      };

      document.body.appendChild(calendlyScript);
    };

    // Use requestIdleCallback for better performance, with fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => preloadCalendly(), { timeout: preloadDelay });
    } else {
      setTimeout(preloadCalendly, preloadDelay);
    }

    // Cleanup function
    return () => {
      // If we need to clean up any resources, we can do it here
    };
  }, [preloadDelay, defaultUrl]);

  return isPreloaded.current;
};

// Type declaration for Calendly window object
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill: Record<string, any>;
        utm: Record<string, any>;
      }) => void;
      closePopupWidget: () => void;
      showPopupWidget: (url: string) => void;
      destroyBadgeWidget: () => void;
      initBadgeWidget: (options: any) => void;
    };
  }
}
