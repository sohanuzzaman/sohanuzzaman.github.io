import React from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const Process: React.FC = () => {
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery & Strategy Call",
      description: "Understand your vision, challenges, and goals. Identify opportunities to streamline and automate. Develop a tailored game plan that suits your needs."
    },
    {
      number: "02",
      title: "Strategic Implementation",
      description: "Design intuitive systems with a focus on user experience. Integrate automation that saves time and reduces error. Test rigorously to ensure flawless performance."
    },
    {
      number: "03",
      title: "Launch & Optimize",
      description: "Deploy with confidence and track the results. Continuously fine-tune for maximum impact. Provide ongoing support to ensure sustained success."
    }
  ];

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-header">
          <span className="section-tag animate-item">Working Process</span>
          <h2 className="section-title animate-item">The Mohan Process</h2>
          <p className="section-description animate-item">Your Path to Success</p>
        </div>
        
        <div className="timeline">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="timeline-item-wrapper animate-item" 
              style={{
                '--x': '150px',
                '--y': '100px',
                '--opacity': 0
              } as React.CSSProperties}
            >
              <div className="timeline-item">
                <div className="timeline-number">{step.number}</div>
                <div 
                  className="timeline-content-wrapper" 
                  style={{
                    '--x': '150px',
                    '--y': '100px',
                    '--opacity': 0
                  } as React.CSSProperties}
                >
                  <div className="timeline-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
