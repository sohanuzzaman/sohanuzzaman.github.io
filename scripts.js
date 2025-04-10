// Remove no-js class to enable enhanced features
document.documentElement.classList.remove('no-js');

// Define a priority-based hydration system
const hydrationQueue = {
  critical: [],    // Executed immediately
  important: [],   // Executed after critical DOM content is ready
  nonessential: [] // Executed after page is fully loaded and idle
};

// Add functions to appropriate queues
function queueHydration(func, priority = 'important') {
  hydrationQueue[priority].push(func);
}

// Process the hydration queue based on page loading stages
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded and scripts running');
  
  // Execute critical functions immediately
  hydrationQueue.critical.forEach(func => func());
  
  // Execute important functions after a short delay
  setTimeout(() => {
    hydrationQueue.important.forEach(func => func());
    console.log('Important features hydrated');
  }, 100);
  
  // Execute non-essential functions when page is idle or after a timeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      hydrationQueue.nonessential.forEach(func => func());
      console.log('Non-essential features hydrated');
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      hydrationQueue.nonessential.forEach(func => func());
      console.log('Non-essential features hydrated');
    }, 2000);
  }
});

// Critical: Header scroll effect (important for UX)
queueHydration(() => {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}, 'critical');

// Important: Scroll animation (visible but can be slightly delayed)
queueHydration(() => {
  // Use IntersectionObserver instead of scroll event for better performance
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.animate-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
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
  } else {
    // Fallback for browsers without IntersectionObserver
    const animatedElements = document.querySelectorAll('.animate-item');
    
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
    
    // Listen for scroll to reveal elements
    window.addEventListener('scroll', animateOnScroll);
  }
});

// Non-essential: GSAP animations (can be loaded after everything else)
queueHydration(() => {
  // Only initialize GSAP if it's loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded yet');
    return;
  }
  
  try {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    });
    
    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.4,
      ease: "power3.out"
    });
    
    gsap.from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.6,
      ease: "power3.out"
    });
    
    gsap.from('.hero-buttons', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8,
      ease: "power3.out"
    });
    
    gsap.from('.image-wrapper', {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out"
    });
    
    gsap.from('.accent-shape', {
      opacity: 0,
      scale: 0,
      rotation: -45,
      duration: 1.5,
      delay: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
    
    gsap.from('.experience-badge', {
      opacity: 0,
      x: -30,
      duration: 1,
      delay: 1,
      ease: "back.out(1.7)"
    });
    
    // Section animations using ScrollTrigger
    gsap.utils.toArray('.section').forEach(section => {
      const sectionTitle = section.querySelector('.section-title');
      if (sectionTitle) {
        gsap.from(sectionTitle, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        });
      }
      
      gsap.from(section.querySelectorAll('.animate-item:not(.visible)'), {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    });
  } catch (error) {
    console.error('Error initializing GSAP animations:', error);
  }
}, 'nonessential');

// Non-essential: Service card hover effects (purely decorative)
queueHydration(() => {
  const serviceCards = document.querySelectorAll('.service-card-inner');
  
  if (typeof gsap !== 'undefined' && serviceCards.length > 0) {
    serviceCards.forEach(card => {
      const icon = card.querySelector('.service-icon');
      if (!icon) return;
      
      card.addEventListener('mouseenter', () => {
        gsap.to(icon, { 
          rotate: 10,
          scale: 1.1,
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-dark)',
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(icon, { 
          rotate: 0,
          scale: 1,
          backgroundColor: 'rgba(253, 216, 53, 0.1)',
          color: 'var(--color-primary)',
          duration: 0.3,
          ease: "power3.out"
        });
      });
    });
  }
}, 'nonessential');

// Important: GRADIENT HOVER EFFECT with performance optimizations
queueHydration(() => {
  // Get all wrapper elements that should have the gradient border effect
  const allWrapperElements = document.querySelectorAll(
    '.service-card-wrapper, .testimonial-card-wrapper, .timeline-content-wrapper, .video-testimonial-wrapper'
  );
  
  if (allWrapperElements.length === 0) return;
  
  // Only proceed if we found elements and are not on mobile
  const isMobile = window.innerWidth <= 768;
  
  // Desktop effect: Use passive event listeners and throttle for performance
  if (!isMobile) {
    // Throttle function to limit how often the mousemove handler runs
    const throttle = (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };
    
    // Use requestAnimationFrame for smoother animations
    let ticking = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    const handleMouseMove = (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateGradients(lastMouseX, lastMouseY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const updateGradients = throttle((mouseX, mouseY) => {
      allWrapperElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        
        if (rect.bottom < 0 || 
            rect.top > window.innerHeight ||
            rect.right < 0 || 
            rect.left > window.innerWidth) {
          // Skip offscreen elements
          return;
        }
        
        // Calculate the center of the element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Define a threshold distance - how far the mouse can be to affect the element
        const threshold = 300;
        
        if (distance < threshold) {
          // Calculate position for the gradient based on mouse position relative to element
          const x = mouseX - rect.left;
          const y = mouseY - rect.top;
          
          // Calculate opacity based on distance (closer = more opaque)
          const opacity = 1 - (distance / threshold);
          
          // Update CSS variables directly on the element
          element.style.setProperty('--x', `${x}px`);
          element.style.setProperty('--y', `${y}px`);
          element.style.setProperty('--opacity', opacity.toString());
        } else {
          // Hide the gradient if mouse is too far
          element.style.setProperty('--opacity', '0');
        }
      });
    }, 16); // ~60fps
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  } 
  // Mobile effect: Use IntersectionObserver for better performance
  else {
    // Track which elements have already been animated
    const animatedElements = new Set();
    
    // Use IntersectionObserver instead of scroll event
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          // Add element to the set of animated elements
          animatedElements.add(entry.target);
          
          // Add delay based on the element's position in the entries array
          setTimeout(() => {
            entry.target.classList.add('mobile-glow-active');
            
            // Remove the class after animation completes
            setTimeout(() => {
              entry.target.classList.remove('mobile-glow-active');
              
              // Allow re-animation after some time if element comes back into view
              setTimeout(() => {
                animatedElements.delete(entry.target);
              }, 5000);
            }, 4000);
          }, index * 200);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px'
    });
    
    // Observe all wrapper elements
    allWrapperElements.forEach(element => {
      observer.observe(element);
    });
  }
}, 'important');

// Critical: Mobile menu toggle
queueHydration(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Make mobile menu close when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      });
    });
  }
}, 'critical');

// Important: Smooth scroll for anchor links
queueHydration(() => {
  document.querySelectorAll('a[href^="#"]:not([data-calendly])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}, 'important');

// Non-essential: Parallax effect for hero image
queueHydration(() => {
  const heroImage = document.querySelector('.hero-image-container');
  
  if (heroImage) {
    let isThrottled = false;
    
    window.addEventListener('mousemove', (e) => {
      if (isThrottled) return;
      isThrottled = true;
      
      // Use requestAnimationFrame for smoother animation
      window.requestAnimationFrame(() => {
        const xValue = (e.clientX - window.innerWidth / 2) / 30;
        const yValue = (e.clientY - window.innerHeight / 2) / 30;
        
        // Use simpler transform instead of GSAP for better performance
        heroImage.style.transform = `translate(${xValue}px, ${yValue}px)`;
        
        // Allow next execution
        setTimeout(() => {
          isThrottled = false;
        }, 16); // ~60fps
      });
    });
  }
}, 'nonessential');

// Non-essential: GSAP animation for the CTA section
queueHydration(() => {
  const animationContainer = document.getElementById('gsap-animation');
  if (animationContainer && typeof gsap !== 'undefined') {
    const circle = animationContainer.querySelector('.anim-circle');
    const square = animationContainer.querySelector('.anim-square');
    const triangle = animationContainer.querySelector('.anim-triangle');
    
    if (circle && square && triangle) {
      // Animate circle
      gsap.to(circle, {
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      
      // Animate square
      gsap.to(square, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none"
      });
      
      // Animate triangle
      gsap.to(triangle, {
        y: -20,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }
}, 'nonessential');

// Important: Scroll to top functionality
queueHydration(() => {
  const scrollToTop = document.querySelector('.scroll-to-top');
  if (scrollToTop) {
    scrollToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide scroll to top button based on scroll position
    const toggleScrollButton = () => {
      if (window.scrollY > 500) {
        scrollToTop.classList.add('visible');
      } else {
        scrollToTop.classList.remove('visible');
      }
    };
    
    // Initial check
    toggleScrollButton();
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', toggleScrollButton, { passive: true });
  }
}, 'important');

// Important: History management for modals
queueHydration(() => {
  // Create a state management system for modals
  const modalManager = {
    // Stack of open modals (can have multiple)
    activeModals: [],
    
    // Flag to track if we're handling a history event
    isHandlingHistory: false,
    
    // Open a modal and add it to history
    openModal: function(modalId, modalElement, closeCallback) {
      // First, save the current scroll position to restore later
      const scrollPosition = window.scrollY;
      
      // Add a new history entry
      if (!this.isHandlingHistory) {
        window.history.pushState(
          { action: 'openModal', modalId, scrollPosition }, 
          '',
          window.location.pathname + window.location.search + '#' + modalId
        );
      }
      
      // Register the modal info
      this.activeModals.push({
        id: modalId,
        element: modalElement,
        closeCallback: closeCallback,
        scrollPosition: scrollPosition
      });
      
      // For debugging
      console.log('Modal opened:', modalId, 'Current stack:', this.activeModals.map(m => m.id));
    },
    
    // Close a modal and handle history
    closeModal: function(modalId, skipHistory = false) {
      const modalIndex = this.activeModals.findIndex(m => m.id === modalId);
      
      if (modalIndex !== -1) {
        const modal = this.activeModals[modalIndex];
        
        // Execute the registered close function
        if (typeof modal.closeCallback === 'function') {
          modal.closeCallback();
        }
        
        // Remove from stack
        this.activeModals.splice(modalIndex, 1);
        
        // Go back in history if we aren't already handling a history event
        if (!this.isHandlingHistory && !skipHistory) {
          window.history.back();
        }
        
        // If we closed the last modal, restore scroll position
        if (this.activeModals.length === 0 && modal.scrollPosition !== undefined) {
          setTimeout(() => {
            window.scrollTo(0, modal.scrollPosition);
          }, 0);
        }
        
        // For debugging
        console.log('Modal closed:', modalId, 'Remaining stack:', this.activeModals.map(m => m.id));
      }
    },
    
    // Handle back/forward browser navigation
    handleHistoryChange: function(event) {
      this.isHandlingHistory = true;
      
      try {
        // If going back to a page without modals
        if (!event.state || !event.state.action) {
          // Close all modals
          [...this.activeModals].forEach(modal => {
            this.closeModal(modal.id, true); // Skip history operations
          });
        }
        // If moving between states with specific modal info
        else if (event.state.action === 'openModal') {
          const { modalId } = event.state;
          
          // Close any modals that should no longer be open
          while (this.activeModals.length > 0 && 
                 this.activeModals[this.activeModals.length - 1].id !== modalId) {
            this.closeModal(this.activeModals[this.activeModals.length - 1].id, true);
          }
          
          // Restore scroll position if provided
          if (event.state.scrollPosition !== undefined) {
            setTimeout(() => {
              window.scrollTo(0, event.state.scrollPosition);
            }, 0);
          }
        }
      } finally {
        this.isHandlingHistory = false;
      }
    },
    
    // Setup the history event listener
    initialize: function() {
      window.addEventListener('popstate', this.handleHistoryChange.bind(this));
      
      // Handle existing hash on load
      if (window.location.hash) {
        const modalId = window.location.hash.substring(1);
        // This needs to be handled by the specific modal code
      }
    }
  };
  
  // Initialize modal history management
  modalManager.initialize();
  
  // Expose to window for other components to use
  window.modalManager = modalManager;
}, 'critical');

// Important: Calendly integration with enhanced modal closing via back button/swipe
queueHydration(() => {
  // Find all Calendly buttons
  const calendlyButtons = document.querySelectorAll('[data-calendly]');
  
  if (!calendlyButtons.length) return;
  
  // Function to generate random ID for Calendly instances
  const generateCalendlyId = () => `calendly-modal-${Math.floor(Math.random() * 1000000)}`;
  
  // Lazy load Calendly resources when user interacts
  function loadCalendly() {
    // Only load if not already loaded
    if (!window.calendlyLoaded) {
      const calendlyCSS = document.createElement('link');
      calendlyCSS.rel = 'stylesheet';
      calendlyCSS.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(calendlyCSS);
      
      const calendlyScript = document.createElement('script');
      calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
      calendlyScript.async = true;
      document.body.appendChild(calendlyScript);
      
      window.calendlyLoaded = true;
    }
  }
  
  // Add event listener to Calendly buttons
  calendlyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const calendlyURL = btn.getAttribute('data-calendly');
      if (!calendlyURL) return;
      
      // Start loading Calendly assets
      loadCalendly();
      
      // Generate unique ID for this Calendly instance
      const calendlyModalId = generateCalendlyId();
      
      // Wait for Calendly to load
      const checkCalendly = setInterval(function() {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          
          // Open the Calendly popup
          Calendly.initPopupWidget({url: calendlyURL});
          
          // Observe when Calendly popup appears in DOM to add it to history
          const calendlyPopupObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              if (mutation.addedNodes.length) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                  const node = mutation.addedNodes[i];
                  
                  if (node.classList && node.classList.contains('calendly-overlay')) {
                    // Found the Calendly modal - register it with modal manager
                    window.modalManager.openModal(
                      calendlyModalId, 
                      node,
                      // Close function
                      function() {
                        // Use Calendly's API to close if available
                        if (window.Calendly && typeof window.Calendly.closePopupWidget === 'function') {
                          window.Calendly.closePopupWidget();
                        } else {
                          // Fallback: remove modal directly
                          const overlay = document.querySelector('.calendly-overlay');
                          if (overlay) overlay.remove();
                          
                          const popup = document.querySelector('.calendly-popup');
                          if (popup) popup.remove();
                        }
                      }
                    );
                    
                    // We found what we're looking for, disconnect observer
                    calendlyPopupObserver.disconnect();
                    
                    // Add swipe gesture to close on mobile
                    attachSwipeToClose(node, function() {
                      window.modalManager.closeModal(calendlyModalId);
                    });
                  }
                }
              }
            });
          });
          
          // Start observing for Calendly modal insertion
          calendlyPopupObserver.observe(document.body, { childList: true });
          
          // If the modal is closed natively by Calendly, update our history
          document.addEventListener('calendly:popup:closed', function() {
            if (window.modalManager.activeModals.some(m => m.id === calendlyModalId)) {
              window.modalManager.closeModal(calendlyModalId);
            }
          });
        }
      }, 100);
    });
  });
  
  // Register listener for Calendly events
  window.addEventListener('message', function(e) {
    if (e.data.event && e.data.event.indexOf('calendly') === 0) {
      console.log('Calendly event:', e.data.event);
      // Could handle specific Calendly events here if needed
    }
  });
}, 'important');

// Important: Handle video testimonials with modal - optimized loading with back button support
queueHydration(() => {
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalVideoContainer = document.getElementById('modalVideoContainer');
  let activeVideo = null;
  let currentVideoId = null;

  // Don't do anything if elements aren't found
  if (!videoWrappers.length || !videoModal || !modalClose || !modalVideoContainer) return;

  // Set thumbnails as background images - load lazily
  const lazyLoadThumbnails = () => {
    videoWrappers.forEach(wrapper => {
      const videoId = wrapper.dataset.videoId;
      if (!videoId) return;
      
      // Create an image object to preload
      const img = new Image();
      img.onload = () => {
        // Set thumbnail as background only after loading
        wrapper.style.backgroundImage = `url('https://fast.wistia.com/embed/medias/${videoId}/swatch')`;
      };
      img.src = `https://fast.wistia.com/embed/medias/${videoId}/swatch`;
      
      wrapper.addEventListener('click', () => {
        openVideoModal(videoId);
      });
    });
  };
  
  // Delay thumbnail loading slightly
  setTimeout(lazyLoadThumbnails, 1000);

  // Open modal and play video with history management
  function openVideoModal(videoId) {
    // Create the Wistia embed
    modalVideoContainer.innerHTML = `<div class="wistia_embed wistia_async_${videoId}" style="height:100%;width:100%"></div>`;
    
    // Show modal
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Save current video ID
    currentVideoId = videoId;
    
    // Register with modal manager
    window.modalManager.openModal(
      `video-${videoId}`,
      videoModal,
      closeVideoModal
    );
    
    // Check if Wistia is loaded, otherwise load it
    if (typeof window._wq === 'undefined') {
      loadWistia(); // This function is defined in the HTML
    }
    
    // Initialize video
    window._wq = window._wq || [];
    _wq.push({
      id: videoId,
      onReady: function(video) {
        activeVideo = video;
        video.play();
      }
    });
    
    // Add swipe gesture to close on mobile
    attachSwipeToClose(videoModal, function() {
      window.modalManager.closeModal(`video-${videoId}`);
    });
  }

  // Close modal and stop video
  function closeVideoModal() {
    if (activeVideo) {
      activeVideo.pause();
    }
    
    videoModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear the video container after animation completes
    setTimeout(() => {
      modalVideoContainer.innerHTML = '';
      activeVideo = null;
    }, 300);
  }

  // Event listeners for closing modal
  modalClose.addEventListener('click', () => {
    if (currentVideoId) {
      window.modalManager.closeModal(`video-${currentVideoId}`);
    }
  });
  
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal && currentVideoId) {
      window.modalManager.closeModal(`video-${currentVideoId}`);
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active') && currentVideoId) {
      window.modalManager.closeModal(`video-${currentVideoId}`);
    }
  });
}, 'important');

// Helper function to add swipe gestures to any element
function attachSwipeToClose(element, closeCallback) {
  // Only for touch devices
  if (!('ontouchstart' in window)) return;
  
  // Variables for tracking swipe
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Threshold for swipe distance (in pixels)
  const swipeThreshold = 100;
  
  // Set up event listeners
  element.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  element.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  // Handle swipe logic
  function handleSwipe() {
    // Calculate swipe distance
    const swipeDistance = touchEndX - touchStartX;
    
    // If swipe left with enough distance, close the modal
    if (swipeDistance < -swipeThreshold) {
      closeCallback();
    }
  }
}