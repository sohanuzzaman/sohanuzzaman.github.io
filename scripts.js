document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded and scripts running');
  
  // Debug the animation system
  console.log('Found ' + document.querySelectorAll('.animate-item').length + ' animatable elements');
  
  // Header scroll effect
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Scroll animation
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
  
  // Initialize GSAP animations
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
    if (sectionTitle) {  // Add this check
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
    
    gsap.from(section.querySelectorAll('.animate-item'), {
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
  
  // Service card hover effects - original icon animation
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.service-icon');
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
      const icon = card.querySelector('.service-icon');
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
  
  // GRADIENT HOVER EFFECT - Fixed implementation
  // Get all wrapper elements that should have the gradient border effect
  const allWrapperElements = document.querySelectorAll(
    '.service-card-wrapper, .testimonial-card-wrapper, .timeline-content-wrapper, .video-testimonial-wrapper'
  );
  
  // Only proceed if we found elements and are not on mobile
  const isMobile = window.innerWidth <= 768;
  
  if (allWrapperElements.length > 0) {
    // Desktop effect: Mouse-following gradient
    if (!isMobile) {
      document.addEventListener('mousemove', (e) => {
        // Get mouse coordinates
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Process each wrapper element
        allWrapperElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          
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
      });
    } 
    // Mobile effect: Reliable animation using best practices
    else {
      // Track which elements have already been animated
      const animatedElements = new Set();
      
      // Use scroll event instead of IntersectionObserver for more reliable detection
      window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const triggerPosition = windowHeight * 0.6; // 60% from top (40% from bottom)
        
        allWrapperElements.forEach((element, index) => {
          // Skip elements that were already animated
          if (animatedElements.has(element)) return;
          
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          
          // Trigger when element top reaches the trigger position
          if (elementTop <= triggerPosition && elementTop >= 0) {
            // Add element to the set of animated elements
            animatedElements.add(element);
            
            // Add delay based on the element's position in the DOM
            setTimeout(() => {
              element.classList.add('mobile-glow-active');
              
              // Remove the class after animation completes
              setTimeout(() => {
                element.classList.remove('mobile-glow-active');
                
                // Allow re-animation after some time if element comes back into view
                setTimeout(() => {
                  animatedElements.delete(element);
                }, 5000);
              }, 4000);
            }, index * 200);
          }
        });
      }, { passive: true }); // Performance optimization
    }
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }
    });
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
  
  // Parallax effect for hero image
  const heroImage = document.querySelector('.hero-image-container');
  
  if (heroImage) {
    window.addEventListener('mousemove', (e) => {
      const xValue = (e.clientX - window.innerWidth / 2) / 30;
      const yValue = (e.clientY - window.innerHeight / 2) / 30;
      
      gsap.to(heroImage, {
        x: xValue,
        y: yValue,
        duration: 0.8,
        ease: "power1.out"
      });
    });
  }

  // GSAP animation for the CTA section
  const animationContainer = document.getElementById('gsap-animation');
  if (animationContainer) {
    const circle = animationContainer.querySelector('.anim-circle');
    const square = animationContainer.querySelector('.anim-square');
    const triangle = animationContainer.querySelector('.anim-triangle');
    
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

  // Update menu toggle functionality for one-pager
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Make sure all links scroll smoothly
  document.querySelectorAll('a[href^="#"]:not([onclick])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
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
      }
    });
  });

  // Scroll to top functionality
  const scrollToTop = document.querySelector('.scroll-to-top');
  if (scrollToTop) {
    scrollToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (scrollToTop) {
      if (window.scrollY > 500) {
        scrollToTop.classList.add('visible');
      } else {
        scrollToTop.classList.remove('visible');
      }
    }
  });

  // Handle video testimonials with modal
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalVideoContainer = document.getElementById('modalVideoContainer');
  let activeVideo = null;

  // Set thumbnails as background images
  videoWrappers.forEach(wrapper => {
    const videoId = wrapper.dataset.videoId;
    
    // Set thumbnail as background
    wrapper.style.backgroundImage = `url('https://fast.wistia.com/embed/medias/${videoId}/swatch')`;
    
    wrapper.addEventListener('click', () => {
      openVideoModal(videoId);
    });
  });

  // Open modal and play video
  function openVideoModal(videoId) {
    // Create the Wistia embed
    modalVideoContainer.innerHTML = `<div class="wistia_embed wistia_async_${videoId}" style="height:100%;width:100%"></div>`;
    
    // Show modal
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
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
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      closeVideoModal();
    });
  }

  // Also close when clicking outside the video
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

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

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });
});