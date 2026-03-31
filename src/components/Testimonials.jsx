import React, { useState, useEffect } from 'react';
import { Star, Quote, User, Filter, X } from 'lucide-react';
import ReviewModal from './ReviewModal';
import './Testimonials.css';

const staticReviews = [
  {
    _id: 'static1',
    reviewerName: 'Ajay Ratnam',
    createdAt: new Date().setMonth(new Date().getMonth() - 2),
    rating: 5,
    text: "I got instant relief with 32 Signature's painless root canal treatment. The doctors are incredibly skilled and the clinic environment is top-notch. Highly recommend!",
    isGoogle: true
  },
  {
    _id: 'static2',
    reviewerName: 'Bhavana',
    createdAt: new Date().setMonth(new Date().getMonth() - 4),
    rating: 5,
    text: "Now I smile, speak & perform with confidence. The customised smile design transformed my entire look. Thank you to the wonderful team at 32 Signature Smilez!",
    isGoogle: true
  },
  {
    _id: 'static3',
    reviewerName: 'BSN Dutt',
    createdAt: new Date().setMonth(new Date().getMonth() - 6),
    rating: 5,
    text: "I look 20 years younger! I can eat everything again after getting full mouth implants. The procedure was smooth and the aftercare was phenomenal.",
    isGoogle: true
  },
  {
    _id: 'static4',
    reviewerName: 'Meena Vasu',
    createdAt: new Date().setMonth(new Date().getMonth() - 12),
    rating: 5,
    text: "The most priceless ornament is your smile. The Invisalign aligners worked perfectly. The staff is always friendly and professional. Best dental clinic in Tripura!",
    isGoogle: true
  }
];

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`);
        if (res.ok) {
          const data = await res.json();
          setDynamicReviews(data);
        }
      } catch (err) {
        console.error("Error fetching dynamic reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  // Combine dynamic and static reviews
  const allReviews = [...dynamicReviews, ...staticReviews];
  
  // Apply filter
  const filteredReviews = allReviews.filter(review => {
    if (selectedFilter === 'all') return true;
    return review.rating === selectedFilter;
  });

  // Apply limit for main view
  const displayedReviews = filteredReviews.slice(0, 5);

  const filterOptions = [
    { label: 'All Reviews', value: 'all' },
    { label: '5 Stars', value: 5 },
    { label: '4 Stars', value: 4 },
    { label: '3 Stars', value: 3 },
    { label: '2 Stars', value: 2 },
    { label: '1 Star', value: 1 }
  ];

  return (
    <section className="testimonials-section">
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* View All Modal */}
      {isViewAllOpen && (
        <div className="modal-overlay" onClick={() => setIsViewAllOpen(false)} style={{ zIndex: 99999 }}>
          <div 
            onClick={e => e.stopPropagation()} 
            style={{
              background: 'linear-gradient(160deg, #111111 0%, #0a0a0a 100%)',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '40px',
              border: '1px solid rgba(0, 255, 136, 0.2)',
              position: 'relative'
            }}
          >
            <button 
              onClick={() => setIsViewAllOpen(false)} 
              style={{
                position: 'absolute', top: '20px', right: '20px', 
                background: 'transparent', border: 'none', color: '#888', cursor: 'pointer'
              }}
            >
              <X size={28} />
            </button>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>
              All Reviews {selectedFilter !== 'all' && `(${selectedFilter} Stars)`}
            </h2>
            <div className="reviews-grid">
              {filteredReviews.map((review, index) => {
                const dateObj = new Date(review.createdAt);
                const formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString() : 'Recently';
                return (
                  <div className="review-card fade-in" style={{animationDelay: `${(index % 10) * 0.1}s`}} key={`modal-${review._id}`}>
                    <div className="review-header">
                      <div className="reviewer-info">
                        {review.reviewerImage ? (
                           <img src={review.reviewerImage} alt="avatar" style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} />
                        ) : (
                           <div className="avatar">
                             {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : <User size={20} />}
                           </div>
                        )}
                        <div>
                          <h4 className="reviewer-name">{review.reviewerName}</h4>
                          <span className="review-date">{formattedDate}</span>
                        </div>
                      </div>
                      {review.isGoogle && (
                        <div className="google-icon-small"><span className="g-blue">G</span></div>
                      )}
                    </div>
                    <div className="review-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill={i < review.rating ? "var(--primary-gold)" : "transparent"} color="var(--primary-gold)" size={16} opacity={i < review.rating ? 1 : 0.3} />
                      ))}
                    </div>
                    <div className="review-body">
                      <Quote className="quote-icon" size={24} color="var(--primary-gold)" opacity={0.3} />
                      <p>"{review.text}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-subtitle">Real stories from real smiles. See why we are the top-rated dental clinic.</p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', position: 'relative' }}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff', cursor: 'pointer', transition: 'all 0.3s'
            }}
          >
            <Filter size={18} /> Filter Reviews
          </button>
          
          {isFilterOpen && (
            <div style={{ 
              position: 'absolute', top: '100%', right: 0, marginTop: '10px',
              background: '#111', border: '1px solid #333', borderRadius: '12px',
              padding: '16px', zIndex: 100, minWidth: '180px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}>
              <h4 style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '12px', marginLeft: '4px' }}>Filter by Rating</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filterOptions.map(option => (
                  <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <input 
                      type="radio" 
                      name="rating-filter" 
                      value={option.value} 
                      checked={selectedFilter === option.value}
                      onChange={() => {
                        setSelectedFilter(option.value);
                        setIsFilterOpen(false);
                      }}
                      style={{ accentColor: '#00FF88', width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {filteredReviews.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
            No reviews found for this rating.
          </div>
        ) : (
          <div className="reviews-grid">
            {displayedReviews.map((review, index) => {
              const dateObj = new Date(review.createdAt);
              const formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString() : 'Recently';
              
              return (
                <div className="review-card fade-in" style={{animationDelay: `${(index % 5) * 0.15}s`}} key={review._id}>
                  <div className="review-header">
                    <div className="reviewer-info">
                      {review.reviewerImage ? (
                         <img src={review.reviewerImage} alt="avatar" style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} />
                      ) : (
                         <div className="avatar">
                           {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : <User size={20} />}
                         </div>
                      )}
                      <div>
                        <h4 className="reviewer-name">{review.reviewerName}</h4>
                        <span className="review-date">{formattedDate}</span>
                      </div>
                    </div>
                    {review.isGoogle && (
                      <div className="google-icon-small">
                        <span className="g-blue">G</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill={i < review.rating ? "var(--primary-gold)" : "transparent"} color={i < review.rating ? "var(--primary-gold)" : "var(--primary-gold)"} size={16} opacity={i < review.rating ? 1 : 0.3} />
                    ))}
                  </div>
                  
                  <div className="review-body">
                    <Quote className="quote-icon" size={24} color="var(--primary-gold)" opacity={0.3} />
                    <p>"{review.text}"</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="reviews-cta" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredReviews.length > 5 && (
            <button 
              onClick={() => setIsViewAllOpen(true)}
              className="btn-primary" 
              style={{ 
                background: 'transparent', 
                color: '#fff', 
                border: '1px solid #555',
                cursor: 'pointer'
              }}
            >
               See All Reviews ({filteredReviews.length})
            </button>
          )}

          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary" 
            style={{ 
              background: 'rgba(0, 255, 136, 0.1)', 
              color: '#00FF88', 
              border: '1px solid rgba(0, 255, 136, 0.4)',
              cursor: 'pointer'
            }}
          >
             Write a Review
          </button>
          <a href="https://maps.app.goo.gl/Sw1ejpgGe2Nmy7ZT8" target="_blank" rel="noreferrer" className="btn-primary">
             Read all our Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
