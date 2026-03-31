import React, { useState, useRef, useEffect } from 'react';
import { Star, Upload, X } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      alert("Name and review text are required.");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('reviewerName', name);
      formData.append('rating', rating);
      formData.append('text', text);
      if (imageFile) {
        formData.append('reviewerImage', imageFile);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setName('');
          setRating(5);
          setText('');
          setImageFile(null);
          setImagePreview(null);
        }, 3000);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Cannot connect to server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999 }}>
      <div 
        onClick={e => e.stopPropagation()} 
        style={{
          background: 'linear-gradient(160deg, #111111 0%, #0a0a0a 100%)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '500px',
          padding: '30px',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 40px rgba(0,255,136,0.05)',
          position: 'relative'
        }}
      >
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute', top: '16px', right: '16px', 
            background: 'transparent', border: 'none', color: '#888', cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ display: 'inline-flex', background: 'rgba(0,255,136,0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px' }}>
              <Star size={48} color="#00FF88" fill="#00FF88" />
            </div>
            <h3 style={{ color: '#00FF88', fontSize: '1.5rem', marginBottom: '10px' }}>Thank You!</h3>
            <p style={{ color: '#ccc', lineHeight: '1.5' }}>Your review has been submitted successfully and is pending approval.</p>
          </div>
        ) : (
          <>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '24px', textAlign: 'center' }}>Write a Review</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed rgba(0,255,136,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    overflow: 'hidden', background: 'rgba(0,0,0,0.2)'
                  }}
                  title="Upload profile picture"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Upload size={24} color="#00FF88" opacity={0.6} />
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '8px' }}>Your Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,136,0.2)',
                    color: '#fff', fontSize: '1rem', boxSizing: 'border-box'
                  }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '8px' }}>Rating</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star size={28} color={star <= rating ? "#00FF88" : "#444"} fill={star <= rating ? "#00FF88" : "transparent"} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '8px' }}>Your Review *</label>
                <textarea 
                  value={text} 
                  onChange={e => setText(e.target.value)} 
                  required
                  rows="4"
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,136,0.2)',
                    color: '#fff', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box'
                  }} 
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                style={{
                  width: '100%', padding: '14px', borderRadius: '12px',
                  background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.4)',
                  color: '#00FF88', fontWeight: 'bold', fontSize: '1rem',
                  cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                  marginTop: '10px'
                }}
                onMouseOver={e => !submitting && (e.currentTarget.style.background = 'rgba(0,255,136,0.2)')}
                onMouseOut={e => !submitting && (e.currentTarget.style.background = 'rgba(0,255,136,0.1)')}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
