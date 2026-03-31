import React from 'react';
import './Treatments.css';
import { motion } from 'framer-motion';

const StandardTooth = ({ fill="#5ce1e6", stroke="none", strokeWidth="0" }) => (
  <path 
    d="M 33 25 C 20 25 25 45 30 55 C 33 62 35 72 38 82 C 40 88 45 88 47 80 C 49 70 50 63 50 63 C 50 63 51 70 53 80 C 55 88 60 88 62 82 C 65 72 67 62 70 55 C 75 45 80 25 67 25 C 58 25 50 35 50 35 C 50 35 42 25 33 25 Z" 
    fill={fill} stroke={stroke} strokeWidth={strokeWidth}
  />
);

const IconMaxillofacial = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <path d="M 28 35 C 28 25 72 25 72 35 L 72 55 C 72 75 50 90 50 90 C 50 90 28 75 28 55 Z" fill="#5ce1e6"/>
    <path d="M 50 35 L 50 45 M 45 40 L 55 40" stroke="#ffffff" strokeWidth="4" strokeLinecap="round"/>
    <path d="M 38 60 L 62 60 M 38 68 L 62 68 M 46 60 L 46 68 M 54 60 L 54 68" stroke="#090e17" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const IconMinorOralSurgery = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <StandardTooth fill="#ffffff" />
    <path d="M 45 10 L 38 35" stroke="#5ce1e6" strokeWidth="4" strokeLinecap="round" />
    <circle cx="68" cy="20" r="3" fill="#5ce1e6" />
  </svg>
);

const IconKids = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <StandardTooth fill="#ffffff" />
    <circle cx="42" cy="40" r="3.5" fill="#090e17"/>
    <circle cx="58" cy="40" r="3.5" fill="#090e17"/>
    <path d="M 42 50 Q 50 60 58 50" fill="none" stroke="#090e17" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

const IconSmile = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <StandardTooth fill="#ffffff" />
    <path d="M 35 45 Q 50 65 65 45" fill="none" stroke="#5ce1e6" strokeWidth="4" strokeLinecap="round"/>
    <path d="M 75 15 Q 80 15 80 10 Q 80 15 85 15 Q 80 15 80 20 Q 80 15 75 15 Z" fill="#5ce1e6"/>
  </svg>
);

const IconSportsDentistry = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <path d="M 20 45 C 20 20 80 20 80 45 C 80 65 50 85 50 85 C 50 85 20 65 20 45 Z" fill="#5ce1e6"/>
    <path d="M 25 50 Q 50 65 75 50" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round"/>
    <line x1="50" y1="40" x2="50" y2="57" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const IconWhitening = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <StandardTooth fill="#5ce1e6" />
    <path d="M 42 35 L 42 55 M 50 30 L 50 60 M 58 35 L 58 55" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
    <path d="M 20 25 Q 25 25 25 20 Q 25 25 30 25 Q 25 25 25 30 Q 25 25 20 25 Z" fill="#ffffff"/>
  </svg>
);

const IconVeneers = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <StandardTooth fill="#5ce1e6" />
    <path d="M 33 25 C 20 25 25 45 30 55 C 33 62 35 72 38 82 C 40 88 45 88 47 80 C 49 70 50 63 50 63 L 50 25 C 42 25 33 25 33 25 Z" fill="#ffffff"/>
  </svg>
);

const IconImplants = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    {/* Crown */}
    <path d="M 33 25 C 20 25 30 40 35 45 L 65 45 C 70 40 80 25 67 25 C 58 25 50 35 50 35 C 50 35 42 25 33 25 Z" fill="#ffffff"/>
    {/* Screw */}
    <path d="M 42 50 L 58 50 L 54 85 L 46 85 Z" fill="#5ce1e6" />
    <path d="M 41 55 L 59 55 M 43 65 L 57 65 M 44 75 L 56 75" stroke="#090e17" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const treatmentsData = [
  { id: 1, title: 'Maxillofacial Surgery',   desc: 'Jaw, face & oral surgery',         icon: <IconMaxillofacial /> },
  { id: 2, title: 'Minor Oral Surgeries',    desc: 'Safe & precise oral procedures',   icon: <IconMinorOralSurgery /> },
  { id: 3, title: 'Kids Dentistry',          desc: 'Gentle care for children',          icon: <IconKids /> },
  { id: 4, title: 'Smile Makeover',          desc: 'Complete smile transformation',     icon: <IconSmile /> },
  { id: 5, title: 'Sports Dentistry',        desc: 'Dental protection for athletes',    icon: <IconSportsDentistry /> },
  { id: 6, title: 'Teeth Whitening',         desc: 'Brighten your smile',               icon: <IconWhitening /> },
  { id: 7, title: 'Porcelain Veneers',       desc: 'Perfect ceramic smile shells',      icon: <IconVeneers /> },
  { id: 8, title: 'Dental Implants',         desc: 'Permanent tooth replacement',       icon: <IconImplants /> },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Treatments = () => {
  return (
    <section className="treatments-section">
      <div className="container">
        <h2 className="section-title">Treatments at 32 Signature Smilez</h2>

        <motion.div
          className="treatments-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {treatmentsData.map((item) => (
            <motion.div
              key={item.id}
              className="treatment-card"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="treatment-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="treatment-desc">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Treatments;
