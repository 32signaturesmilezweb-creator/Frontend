import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, CheckCircle, XCircle, Trash2, User, Star } from 'lucide-react';
import './AdminStyles.css';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getAdminInfo = () => {
    const info = localStorage.getItem('adminInfo');
    return info ? JSON.parse(info) : null;
  };

  const logout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/admin`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      } else {
        setError('Failed to fetch reviews');
      }
    } catch (err) {
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminInfo = getAdminInfo();
    if (!adminInfo || !adminInfo.token) {
      navigate('/admin');
      return;
    }
    fetchReviews();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    try {
      const adminInfo = getAdminInfo();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: adminInfo ? `Bearer ${adminInfo.token}` : '',
        },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        setReviews(reviews.map(r => r._id === id ? { ...r, status } : r));
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("Failed to update review: " + (errorData.message || res.statusText));
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error connecting to server. Please try again.");
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this review?")) return;
    
    try {
      const adminInfo = getAdminInfo();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: adminInfo ? `Bearer ${adminInfo.token}` : '',
        }
      });
      
      if (res.ok) {
        setReviews(reviews.filter(r => r._id !== id));
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("Failed to delete review: " + (errorData.message || res.statusText));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error connecting to server. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return { bg: 'rgba(52, 211, 153, 0.2)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.4)' };
      case 'rejected': return { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)' };
      default: return { bg: 'rgba(212, 175, 55, 0.2)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.4)' };
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-brand">
          <h2>32 Signature Smilez</h2>
          <span>Admin Panel - Reviews</span>
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
          <Link to="/admin/dashboard" className="btn-dark" style={{padding: '8px 15px', fontSize: '0.9rem', border: '1px solid #333'}}>
             Appointments
          </Link>
          <Link to="/admin/blogs" className="btn-dark" style={{padding: '8px 15px', fontSize: '0.9rem', border: '1px solid #333'}}>
             Blogs
          </Link>
          <button onClick={logout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content container">
        <div className="table-header fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Review Moderation</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Approve or reject customer reviews before they appear on the homepage.</p>
        </div>

        <div className="table-container fade-in" style={{animationDelay: '0.1s'}}>
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading-state">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="empty-state">No reviews submitted yet.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{width: '60px'}}>User</th>
                  <th style={{width: '180px'}}>Details</th>
                  <th>Review</th>
                  <th style={{width: '120px'}}>Status</th>
                  <th style={{width: '160px', textAlign: 'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => {
                  const sColor = getStatusColor(review.status);
                  return (
                  <tr key={review._id}>
                    <td>
                      {review.reviewerImage ? (
                        <img src={review.reviewerImage} alt="reviewer" style={{width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%'}} />
                      ) : (
                        <div style={{width: '45px', height: '45px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                           <User size={20} color="#888" />
                        </div>
                      )}
                    </td>
                    <td>
                      <strong style={{ display: 'block', fontSize: '1rem', color: '#fff' }}>{review.reviewerName}</strong>
                      <div style={{ display: 'flex', gap: '2px', margin: '4px 0' }}>
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={12} fill={i < review.rating ? "#00FF88" : "transparent"} color={i < review.rating ? "#00FF88" : "#555"} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#888' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', lineHeight: '1.4' }}>"{review.text}"</p>
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 8px', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: '600', 
                        textTransform: 'uppercase',
                        background: sColor.bg,
                        color: sColor.color,
                        border: sColor.border
                      }}>
                        {review.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {review.status !== 'approved' && (
                          <button 
                            onClick={() => updateStatus(review._id, 'approved')}
                            title="Approve"
                            style={{cursor: 'pointer', background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '6px', borderRadius: '6px'}}
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {review.status !== 'rejected' && (
                          <button 
                            onClick={() => updateStatus(review._id, 'rejected')}
                            title="Reject"
                            style={{cursor: 'pointer', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '6px', borderRadius: '6px'}}
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => deleteReview(review._id)}
                          title="Delete"
                          style={{cursor: 'pointer', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px', borderRadius: '6px'}}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
