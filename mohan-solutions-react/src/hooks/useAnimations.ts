import { useEffect } from 'react';

export const useGradientEffect = () => {
  useEffect(() => {
    // Get all wrapper elements that should have the gradient border effect
    const allWrapperElements = document.querySelectorAll(
      '.service-card-wrapper, .testimonial-card-wrapper, .timeline-content-wrapper, .video-testimonial-wrapper'
    );

    if (allWrapperElements.length === 0) return;

    // Only proceed if we found elements and are not on mobile
    const isMobile = window.innerWidth <= 768;

    // Desktop effect: Use passive event listeners and throttle for performance
    if (!isMobile) {
      let rafId: number;
      
      const handleMouseMove = (e: MouseEvent) => {
        // Cancel previous animation frame
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        
        // Use requestAnimationFrame for smooth performance
        rafId = requestAnimationFrame(() => {
          const threshold = 200; // Distance threshold for effect

          allWrapperElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to element center
            const distance = Math.sqrt(
              Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
            );
            
            if (distance < threshold) {
              // Calculate relative position within the element
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              // Calculate opacity based on distance (closer = more opaque)
              const opacity = 1 - (distance / threshold);
              
              // Update CSS variables directly on the element
              (element as HTMLElement).style.setProperty('--x', `${x}px`);
              (element as HTMLElement).style.setProperty('--y', `${y}px`);
              (element as HTMLElement).style.setProperty('--opacity', opacity.toString());
            } else {
              // Hide the gradient if mouse is too far
              (element as HTMLElement).style.setProperty('--opacity', '0');
            }
          });
        });
      };
      
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    } 
    // Mobile effect: Use IntersectionObserver for better performance
    else {
      // Track which elements have already been animated
      const animatedElements = new Set();
      
      // Use IntersectionObserver instead of scroll event
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            // Add element to the set of animated elements
            animatedElements.add(entry.target);
            
            // Add delay based on the element's position
            setTimeout(() => {
              entry.target.classList.add('mobile-glow-active');
              
              // Remove the class after animation completes
              setTimeout(() => {
                entry.target.classList.remove('mobile-glow-active');
                animatedElements.delete(entry.target); // Allow re-animation
              }, 3500); // Match animation duration
            }, Math.random() * 500); // Random delay up to 500ms
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
      });
      
      allWrapperElements.forEach(element => {
        observer.observe(element);
      });
      
      return () => {
        observer.disconnect();
      };
    }
  }, []);
};

export const useScrollAnimations = () => {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-item');
    
    // Use IntersectionObserver if available, otherwise fallback to scroll event
    if ('IntersectionObserver' in window && window.IntersectionObserver) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animationObserver.unobserve(entry.target); // Stop watching once visible
          }
        });
      }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      });
      
      animatedElements.forEach(element => {
        animationObserver.observe(element);
      });
      
      return () => {
        animationObserver.disconnect();
      };
    }
    
    // Fallback scroll event handler
    const animateOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
          element.classList.add('visible');
        }
      });
    };
    
    // Initial check for visible elements
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
};
