import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTreatmentData, MAPS_LINK } from '../data/treatmentData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import BookingModal from '../components/BookingModal';
import './TreatmentPage.css';

const TreatmentPage = () => {
  const { slug } = useParams();
  const data = getTreatmentData(slug);

  const [openFaq, setOpenFaq] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${data.title} | 32 Signature Smilez`;
  }, [slug, data.title]);

  if (!data) {
    return <h2 style={{ textAlign: "center" }}>Treatment not found</h2>;
  }

  return (
    <>
      <Header />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <div className="treatment-page">

        {/* HERO */}
        <div className="treatment-hero">
          <div className="container">
            <h1>{data.title}</h1>
          </div>
        </div>

        {/* BODY */}
        <div className="treatment-body container">

          <div className="treatment-main">

            {/* LEFT */}
            <div className="treatment-content">
              <h2>What is {data.title}?</h2>
              <p className="treatment-intro">{data.intro}</p>

              {/* DETAILS */}
{data.details.map((section, i) => {
  const lines = section.content.split('\n');

  return (
    <div key={i} className="detail-section">
      <h3>{section.heading}</h3>

      <div className="detail-text">
        <ul>
          {lines.map((line, j) => {
            if (line.match(/^\d+\./)) {
              return (
                <li key={j}>
                  {line.replace(/^\d+\.\s*/, '')}
                </li>
              );
            }

            if (line.trim() !== "") {
              return <p key={j}>{line}</p>;
            }

            return null;
          })}
        </ul>
      </div>
    </div>
  );
})}

              {/* CTA */}
              <div className="treatment-cta">

                <button
                  className="btn-primary"
                  onClick={() => setBookingOpen(true)}
                >
                  BOOK FREE APPOINTMENT 📅
                </button>

                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  VISIT CLINIC 📍
                </a>

              </div>
            </div>

            {/* RIGHT */}
            <div className="treatment-image-col">

              <div className="treatment-img-card">
                <img
                  src={data.image}
                  alt={data.title}
                  loading="lazy"
                  onError={(e) =>
                    (e.target.src = '/teeth-whitening-before-1.webp')
                  }
                />
              </div>

              <div className="clinic-info-card">
                <p>🏆 Expert team with decades of experience</p>
                <p>🔬 Advanced dental technology</p>
                <p>💚 Comfortable, painless procedures</p>
              </div>

            </div>
          </div>

          {/* FAQ */}
          {data.faqs.length > 0 && (
            <div className="treatment-faq">
              <h2>Frequently Asked Questions</h2>

              <div className="faq-list">
                {data.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`faq-row ${openFaq === i ? 'open' : ''}`}
                    onClick={() =>
                      setOpenFaq(openFaq === i ? null : i)
                    }
                  >
                    <div className="faq-q">
                      <span>{faq.q}</span>
                      <span className="faq-toggle">
                        {openFaq === i ? '▲' : '▼'}
                      </span>
                    </div>

                    {openFaq === i && (
                      <div className="faq-a">
                        <p><strong>Answer:</strong> {faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <FloatingWidgets />
      <Footer />
    </>
  );
};

export default TreatmentPage;
