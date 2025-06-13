import React from 'react';

const FloatingButton: React.FC = () => {
  const handleCalendlyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const event = new CustomEvent('openCalendly');
    window.dispatchEvent(event);
  };

  return (
    <div className="floating-button">
      <button 
        className="button button-action" 
        aria-label="Book a call" 
        data-calendly="https://calendly.com/mohan94/15min"
        onClick={handleCalendlyClick}
      >
        <i className="ri-calendar-line"></i>
      </button>
    </div>
  );
};

export default FloatingButton;
