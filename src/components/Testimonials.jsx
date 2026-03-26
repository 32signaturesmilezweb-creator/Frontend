import React from 'react';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const reviewsData = [
  {
    id: 1,
    name: 'Ajay Ratnam',
    date: '2 months ago',
    text: "I got instant relief with 32 Signature's painless root canal treatment. The doctors are incredibly skilled and the clinic environment is top-notch. Highly recommend!",
  },
  {
    id: 2,
    name: 'Bhavana',
    date: '4 months ago',
    text: "Now I smile, speak & perform with confidence. The customised smile design transformed my entire look. Thank you to the wonderful team at 32 Signature Smilez!",
  },
  {
    id: 3,
    name: 'BSN Dutt',
    date: '6 months ago',
    text: "I look 20 years younger! I can eat everything again after getting full mouth implants. The procedure was smooth and the aftercare was phenomenal.",
  },
  {
    id: 4,
    name: 'Meena Vasu',
    date: '1 year ago',
    text: "The most priceless ornament is your smile. The Invisalign aligners worked perfectly. The staff is always friendly and professional. Best dental clinic in Tripura!",
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-subtitle">Real stories from real smiles. See why we are the top-rated dental clinic.</p>

        <div className="reviews-grid">
          {reviewsData.map((review, index) => (
            <div className="review-card fade-in" style={{animationDelay: `${index * 0.15}s`}} key={review.id}>
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="avatar">{review.name.charAt(0)}</div>
                  <div>
                    <h4 className="reviewer-name">{review.name}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="google-icon-small">
                   <span className="g-blue">G</span>
                </div>
              </div>
              
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="var(--primary-green)" color="var(--primary-green)" size={16} />
                ))}
              </div>
              
              <div className="review-body">
                <Quote className="quote-icon" size={24} color="var(--primary-green)" opacity={0.3} />
                <p>"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-cta">
          <a href="https://maps.app.goo.gl/Sw1ejpgGe2Nmy7ZT8" target="_blank" rel="noreferrer" className="btn-primary">
             Read all our 5-Star Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
