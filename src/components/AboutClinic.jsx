import React from 'react';
import './AboutClinic.css';

const AboutClinic = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">

        {/* Image Section */}
        <div className="about-image-wrapper fade-in">
          <div className="doctor-image-container animated-border">
            <img
              src="/Deep Datta.PNG"
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
            At the heart of <strong>32 Signature Smilez</strong> is <strong>Dr. Deep Dutta</strong>, a highly accomplished{' '}
            <strong>Oral &amp; Maxillofacial Surgeon and Implantologist</strong> with over{' '}
            <strong>18+ years of clinical and surgical excellence</strong>. Renowned for his precision and patient-first approach,
            he specializes in <strong>facial trauma management, dental implantology, orthognathic surgery, and cleft lip &amp; palate correction</strong>,
            delivering results that restore both <strong>function and facial aesthetics</strong>.
          </p>

          <p className="about-description">
            With an outstanding track record of <strong>500+ successful dental implant procedures</strong> and{' '}
            <strong>175+ cleft surgeries</strong>, Dr. Dutta brings unmatched expertise backed by collaborations with{' '}
            <strong>Smile Train, BSF Tripura, RBSK</strong>, and leading tertiary care institutions. His work reflects a perfect blend of{' '}
            <strong>advanced surgical technology</strong> and <strong>compassionate patient care</strong>.
          </p>

          <p className="about-description">
            Beyond clinical excellence, he is a respected <strong>Associate Professor, Clinical Director, and Academic Leader</strong>,
            actively contributing to <strong>medical education, research, and scientific innovation</strong>. As the visionary behind{' '}
            <strong>32 Signature Smilez</strong>, he has transformed it into{' '}
            <strong>Tripura's most trusted premium dental destination</strong>, where every treatment is{' '}
            <strong>precision-driven, safe, and exceptionally comfortable</strong>.
          </p>

          {/* Stats Card — below description */}
          <div className="stats-container">
            <div className="stat-box divider-right">
              <h3>18+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-box divider-right">
              <h3>500+</h3>
              <p>Implants</p>
            </div>
            <div className="stat-box">
              <h3>175+</h3>
              <p>Cleft Surgeries</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutClinic;