import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { scrollToSection } from '../utils/smoothScroll';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // GSAP animations for hero section
    if (typeof gsap !== 'undefined' && heroRef.current) {
      const timeline = gsap.timeline();
      
      timeline
        .from('.hero-title', {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.2,
          ease: "power3.out"
        })
        .from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.4,
          ease: "power3.out"
        }, "-=0.8")
        .from('.hero-description', {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.6,
          ease: "power3.out"
        }, "-=0.8")
        .from('.hero-buttons', {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.8,
          ease: "power3.out"
        }, "-=0.8")
        .from('.image-wrapper', {
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out"
        }, "-=1");
    }
  }, []);

  const handleCalendlyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const event = new CustomEvent('openCalendly');
    window.dispatchEvent(event);
  };

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('services');
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge animate-item">
            <span>Digital Strategist & Automation Expert</span>
          </div>
          <h1 className="hero-title animate-item">
            Elevate Your <span className="highlight">Digital Strategy</span> to the Next Level
          </h1>
          <p className="hero-subtitle animate-item">
            <span className="text-accent">Bold Strategies.</span> <span className="text-accent">Seamless Automation.</span> <span className="text-accent">Real Results.</span>
          </p>
          <p className="hero-description animate-item">
            Your ideas deserve more than just a plan—they deserve to become powerful, automated realities. I'm Mohan, a digital strategist who builds systems that don't just work—they dominate.
          </p>
          <div className="hero-buttons animate-item">
            <button 
              className="button button-primary" 
              data-calendly="https://calendly.com/mohan94/15min"
              onClick={handleCalendlyClick}
            >
              Book a Free Strategy Call
              <i className="ri-calendar-line"></i>
            </button>
            <a href="#services" className="button button-secondary" onClick={scrollToServices}>
              See My Services
              <i className="ri-eye-line"></i>
            </a>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="image-wrapper animate-item">
            <div className="accent-shape"></div>
            <div className="image-mask">
              <picture>
                <source 
                  srcSet="/images/Mohan1-400w.webp 400w, /images/Mohan1.webp 600w" 
                  type="image/webp" 
                  sizes="(max-width: 768px) 400px, 600px"
                />
                <img 
                  src="/images/Mohan1.webp" 
                  alt="Mohan" 
                  className="hero-image" 
                  width="600" 
                  height="550" 
                  fetchPriority="high"
                />
              </picture>
            </div>
            <div className="experience-badge">
              <span className="number">10+</span>
              <span className="text">Years Experience</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <i className="ri-arrow-down-line"></i>
      </div>
    </section>
  );
};

export default Hero;
