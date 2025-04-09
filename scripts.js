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
  
  // Service card hover effects
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

  // Handle video testimonials
  const playButtons = document.querySelectorAll('.play-button');

  playButtons.forEach(button => {
    const videoId = button.dataset.videoId;
    const overlay = button.closest('.video-overlay');
    const container = document.getElementById(`wistia-${videoId}`);
    
    // Set thumbnail as background
    if (videoId === 'gnhiqjwj3a') {
      button.closest('.video-wrapper').style.backgroundImage = "url('https://fast.wistia.com/embed/medias/gnhiqjwj3a/swatch')";
    } else if (videoId === 'uzotbt6u9q') {
      button.closest('.video-wrapper').style.backgroundImage = "url('https://fast.wistia.com/embed/medias/uzotbt6u9q/swatch')";
    } else if (videoId === 'q4y65yhq5x') {
      button.closest('.video-wrapper').style.backgroundImage = "url('https://fast.wistia.com/embed/medias/q4y65yhq5x/swatch')";
    }
    
    button.addEventListener('click', () => {
      // Create the Wistia embed
      window._wq = window._wq || [];
      _wq.push({
        id: videoId,
        onReady: function(video) {
          // Hide overlay when video is ready
          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.style.display = 'none';
          }, 300);
          
          // Play video
          video.play();
          
          // When video ends, show overlay again
          video.bind('end', function() {
            overlay.style.display = 'flex';
            setTimeout(() => {
              overlay.style.opacity = '1';
            }, 10);
          });
        }
      });
      
      // Create the embed in the container
      container.innerHTML = `<div class="wistia_embed wistia_async_${videoId}" style="height:100%;width:100%"></div>`;
    });
  });
});