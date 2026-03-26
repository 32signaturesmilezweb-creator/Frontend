import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do You Have a Pediatric Dentist at 32 Signature Smilez?",
      answer: "Yes, we have specialized pediatric dentists trained to make your child's dental visit comfortable, fun, and fear-free."
    },
    {
      question: "What modes of payment are acceptable at 32 Signature Smilez?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and offer easy EMI options for larger treatments."
    },
    {
      question: "How do I book an appointment with 32 Signature Smilez?",
      answer: "You can book directly through the 'Book Now' button on our website, call our clinic line, or simply reach out to us on WhatsApp."
    },
    {
      question: "What safety measures are in place?",
      answer: "We follow strict sterilization protocols including 4-step autoclave sterilization, disposable PPE for staff, and air purification in all operatories."
    },
    {
      question: "What dental services do you offer?",
      answer: "We offer comprehensive services including Implants, Root Canal Treatments, Aligners, Braces, Cosmetic Dentistry, and general scaling."
    },
    {
      question: "Do You Have Imaging (X-Rays, CT-SCAN) Facilities?",
      answer: "Yes! Our clinics are equipped with advanced digital X-rays (OPG) and CBCT scanning equipment for precise and immediate diagnostics."
    },
    {
      question: "What are your clinic timings?",
      answer: "We are open from 9:00 AM to 9:00 PM, all seven days of the week, including most public holidays."
    },
    {
      question: "How do I reschedule my appointment?",
      answer: "You can easily reschedule by calling our front desk or messaging us on WhatsApp at least 4 hours prior to your scheduled slot."
    }
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header text-center fade-in">
          <h2 className="title-with-line center-line" style={{marginBottom: '50px'}}>Frequently Asked Questions</h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item fade-in ${openIndex === index ? 'open' : ''}`}
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span><span className="q-number">{index + 1}.</span> {faq.question}</span>
                <span className="toggle-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
