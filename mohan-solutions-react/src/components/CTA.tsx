import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CTA: React.FC = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for the CTA section
    if (typeof gsap !== 'undefined' && animationRef.current) {
      const circle = animationRef.current.querySelector('.anim-circle');
      const square = animationRef.current.querySelector('.anim-square');
      const triangle = animationRef.current.querySelector('.anim-triangle');
      
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
  }, []);

  const handleCalendlyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const event = new CustomEvent('openCalendly');
    window.dispatchEvent(event);
  };

  return (
    <section className="section cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title animate-item">Ready to Transform Your Business?</h2>
          <p className="cta-description animate-item">Your breakthrough moment is now. Let's make your vision a reality.</p>
          <button 
            className="button button-primary animate-item" 
            data-calendly="https://calendly.com/mohan94/15min"
            onClick={handleCalendlyClick}
          >
            Book a Free Strategy Call
            <i className="ri-calendar-line"></i>
          </button>
        </div>
        <div className="cta-graphic animate-item">
          <div id="gsap-animation" className="gsap-animation-container" ref={animationRef}>
            <div className="anim-circle"></div>
            <div className="anim-square"></div>
            <div className="anim-triangle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
