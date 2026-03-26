import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import './Blog.css';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center', color: 'white'}}>Loading blog...</div>;
  if (!blog) return <div style={{padding: '100px', textAlign: 'center', color: 'white'}}>Blog not found.</div>;

  return (
    <>
      <Header />
      <div className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <h1 style={{fontSize: '2.2rem', textAlign: 'left'}}>{blog.title}</h1>
          </div>
        </section>

        <section className="container blog-container">
          <div className="blog-main">
            <div className="post-header">
              <span style={{color: 'var(--primary-green)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase'}}>{new Date(blog.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {blog.thumbnail && (
                <img src={blog.thumbnail.startsWith('http') ? blog.thumbnail : `${import.meta.env.VITE_API_URL}${blog.thumbnail}`} alt={blog.title} className="post-thumbnail" />
              )}
            </div>

            {/* Render the Jodit HTML Content */}
            <div className="post-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
            
          </div>

          <aside className="blog-sidebar">
             {/* Quick Contact Form Widget embedded in blog layout as per user references */}
            <div className="sidebar-widget" style={{background: '#111'}}>
              <h3 className="sidebar-title">Book a Consultation</h3>
              <form style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px'}}>
                 <div>
                   <label style={{fontSize: '0.85rem', color: '#ccc', marginBottom: '5px', display: 'block'}}>Full Name *</label>
                   <input type="text" className="search-input" />
                 </div>
                 <div>
                   <label style={{fontSize: '0.85rem', color: '#ccc', marginBottom: '5px', display: 'block'}}>Phone Number *</label>
                   <input type="tel" className="search-input" />
                 </div>
                 <button type="button" className="btn-primary" style={{width: '100%', padding: '12px'}}>Submit</button>
              </form>
            </div>
            
            <div className="sidebar-widget">
              <h3 className="sidebar-title">Categories</h3>
              <ul className="category-list">
                <li><Link to="#">Anti Aging</Link></li>
                <li><Link to="#">Dental Implants</Link></li>
                <li><Link to="#">Oral Hygiene</Link></li>
                <li><Link to="#">Smile Makeover</Link></li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
      <FloatingWidgets />
      <Footer />
    </>
  );
};

export default BlogPost;
