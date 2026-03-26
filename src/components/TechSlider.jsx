import React from 'react';
import './TechSlider.css';

const TechSlider = () => {
  const logos = [
    { src: '/logo-precision.png', alt: 'Precision Dental Arts' },
    { src: '/logo-ida.png', alt: 'Indian Dental Association' },
    { src: '/logo-dentcare.png', alt: 'DentCare' },
    { src: '/logo-osstem.png', alt: 'Osstem Implant' },
    { src: '/logo-straumann.png', alt: 'Straumann' },
  ];

  return (
    <section className="tech-slider-section">
      <div className="container">
        <div className="tech-slider-header fade-in">
          <p>Powered by the Latest in</p>
          <h2>Dental Technology</h2>
          <div className="divider-line"></div>
          <p className="tech-subtext">Experience precision, comfort, and faster results with cutting-edge equipment at 32 Signature Smilez.</p>
        </div>
      </div>

      <div className="slider-container fade-in" style={{animationDelay: '0.2s'}}>
        <div className="slider-track">
          {/* Double logos for seamless infinite loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div className="logo-item" key={index}>
              <div className="logo-card">
                <img src={logo.src} alt={logo.alt} className="partner-logo" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSlider;
