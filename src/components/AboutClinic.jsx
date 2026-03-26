import React from 'react';
import './AboutClinic.css';

const AboutClinic = () => {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        
        <div className="about-image-wrapper fade-in">
          <div className="doctor-image-placeholder">
            <div className="doctor-image-placeholder">
                  <img 
                    src="/Placeholder.jpg" 
                    alt="Doctor" 
                    className="doctor-image"
                  />
                </div>
          </div>
        </div>

        <div className="about-content fade-in" style={{animationDelay: '0.2s'}}>
          <div className="about-badge">
            <span className="badge-icon">🏥</span> About 32 Signature Smilez
          </div>
          
          <h2 className="about-title">Tripura's Premium<br/>Dental Chain</h2>
          
          <p className="about-description">
            32 Signature Smilez is Tripura's premier dental clinic with highly expert doctors and thousands of happy patients. 
            We have a team of highly qualified dentists with over decades of combined experience. Our highly experienced dentists focus on 
            providing high-quality care in a friendly and comfortable setting.
          </p>
          <p className="about-description">
            We offer a wide range of dental services, from general check-ups to advanced cosmetic and orthodontic treatments. 
            With state-of-the-art technology and patient-centric care, we ensure every smile is healthy and confident.
          </p>

          <div className="stats-container">
            <div className="stat-box divider-right">
              <h3>1</h3>
              <p>States</p>
            </div>
            <div className="stat-box divider-right">
              <h3>1</h3>
              <p>Clinic</p>
            </div>
            
            <div className="stat-box">
              <h3>50k+</h3>
              <p>Patients</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutClinic;
