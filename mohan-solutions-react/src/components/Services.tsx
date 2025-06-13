import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      icon: "ri-focus-3-line",
      title: "Precision and Clarity",
      description: "No vague concepts—just clear, actionable strategies designed to make an impact."
    },
    {
      icon: "ri-flashlight-line",
      title: "High-Impact Automation",
      description: "Say goodbye to manual work. I build systems that drive growth while you focus on what truly matters."
    },
    {
      icon: "ri-shield-star-line",
      title: "Battle-Tested Resilience",
      description: "From humble beginnings to global success, I know what it takes to overcome challenges and build from the ground up."
    },
    {
      icon: "ri-team-line",
      title: "Strategic Partnership",
      description: "I don't just execute tasks—I provide strategic guidance that aligns with your long-term vision."
    },
    {
      icon: "ri-line-chart-line",
      title: "Proven Success",
      description: "Clients see tangible results—more time, more revenue, more freedom."
    },
    {
      icon: "ri-customer-service-2-line",
      title: "Ongoing Support",
      description: "Your success is my priority long after project completion with continued guidance and optimization."
    }
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag animate-item">Services</span>
          <h2 className="section-title animate-item">Why Work With Me?</h2>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card-wrapper animate-item" 
              style={{"--x": "150px", "--y": "100px", "--opacity": 0} as React.CSSProperties}
            >
              <div className="service-card-inner">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
