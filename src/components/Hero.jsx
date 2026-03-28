import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './Hero.css';

const SLIDES = [
  '/hero-slides/slide-1.jpg',
  '/hero-slides/slide-2.jpg',
  '/hero-slides/slide-3.jpg',
  '/hero-slides/slide-4.jpg',
  '/hero-slides/slide-5.jpg',
  '/hero-slides/slide-6.JPG',
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

      {/* HERO */}
      <div className="hero-banner">
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
          <div className="hero-text-area">

            

            {/* Main Title */}
            <h1 className="hero-title fade-up delay-2">
              Dental Implants
            </h1>

            {/* Subtext */}
            <p className="hero-subtext fade-up delay-3">
              Permanent & Natural-Looking
            </p>

            {/* Secondary */}
            <h2 className="hero-secondary fade-up delay-4">
              Restore Your Smile <br/> With Confidence
            </h2>

            {/* CTA */}
            <button 
              className="btn-primary fade-up delay-5"
              onClick={() => {
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Free Consultation
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;