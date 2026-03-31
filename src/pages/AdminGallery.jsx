import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import './AdminStyles.css';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const getAdminInfo = () => {
    const info = localStorage.getItem('adminInfo');
    return info ? JSON.parse(info) : null;
  };

  const logout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`);
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      } else {
        setError('Failed to fetch gallery images');
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
    fetchImages();
  }, [navigate]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    try {
      setUploading(true);
      const adminInfo = getAdminInfo();
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`, {
        method: 'POST',
        headers: {
          Authorization: adminInfo ? `Bearer ${adminInfo.token}` : '',
        },
        body: formData,
      });

      if (res.ok) {
        const newImage = await res.json();
        setImages([newImage, ...images]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("Failed to upload image: " + (errorData.message || res.statusText));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo from the gallery?")) return;
    
    try {
      const adminInfo = getAdminInfo();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: adminInfo ? `Bearer ${adminInfo.token}` : '',
        }
      });
      
      if (res.ok) {
        setImages(images.filter(img => img._id !== id));
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("Failed to delete image: " + (errorData.message || res.statusText));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-brand">
          <h2>32 Signature Smilez</h2>
          <span>Admin Panel - Clinic Gallery</span>
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
          <Link to="/admin/dashboard" className="btn-dark" style={{padding: '8px 15px', fontSize: '0.9rem', border: '1px solid #333'}}>
             Appointments
          </Link>
          <Link to="/admin/blogs" className="btn-dark" style={{padding: '8px 15px', fontSize: '0.9rem', border: '1px solid #333'}}>
             Blogs
          </Link>
          <Link to="/admin/reviews" className="btn-dark" style={{padding: '8px 15px', fontSize: '0.9rem', border: '1px solid #333'}}>
             Reviews
          </Link>
          <button onClick={logout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content container">
        <div className="table-header fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Manage Clinic Photos</h3>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <button 
            onClick={handleUploadClick} 
            className="btn-primary" 
            style={{padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px'}}
            disabled={uploading}
          >
            <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload New Photo'}
          </button>
        </div>

        <div className="table-container fade-in" style={{animationDelay: '0.1s', padding: '24px', background: 'var(--bg-card)', borderRadius: '12px'}}>
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading-state">Loading gallery...</div>
          ) : images.length === 0 ? (
            <div className="empty-state">No photos in the gallery. Upload some!</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {images.map((img) => (
                <div key={img._id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', backgroundColor: '#111' }}>
                  <img 
                    src={img.imageUrl} 
                    alt="Clinic Gallery" 
                    style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} 
                  />
                  <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a' }}>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>
                      {new Date(img.createdAt).toLocaleDateString()}
                    </span>
                    <button 
                      onClick={() => deleteImage(img._id)}
                      className="status-badge"
                      style={{ cursor: 'pointer', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 12px' }}
                      title="Delete Photo"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
