import React from 'react';
import { Play } from 'lucide-react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    quote: '"I Got Instant Relief. With 32 Signature\'s Painless Root Canal Treatment."',
    name: 'Ajay Ratnam',
    treatment: 'Root Canal Treatment'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&q=80&w=400',
    quote: '"Now I Smile, Speak & Perform with Confidence."',
    name: 'Bhavana',
    treatment: 'Customised Smile Design'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    quote: '"I Look 20 Years Younger! I Can Eat Everything Again!"',
    name: 'BSN Dutt',
    treatment: 'Full Mouth Implants'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    quote: '"The Most Priceless Ornament Is YOUR SMILE."',
    name: 'Meena Vasu',
    treatment: 'Invisalign Aligners'
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Smiles Across Tripura - Stories of Happy Patients</h2>
        <p className="section-subtitle">Each smile tells a story. Watch how 32 Signature Smilez became part of so many incredible journeys.</p>

        <div className="testimonials-grid">
          {testimonialsData.map((item, index) => (
            <div className="testimonial-card fade-in" style={{animationDelay: `${index * 0.15}s`}} key={item.id}>
              <div className="testimonial-image-wrapper">
                {/* Use high-quality splash images directly */}
                <img src={item.image} alt={item.name} className="testimonial-bg" />
                <div className="testimonial-overlay"></div>
                
                {/* Play Button */}
                <button className="play-button">
                  <Play fill="white" size={24} />
                </button>

                {/* Card Branding (32 Signature Smilez) */}
                <div className="card-brand">
                  <span className="cb-name">32 Signature</span>
                  <span className="cb-tag">Dental • Skin • Hair</span>
                </div>

                <div className="testimonial-content">
                  <div className="quote-box">
                    <p>{item.quote}</p>
                    <div className="stars small">★★★★★</div>
                  </div>
                </div>
              </div>
              <div className="treatment-banner">
                {item.treatment}
              </div>
              <div className="testimonial-footer">
                <p>"{item.name}, {item.treatment}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
