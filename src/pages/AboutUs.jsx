import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import BookingModal from '../components/BookingModal';
import './AboutUs.css';

const stats = [
  { value: '18+', label: 'Years of Excellence' },
  { value: '5000+', label: 'Happy Patients' },
  { value: '500+', label: 'Implants Done' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const whyUs = [
  { icon: '🏆', title: 'Expert Surgeons', desc: 'Led by Dr. Deep Dutta, an acclaimed Oral & Maxillofacial Surgeon with 18+ years of surgical excellence.' },
  { icon: '🔬', title: 'Advanced Technology', desc: 'Digital X-rays, 3D scanning, laser dentistry and the latest implant systems from global partners.' },
  { icon: '🛡️', title: 'Sterilisation Standards', desc: 'International-grade infection control with autoclave sterilisation and sealed instrument packs.' },
  { icon: '💚', title: 'Painless Procedures', desc: 'Precision anaesthesia protocols ensure a comfortable, stress-free experience every visit.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden fees. Clear treatment plans with flexible EMI options for all major procedures.' },
  { icon: '🧑‍⚕️', title: 'Personalised Care', desc: 'Every patient gets a customised treatment plan designed around their unique dental needs.' },
];

const values = [
  { label: 'Integrity', desc: 'Honest diagnosis, second opinions always welcome.' },
  { label: 'Innovation', desc: 'Continuously upgrading skills and technology.' },
  { label: 'Compassion', desc: 'Empathy at the heart of every interaction.' },
  { label: 'Excellence', desc: 'No compromise on clinical outcomes or hygiene.' },
];

const AboutUs = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | 32 Signature Smilez';
  }, []);

  return (
    <>
      <Header />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      <div className="about-page">

        {/* ── HERO ── */}
        <section className="au-hero">
          <div className="au-hero-overlay" />
          <div className="container au-hero-content">
            <span className="au-eyebrow">Agartala's Premier Dental Clinic</span>
            <h1>
              Where <span className="au-highlight">Precision</span> Meets<br />
              <span className="au-highlight">Compassion</span>
            </h1>
            <p>
              At 32 Signature Smilez, we blend cutting-edge dentistry with a patient-first philosophy
              to deliver smiles that last a lifetime.
            </p>
            <div className="au-hero-badges">
              <span className="au-badge">🏅 18+ Years Experience</span>
              <span className="au-badge">🦷 500+ Implants</span>
              <span className="au-badge">⭐ 98% Satisfaction</span>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="au-stats-bar">
          <div className="container au-stats-inner">
            {stats.map((s) => (
              <div className="au-stat" key={s.label}>
                <div className="au-stat-value">{s.value}</div>
                <div className="au-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="au-section container">
          <div className="au-who">
            <div className="au-who-text">
              <span className="au-section-tag">Our Story</span>
              <h2>Who We Are</h2>
              <p>
                Founded with a singular vision — to make world-class dental care accessible in Northeast India —
                <strong> 32 Signature Smilez</strong> has grown into Agartala's most trusted multi-speciality
                dental clinic. From routine cleanings to complex maxillofacial surgeries, every patient walks
                out with a confident, healthy smile.
              </p>
              <p>
                Our clinic is built on three pillars: <strong>clinical excellence</strong>,
                <strong> uncompromising hygiene</strong>, and <strong>genuine patient care</strong>.
                We invest continuously in the latest dental technology and advanced surgical training
                to ensure outcomes that meet global standards.
              </p>
              <div className="au-values">
                {values.map(v => (
                  <div className="au-value-item" key={v.label}>
                    <span className="au-value-dot" />
                    <div>
                      <strong>{v.label}</strong>
                      <p>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="au-who-gallery">
              <div className="au-gallery-main">
                <img src="/clinic-room-2.jpg" alt="Clinic Treatment Room" />
                <div className="au-gallery-tag">State-of-the-Art Facility</div>
              </div>
              <div className="au-gallery-side">
                <img src="/clinic-room-3.jpg" alt="Modern Dental Equipment" />
                <img src="/clinic-room-4.jpg" alt="Comfortable Patient Suite" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CLINIC SHOWCASE ── */}
        <section className="au-showcase">
          <div className="container">
            <span className="au-section-tag" style={{ display: 'block', textAlign: 'center', marginBottom: '12px' }}>Our Clinic</span>
            <h2 className="au-section-center-title">Step Inside 32 Signature Smilez</h2>
            <p className="au-section-subtitle">
              Every corner of our clinic is designed with your comfort and safety in mind.
              Modern aesthetics meet clinical precision in a welcoming environment.
            </p>
            <div className="au-clinic-mosaic">
              <div className="au-mosaic-big">
                <img src="/clinic-room-1.jpg" alt="Main Treatment Room" />
                <div className="au-mosaic-caption">Main Surgical Suite</div>
              </div>
              <div className="au-mosaic-stack">
                <div className="au-mosaic-card">
                  <img src="/clinic-room-3.jpg" alt="Dental Technology" />
                  <div className="au-mosaic-caption">Advanced Equipment</div>
                </div>
                <div className="au-mosaic-card">
                  <img src="/clinic-room-4.jpg" alt="Patient Room" />
                  <div className="au-mosaic-caption">Comfortable Patient Suite</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section className="au-section container">
          <div className="au-mv-grid">
            <div className="au-mv-card mission">
              <div className="au-mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To deliver exceptional, compassionate dental care using the latest technology, making every patient feel safe, respected, and confident in their smile.</p>
              <ul>
                <li>Pain-free, anxiety-free dental visits</li>
                <li>Personalised treatment for every patient</li>
                <li>Promoting preventive oral health</li>
                <li>Affordable quality care for all</li>
              </ul>
            </div>
            <div className="au-mv-card vision">
              <div className="au-mv-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>To be the gold standard of dental excellence in Northeast India — a clinic where every smile tells a story of trust, transformation and care.</p>
              <ul>
                <li>Leading Dental Centre in the region</li>
                <li>World-class surgical outcomes</li>
                <li>Long-term patient relationships</li>
                <li>Innovations in implantology & cosmetic care</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="au-why">
          <div className="container">
            <span className="au-section-tag" style={{ display: 'block', textAlign: 'center', marginBottom: '12px' }}>Why Us</span>
            <h2 className="au-section-center-title">The 32 Signature Smilez Difference</h2>
            <p className="au-section-subtitle">Six reasons patients across Tripura trust us with their smiles</p>
            <div className="au-why-grid">
              {whyUs.map((w) => (
                <div className="au-why-card" key={w.title}>
                  <div className="au-why-icon">{w.icon}</div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="au-cta">
          <div className="au-cta-overlay" />
          <div className="container au-cta-content">
            <span className="au-eyebrow">Ready to Transform Your Smile?</span>
            <h2>Your Perfect Smile Starts Here</h2>
            <p>Book a free consultation with our expert team and discover what's possible for your smile.</p>
            <div className="au-cta-btns">
              <button onClick={() => setBookingOpen(true)} className="au-btn-primary" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Book Free Consultation →</button>
              <a href="tel:+919077770586" className="au-btn-outline">📞 Call Now</a>
            </div>
          </div>
        </section>

      </div>
      <FloatingWidgets />
      <Footer />
    </>
  );
};

export default AboutUs;