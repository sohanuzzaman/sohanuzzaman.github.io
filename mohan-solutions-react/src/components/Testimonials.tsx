import React from 'react';
import VideoThumbnail from './VideoThumbnail';

const Testimonials: React.FC = () => {
  const videoTestimonials = [
    { id: "gnhiqjwj3a" },
    { id: "uzotbt6u9q" },
    { id: "q4y65yhq5x" }
  ];

  const textTestimonials = [
    {
      quote: "A million stars. Mohan didn't just fix my systems—he made them thrive. After hiring two other experts who couldn't deliver, Mohan transformed my ConvertKit setup.",
      author: "Upwork Client",
      date: "September 2023",
      image: "/images/client1-small.webp"
    },
    {
      quote: "Mohan is highly organized and proactive. His attention to detail and ability to solve complex problems made our project a success. A true professional who always delivers!",
      author: "Upwork Client", 
      date: "July 2023",
      image: "/images/client2-small.webp"
    }
  ];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag animate-item">Testimonials</span>
          <h2 className="section-title animate-item">Video Success Stories</h2>
          <p className="section-description animate-item">Hear directly from clients about their experience</p>
          <div className="video-counter animate-item">
            <span className="counter-number">3</span>
            <span className="counter-text">Video Testimonials</span>
          </div>
        </div>
        
        {/* Video Testimonial Grid */}
        <div className="video-testimonial-grid">
          {videoTestimonials.map((video, index) => (
            <div 
              key={index}
              className="video-testimonial-wrapper animate-item" 
              style={{"--x": "150px", "--y": "100px", "--opacity": 0} as React.CSSProperties}
            >
              <div className="video-testimonial animate-item">
                <VideoThumbnail
                  videoId={video.id}
                  aspectRatio={16 / 9}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Text Testimonials */}
        <div className="section-subheader animate-item">
          <h3>What Clients Say</h3>
        </div>
        
        <div className="testimonial-slider">
          {textTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card-wrapper animate-item" 
              style={{"--x": "150px", "--y": "100px", "--opacity": 0} as React.CSSProperties}
            >
              <div className="testimonial-item">
                <div className="testimonial-content">
                  <i className="ri-double-quotes-l quote-icon"></i>
                  <p>{testimonial.quote}</p>
                </div>
                <div className="testimonial-author">
                  <picture>
                    <source srcSet={testimonial.image} type="image/webp" />
                    <img 
                      src={testimonial.image} 
                      alt="Client" 
                      className="author-image" 
                      width="50" 
                      height="50" 
                      loading="lazy"
                    />
                  </picture>
                  <div className="author-details">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.date}</p>
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

export default Testimonials;
