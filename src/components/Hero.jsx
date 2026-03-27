import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './Hero.css';

const SLIDES = [
  '/hero-slides/slide-1.jpg',
  '/hero-slides/slide-2.jpg',
  '/hero-slides/slide-3.jpg',
  '/hero-slides/slide-4.jpg',
  '/hero-slides/slide-5.jpg',
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="hero-section">
      {/* Quick Action Ribbon (from Image 1) */}
      <div className="quick-actions-ribbon">
        <div className="container actions-grid">
          
          <div className="action-card">
            <div className="action-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--primary-gold)">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="action-content">
              <h3>32 Signature Near You</h3>
              <a href="https://maps.app.goo.gl/vYRxei6adkCdmwYH6" target="_blank" rel="noreferrer" className="btn-dark btn-small" style={{textDecoration: 'none', display: 'inline-block', textAlign: 'center'}}>Visit Now</a>
            </div>
          </div>

          <div className="action-divider"></div>

          <div className="action-card">
            <div className="action-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--primary-gold)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>
            <div className="action-content">
              <h3>Smile Transformations</h3>
              <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-dark btn-small">Book Now</button>
            </div>
          </div>

          <div className="action-divider"></div>

          <div className="action-card reviews-card">
            <div className="google-logo">
              <span className="g-blue">G</span><span className="g-red">o</span><span className="g-yellow">o</span><span className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span>
              <span className="verified">Verified</span>
            </div>
            <div className="review-stats">
              <h3>3 Lakh+ <span>Happy Reviews</span></h3>
              <div className="stars">
                <span>Rated 4.9/5</span>
                <div className="star-icons">
                  <Star fill="#fbbc05" color="#fbbc05" size={16} />
                  <Star fill="#fbbc05" color="#fbbc05" size={16} />
                  <Star fill="#fbbc05" color="#fbbc05" size={16} />
                  <Star fill="#fbbc05" color="#fbbc05" size={16} />
                  <Star fill="#fbbc05" color="#fbbc05" size={16} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Banner Area (from Image 3) */}
      <div className="hero-banner">
        {/* Background Slideshow */}
        <div className="hero-slideshow-container">
          {SLIDES.map((slide, index) => (
            <img 
              key={index} 
              src={slide} 
              alt={`Clinic Image ${index + 1}`}
              className={`sliding-hero-image ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
          <div className="hero-overlay"></div>
        </div>

        <div className="container hero-banner-content">
          <div className="hero-text-area fade-in">
            <h1><span className="highlight-text">Premium —</span><br/> Dental Implants</h1>
            <p className="hero-subtext">Permanent & Natural-Looking</p>
            <h2 className="hero-secondary">Seamlessly Restore<br/>Your Confident Smile</h2>
            <button className="btn-primary" style={{marginTop: '20px'}} onClick={() => { document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }); }}>Book Free Consultation</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
