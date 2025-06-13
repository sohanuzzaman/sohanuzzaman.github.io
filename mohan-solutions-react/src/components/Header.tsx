import React, { useEffect, useState } from 'react';
import { scrollToTop } from '../utils/smoothScroll';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCalendlyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Dispatch custom event that CalendlyModal is listening for
    const event = new CustomEvent('openCalendly');
    window.dispatchEvent(event);
  };

  const handleLogoClick = () => {
    scrollToTop();
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <button className="logo" onClick={handleLogoClick}>
          <img src="/images/mohan_logo.webp" alt="Mohan Logo" width="120" height="32" />
        </button>
        <button 
          className="button button-primary book-call-button" 
          data-calendly="https://calendly.com/mohan94/15min"
          onClick={handleCalendlyClick}
        >
          Book a Call
          <i className="ri-calendar-line"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
