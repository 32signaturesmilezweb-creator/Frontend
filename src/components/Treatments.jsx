import React from 'react';
import './Treatments.css';
import { motion } from 'framer-motion';

/* ---------------- BASE ICONS ---------------- */

const ToothOutline = () => (
  <path d="M 30,35 C 30,20 45,20 50,30 C 55,20 70,20 70,35 C 70,55 65,70 60,85 C 58,90 55,90 53,80 C 51,70 50,65 50,65 C 50,65 49,70 47,80 C 45,90 42,90 40,85 C 35,70 30,55 30,35 Z"
    fill="white" stroke="var(--primary-green)" strokeWidth="3"/>
);

const Shadow = () => (
  <ellipse cx="50" cy="92" rx="25" ry="5" fill="#fff0e5" />
);

/* ---------------- ICONS ---------------- */

const IconInvisalign = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <path d="M20,50 C20,30 80,30 80,50 C80,65 20,65 20,50 Z"
      fill="white" stroke="var(--primary-green)" strokeWidth="2"/>
  </svg>
);

const IconImplants = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <rect x="45" y="70" width="10" height="15"
      fill="white" stroke="var(--primary-green)" strokeWidth="2"/>
  </svg>
);

const IconAligners = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <path d="M20,50 C20,20 80,20 80,50"
      fill="none" stroke="var(--primary-green)" strokeWidth="3"/>
  </svg>
);

const IconKids = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <circle cx="45" cy="40" r="3" fill="#000"/>
    <circle cx="55" cy="40" r="3" fill="#000"/>
  </svg>
);

const IconSmile = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <path d="M40,55 C45,65 55,65 60,55" stroke="#000" fill="none"/>
  </svg>
);

const IconRootCanal = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <line x1="50" y1="20" x2="50" y2="80"
      stroke="#000" strokeWidth="2"/>
  </svg>
);

const IconLaser = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <line x1="80" y1="20" x2="50" y2="50"
      stroke="red" strokeWidth="2"/>
  </svg>
);

const IconCrown = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <path d="M30,60 L70,60 L60,85 L40,85 Z"
      fill="white" stroke="var(--primary-green)" strokeWidth="2"/>
  </svg>
);

const IconDentures = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <rect x="25" y="40" width="50" height="20"
      fill="white" stroke="var(--primary-green)" strokeWidth="2"/>
  </svg>
);

const IconBraces = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <line x1="20" y1="50" x2="80" y2="50"
      stroke="#000"/>
  </svg>
);

const IconWhitening = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <circle cx="70" cy="25" r="5" fill="yellow"/>
  </svg>
);

const IconDecay = () => (
  <svg viewBox="0 0 100 100" className="tooth-svg">
    <Shadow />
    <ToothOutline />
    <circle cx="60" cy="30" r="6" fill="#000"/>
  </svg>
);

/* ---------------- ANIMATION ---------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120 }
  }
};

/* ---------------- DATA ---------------- */

const treatmentsData = [
  { id: 1, title: 'Invisalign Aligners', desc: 'Invisible teeth straightening', icon: <IconInvisalign /> },
  { id: 2, title: 'Dental Implants', desc: 'Permanent tooth replacement', icon: <IconImplants /> },
  { id: 3, title: '32 Signature Aligners', desc: 'Custom smile correction', icon: <IconAligners /> },
  { id: 4, title: 'Kids Dentistry', desc: 'Gentle care for children', icon: <IconKids /> },
  { id: 5, title: 'Smile Makeover', desc: 'Complete smile transformation', icon: <IconSmile /> },
  { id: 6, title: 'Root Canal', desc: 'Pain relief & tooth saving', icon: <IconRootCanal /> },
  { id: 7, title: 'Laser Dentistry', desc: 'Advanced painless treatment', icon: <IconLaser /> },
  { id: 8, title: 'Dental Crowns', desc: 'Restore damaged teeth', icon: <IconCrown /> },
  { id: 9, title: 'Dentures', desc: 'Comfortable tooth replacement', icon: <IconDentures /> },
  { id: 10, title: 'Dental Braces', desc: 'Align & straighten teeth', icon: <IconBraces /> },
  { id: 11, title: 'Teeth Whitening', desc: 'Brighten your smile', icon: <IconWhitening /> },
  { id: 12, title: 'Tooth Decay', desc: 'Cavity treatment & care', icon: <IconDecay /> }
];

/* ---------------- COMPONENT ---------------- */

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
        >
          {treatmentsData.map((item) => (
            <motion.div
              key={item.id}
              className="treatment-card"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="treatment-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="treatment-desc">{item.desc}</p>
              <button className="card-btn">Learn More →</button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Treatments;
