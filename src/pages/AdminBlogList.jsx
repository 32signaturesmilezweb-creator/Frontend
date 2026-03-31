import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, ArrowLeft, FileText } from 'lucide-react';
import './AdminStyles.css';

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
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

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        setError('Failed to fetch blogs');
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
    fetchBlogs();
  }, [navigate]);

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const adminInfo = getAdminInfo();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: adminInfo ? `Bearer ${adminInfo.token}` : '',
        }
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => b._id !== id));
        alert("Blog successfully deleted!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("Failed to delete blog: " + (errorData.message || res.statusText));
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
          <span>Admin Panel - Blogs</span>
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
          <Link to="/admin/dashboard" className="btn-dark" style={{padding: '8px 15px', fontSize: '0.9rem', border: '1px solid #333'}}>
             Appointments
          </Link>
          <Link to="/admin/gallery" className="btn-dark" style={{padding: '8px 15px', fontSize: '0.9rem', border: '1px solid #333'}}>
             Clinic Gallery
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
          <h3>Manage Blogs</h3>
          <Link to="/admin/blog/new" className="btn-primary" style={{padding: '10px 20px', fontSize: '0.9rem'}}>
            <Plus size={18} /> Create New Blog
          </Link>
        </div>

        <div className="table-container fade-in" style={{animationDelay: '0.1s'}}>
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading-state">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="empty-state">No blogs found. Create one!</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Published Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      {blog.thumbnail ? (
                        <img src={blog.thumbnail.startsWith('http') ? blog.thumbnail : `${import.meta.env.VITE_API_URL}${blog.thumbnail}`} alt="thumbnail" style={{width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />
                      ) : (
                        <div style={{width: '60px', height: '40px', background: '#222', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                           <FileText size={16} color="#555" />
                        </div>
                      )}
                    </td>
                    <td><strong>{blog.title}</strong></td>
                    <td>{new Date(blog.publishDate).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => deleteBlog(blog._id)}
                        className="status-badge"
                        style={{cursor: 'pointer', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', marginLeft: '10px'}}
                      >
                        <Trash2 size={14} style={{marginRight: '4px'}} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogList;
