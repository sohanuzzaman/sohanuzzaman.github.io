import React from 'react';

const BackgroundElements: React.FC = () => {
  return (
    <>
      {/* Noise overlay for texture */}
      <div className="noise-overlay"></div>

      {/* Gradient background */}
      <div className="gradient-bg">
        <div className="gradient-shape shape1"></div>
        <div className="gradient-shape shape2"></div>
      </div>
    </>
  );
};

export default BackgroundElements;
