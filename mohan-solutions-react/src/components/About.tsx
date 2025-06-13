import React from 'react';

const About: React.FC = () => {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag animate-item">About Me</span>
          <h2 className="section-title animate-item">Who Am I?</h2>
        </div>
        <div className="about-content">
          <div className="about-image-container">
            <div className="about-image animate-item">
              <picture>
                <source 
                  srcSet="/images/mohan2-300w.webp 300w, /images/mohan2.webp 500w" 
                  type="image/webp" 
                  sizes="(max-width: 768px) 300px, 500px"
                />
                <img 
                  src="/images/mohan2.webp" 
                  alt="About Mohan" 
                  loading="lazy" 
                  width="500" 
                  height="500"
                />
              </picture>
            </div>
          </div>
          <div className="about-text">
            <p className="paragraph animate-item">
              I'm not just a developer or a strategist. I'm your partner in building digital systems that empower your business to thrive. I take your vision and craft it into a streamlined, automated, and profitable reality.
            </p>
            <p className="paragraph animate-item">
              My approach blends cutting-edge technology with a human-centric mindset, ensuring that your business isn't just efficient—it's impactful.
            </p>
            <p className="paragraph animate-item">
              Coming from humble beginnings, I've forged a path of resilience, innovation, and strategic thinking. This mindset defines how I work and why my clients trust me to transform their businesses.
            </p>
            <div className="stats-container animate-item">
              <div className="stat-item">
                <span className="stat-value">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">90+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Results Oriented</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
