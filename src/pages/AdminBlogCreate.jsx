import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import JoditEditor from 'jodit-react';
import './AdminStyles.css';

const AdminBlogCreate = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and Content are required.');
      return;
    }

    const adminInfo = getAdminInfo();
    if (!adminInfo || !adminInfo.token) {
      navigate('/admin');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (publishDate) formData.append('publishDate', publishDate);
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${adminInfo.token}`
        },
        body: formData
      });

      if (res.ok) {
        navigate('/admin/blogs');
      } else {
        setError('Failed to create blog');
      }
    } catch (err) {
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  const config = useMemo(() => ({
    readonly: false, 
    height: 600,
    theme: 'dark',
    uploader: {
      url: `${import.meta.env.VITE_API_URL}/api/blogs/upload-image`,
      format: 'json',
      methods: 'POST',
      headers: {
        Authorization: `Bearer ${getAdminInfo()?.token}`
      },
      isSuccess: function (resp) {
        return !resp.error;
      },
      process: function (resp) {
        return {
          files: resp.data.files,
          path: resp.data.path,
          baseurl: resp.data.baseurl,
          error: resp.error,
          message: resp.message,
          isImages: resp.data.isImages
        };
      }
    },
    controls: {
      font: {
        list: {
          'Outfit, sans-serif': 'Outfit'
        }
      }
    }
  }), []);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-brand">
          <h2>32 Signature Smilez</h2>
          <span>Admin Panel - Create Blog</span>
        </div>
        <button onClick={logout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div className="dashboard-content container">
        <div className="fade-in">
          <div style={{ marginBottom: '20px' }}>
            <Link to="/admin/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-green)', textDecoration: 'none', fontWeight: '500' }}>
              <ArrowLeft size={18} /> Back to Blogs
            </Link>
          </div>

          <div className="table-container" style={{ padding: '30px' }}>
             <h3 style={{ marginBottom: '25px', color: 'white', fontSize: '1.5rem' }}>Compose New Blog</h3>
             
             {error && <div className="error-message" style={{marginBottom: '20px'}}>{error}</div>}

             <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '2', minWidth: '300px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontWeight: '500' }}>Blog Title *</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a catchy title..."
                      style={{ width: '100%', padding: '14px', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '8px', fontSize: '1.1rem' }}
                      required
                    />
                  </div>
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontWeight: '500' }}>Publish Date (Optional)</label>
                    <input 
                      type="date" 
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      style={{ width: '100%', padding: '14px', background: '#111', border: '1px solid #333', color: 'white', borderRadius: '8px', fontSize: '1.1rem', colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                   <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontWeight: '500' }}>Main Thumbnail Image</label>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                     <label style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: '200px', height: '120px', border: '1px dashed var(--primary-green)', borderRadius: '8px',
                        cursor: 'pointer', background: 'rgba(57,255,20,0.05)', color: 'var(--primary-green)'
                     }}>
                        <ImageIcon size={30} style={{marginBottom: '10px'}} />
                        <span>Upload Image</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
                     </label>
                     {thumbnailPreview && (
                        <div style={{ width: '200px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                           <img src={thumbnailPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                     )}
                   </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontWeight: '500' }}>Blog Content *</label>
                  {/* Jodit Editor uses its own theme, we pass theme: 'dark' in config */}
                  <div style={{color: 'black'}}>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={newContent => setContent(newContent)}
                      onChange={newContent => {}}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem' }}
                >
                  {loading ? 'Publishing...' : 'Publish Blog'}
                </button>
             </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCreate;
