import { useEffect, useState } from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import { useCalendlyPreload } from '../hooks/useCalendlyPreload';

interface CalendlyModalProps {
  url?: string;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ 
  url = 'https://calendly.com/mohan94/15min' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  
  // Preload Calendly resources for faster loading
  const isPreloaded = useCalendlyPreload({ 
    preloadDelay: 2000, // Start preloading after 2 seconds
    defaultUrl: url 
  });

  // Add Calendly event listeners for better UX
  useCalendlyEventListener({
    onProfilePageViewed: () => {
      console.log('Calendly profile page viewed');
      setIsLoading(false); // Calendly has loaded
    },
    onDateAndTimeSelected: () => {
      console.log('Date and time selected');
    },
    onEventTypeViewed: () => {
      console.log('Event type viewed');
      setIsLoading(false); // Calendly has loaded
    },
    onEventScheduled: (e) => {
      console.log('Event scheduled:', e.data.payload);
      // Optional: Auto-close modal after successful booking
      setTimeout(() => {
        closeModal();
      }, 2000);
    },
    onPageHeightResize: (e) => {
      console.log('Page height resized:', e.data.payload.height);
      setIsLoading(false); // Calendly has loaded
    },
  });

  useEffect(() => {
    const handleOpenCalendly = (event: Event) => {
      const customEvent = event as CustomEvent;
      const calendlyUrl = customEvent.detail?.url || url;
      setCurrentUrl(calendlyUrl);
      setIsOpen(true);
      setIsLoading(!isPreloaded); // Show loading if not preloaded
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openCalendly', handleOpenCalendly);
    
    return () => {
      window.removeEventListener('openCalendly', handleOpenCalendly);
      document.body.style.overflow = 'auto';
    };
  }, [url, isPreloaded]);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`custom-modal ${isOpen ? 'active' : ''}`} 
      id="calendlyModal"
      onClick={(e) => {
        // Close modal when clicking outside the content
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="modal-content calendly-modal-content">
        <button className="modal-close" onClick={closeModal}>
          <i className="ri-close-line"></i>
        </button>
        <div className="calendly-container">
          {isLoading && (
            <div className="calendly-loading" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'var(--color-dark-light)',
              zIndex: 10
            }}>
              <div style={{ textAlign: 'center' }}>
                <div 
                  className="loading-spinner" 
                  style={{
                    margin: '0 auto 20px',
                    width: '50px',
                    height: '50px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    borderTopColor: 'var(--color-primary)',
                    animation: 'spin 1s linear infinite'
                  }}
                />
                <p style={{ color: 'var(--color-light)' }}>
                  {isPreloaded ? 'Loading calendar...' : 'Preparing calendar...'}
                </p>
              </div>
            </div>
          )}
          <InlineWidget
            url={currentUrl}
            styles={{
              height: '100%',
              minWidth: '320px'
            }}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: 'fdd835', // Your brand yellow color
              textColor: '4d5055'
            }}
            prefill={{
              // You can prefill form fields if needed
              // name: 'Guest',
              // email: 'guest@example.com'
            }}
            utm={{
              // UTM parameters for tracking
              utmCampaign: 'website-modal',
              utmSource: 'website',
              utmMedium: 'modal'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendlyModal;