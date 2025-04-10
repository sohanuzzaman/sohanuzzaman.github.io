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

// Important: Handle video testimonials with modal - optimized loading 
queueHydration(() => {
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalVideoContainer = document.getElementById('modalVideoContainer');
  let activeVideo = null;

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

  // Open modal and play video
  function openVideoModal(videoId) {
    // Create the Wistia embed
    modalVideoContainer.innerHTML = `<div class="wistia_embed wistia_async_${videoId}" style="height:100%;width:100%"></div>`;
    
    // Show modal
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
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
  modalClose.addEventListener('click', closeVideoModal);
  
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}, 'important');