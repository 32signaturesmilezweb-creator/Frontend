import React from 'react';
import './AboutClinic.css';

const AboutClinic = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        
        {/* Image Section */}
        <div className="about-image-wrapper fade-in">
          <div className="doctor-image-container">
            <img 
              src="/Placeholder.png" 
              alt="Dr. Deep Dutta" 
              className="doctor-image"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="about-content fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="about-badge">
            <span className="badge-icon">👨‍⚕️</span> Meet Our Founder
          </div>
          
          <h2 className="about-title gradient-text-animated">
            Dr. Deep Dutta
          </h2>
          
          <p className="about-description">
            At the heart of 32 Signature Smilez is Dr. Deep Dutta, an esteemed Maxillofacial Specialist dedicated to delivering world-class, painless dental care. With extensive surgical expertise, Dr. Dutta specializes in complex facial, jaw, and dental implant surgeries that seamlessly restore both function and facial aesthetics.
          </p>

          <p className="about-description">
            Under his leadership, 32 Signature Smilez has grown into Tripura's most trusted premium dental destination, combining state-of-the-art surgical technology with warm, patient-centric care. Whether you need an advanced maxillofacial procedure, full-mouth implants, or a radiant smile makeover, Dr. Dutta ensures every treatment is precision-driven and deeply comfortable.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutClinic;