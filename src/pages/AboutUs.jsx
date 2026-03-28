import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import './AboutUs.css';

const AboutUs = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | 32 Signature Smilez";
  }, []);

  return (
    <>
      <Header />

      <div className="about-page">

        {/* HERO */}
        <div className="about-hero">
          <div className="container">
            <h1>About Us</h1>
            <p>Transforming smiles with advanced dental care & compassion</p>
          </div>
        </div>

        <div className="container about-body">

          {/* WHO WE ARE */}
          <section className="about-section">
            <h2>Who We Are</h2>
            <p>
              At <strong>32 Signature Smilez</strong>, we are dedicated to providing
              high-quality dental care using modern technology and personalized treatment plans.
              Our goal is to ensure every patient experiences comfort, safety, and confidence in their smile.
            </p>
          </section>

          {/* MISSION + VISION */}
          <section className="about-grid">

            <div className="about-card">
              <h3>🎯 Our Mission</h3>
              <ul>
                <li>Provide pain-free dental treatments</li>
                <li>Ensure patient comfort & safety</li>
                <li>Use advanced dental technology</li>
                <li>Promote oral health awareness</li>
              </ul>
            </div>

            <div className="about-card">
              <h3>🌟 Our Vision</h3>
              <ul>
                <li>Become a leading dental clinic in the region</li>
                <li>Deliver world-class dental care</li>
                <li>Build long-term patient trust</li>
                <li>Create confident & healthy smiles</li>
              </ul>
            </div>

          </section>

          {/* WHY CHOOSE US */}
          <section className="about-section">
            <h2>Why Choose Us</h2>

            <div className="features-grid">
              <div className="feature-card">🏆 Experienced Dental Experts</div>
              <div className="feature-card">🔬 Advanced Technology</div>
              <div className="feature-card">💚 Painless Procedures</div>
              <div className="feature-card">💰 Affordable Treatments</div>
              <div className="feature-card">🧑‍⚕️ Personalized Care</div>
              <div className="feature-card">🦷 Hygienic Environment</div>
            </div>
          </section>

          {/* STATS */}
          <section className="stats-section">

            <div className="stat-box">
              <h3>1000+</h3>
              <p>Happy Patients</p>
            </div>

            <div className="stat-box">
              <h3>500+</h3>
              <p>Treatments Completed</p>
            </div>

            <div className="stat-box">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>

            <div className="stat-box">
              <h3>98%</h3>
              <p>Patient Satisfaction</p>
            </div>

          </section>

          {/* CTA */}
          <section className="about-cta">
            <h2>Your Smile, Our Priority</h2>
            <p>Book your appointment today and experience premium dental care</p>

            <button className="btn-primary">
              BOOK APPOINTMENT 📅
            </button>
          </section>

        </div>
      </div>

      <FloatingWidgets />
      <Footer />
    </>
  );
};

export default AboutUs;