import React, { useState, useEffect } from 'react';
import './ConsultationForm.css';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [status, setStatus] = useState({ type: '', msg: '' });
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(captcha);
    setUserCaptcha('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userCaptcha !== generatedCaptcha) {
      setStatus({ type: 'error', msg: 'Invalid captcha. Please try again.' });
      generateCaptcha();
      return;
    }

    setStatus({ type: 'loading', msg: 'Submitting your request...' });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Booking confirmed! We will contact you soon.' });
        setFormData({ firstName: '', lastName: '', phone: '', email: '' });
        generateCaptcha();
      } else {
        const errorData = await res.json();
        setStatus({ type: 'error', msg: errorData.message || 'Failed to submit booking. Please try again.' });
        generateCaptcha();
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Cannot connect to server. Please call us directly.' });
      generateCaptcha();
    }
  };

  return (
    <section id="booking-form" className="consultation-section">
      <div className="container form-container">
        
        <div className="consultation-form-wrapper fade-in">
          <div className="section-header-left" style={{textAlign: 'center', marginBottom: '10px'}}>
            <h2 className="title-with-line" style={{display: 'inline-block'}}>Book Free Consultation</h2>
          </div>

          {status.msg && (
            <div className={`status-message ${status.type}`}>
              {status.msg}
            </div>
          )}

          <form className="consultation-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group half">
                <label>First Name <span>*</span></label>
                <input type="text" name="firstName" placeholder="First Name" className="dark-input" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group half">
                <label>Last Name <span>*</span></label>
                <input type="text" name="lastName" placeholder="Last Name" className="dark-input" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label>Phone Number <span>*</span></label>
                <input type="tel" name="phone" placeholder="Contact No" className="dark-input" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group half">
                <label>Email Address <span>*</span></label>
                <input type="email" name="email" placeholder="Email Address" className="dark-input" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group captcha-group">
              <label>Captcha <span>*</span></label>
              <div className="captcha-wrapper">
                <input 
                  type="text" 
                  placeholder="Enter Captcha Code" 
                  className="dark-input captcha-input" 
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  required 
                />
                <div className="captcha-box">
                  <span className="captcha-code" style={{userSelect: 'none'}}>{generatedCaptcha}</span>
                  <button type="button" className="refresh-btn" onClick={generateCaptcha}>⟳</button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary form-submit-btn" disabled={status.type === 'loading'}>
              {status.type === 'loading' ? 'Submitting...' : 'Submit Now'}
            </button>
          </form>

          <p className="consent-text" style={{textAlign: 'center'}}>
            I hereby authorize and provide my consent to 32 Signature Smilez Care India Pvt. Ltd. to send me, 
            either directly or through any third-party service provider, information, alerts, SMS messages...
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
