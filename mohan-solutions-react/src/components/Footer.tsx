import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      href: "https://twitter.com/mohan_s94",
      icon: "ri-twitter-x-fill",
      label: "Twitter"
    },
    {
      href: "https://github.com/sohanuzzaman",
      icon: "ri-github-fill",
      label: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/mohan-sohanuzzaman/",
      icon: "ri-linkedin-fill",
      label: "LinkedIn"
    },
    {
      href: "https://www.upwork.com/freelancers/~01c2b05974c0cfec0a",
      icon: "ri-briefcase-4-line",
      label: "Upwork"
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <picture>
              <source srcSet="/images/mohan_logo.webp" type="image/webp" />
              <img 
                src="/images/mohan_logo.webp" 
                alt="Mohan Logo" 
                width="120" 
                height="32" 
                loading="lazy"
              />
            </picture>
            <p>Digital Strategy & Automation</p>
          </div>
          
          {/* Social Icons */}
          <div className="social-icons">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="social-icon" 
                aria-label={link.label} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Mohan Solutions. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
          <button 
            className={`scroll-to-top ${showScrollToTop ? 'visible' : ''}`} 
            aria-label="Scroll to top"
            onClick={handleScrollToTop}
          >
            <i className="ri-arrow-up-line"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
