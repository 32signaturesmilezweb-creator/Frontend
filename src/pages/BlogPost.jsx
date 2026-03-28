import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import './Blog.css';

const categories = ['Anti Aging', 'Dental Implants', 'Oral Hygiene', 'Smile Makeover', 'Children Dentistry', 'Clear Aligners'];

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consultation form state
  const [form, setForm] = useState({ name: '', phone: '' });
  const [formStatus, setFormStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
          if (data.title) document.title = `${data.title} | 32 Signature Smilez`;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    setFormStatus({ type: '', msg: '' });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.name,
          lastName: '',
          phone: form.phone,
          email: 'not-provided@blog.com',
        }),
      });
      if (res.ok) {
        setFormStatus({ type: 'success', msg: '✓ Request sent! We will call you shortly.' });
        setForm({ name: '', phone: '' });
      } else {
        setFormStatus({ type: 'error', msg: 'Failed to send. Please call us directly.' });
      }
    } catch {
      setFormStatus({ type: 'error', msg: 'Cannot connect. Please call us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ padding: '120px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', background: 'var(--bg-main)', minHeight: '100vh' }}>
      Loading…
    </div>
  );

  if (!blog) return (
    <div style={{ padding: '120px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', background: 'var(--bg-main)', minHeight: '100vh' }}>
      Blog post not found.
    </div>
  );

  const thumbnail = blog.thumbnail
    ? (blog.thumbnail.startsWith('http') ? blog.thumbnail : `${import.meta.env.VITE_API_URL}${blog.thumbnail}`)
    : null;

  return (
    <>
      <Header />
      <div className="blog-page">
        {/* Hero */}
        <section className="blog-hero" style={{ textAlign: 'left' }}>
          <div className="container">
            <h1 style={{ fontSize: '2rem' }}>{blog.title}</h1>
          </div>
        </section>

        <section className="container blog-container">
          {/* ── POST CONTENT ── */}
          <div className="blog-main">
            <div className="post-header">
              <div className="post-date-label">
                {new Date(blog.publishDate).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </div>
              {thumbnail && (
                <img src={thumbnail} alt={blog.title} className="post-thumbnail" />
              )}
            </div>

            <div className="post-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="blog-sidebar">

            {/* Book a Consultation */}
            <div className="sidebar-consult-widget">
              <h3 className="sidebar-title">Book a Consultation</h3>
              <form onSubmit={handleConsultSubmit}>
                <div className="consult-form-group">
                  <label className="consult-form-label">Full Name *</label>
                  <input
                    type="text"
                    className="consult-form-input"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="consult-form-group">
                  <label className="consult-form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="consult-form-input"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="consult-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : 'Book Free Consultation →'}
                </button>
                {formStatus.msg && (
                  <div className={`consult-status ${formStatus.type}`}>
                    {formStatus.msg}
                  </div>
                )}
              </form>
            </div>

            {/* Categories */}
            <div className="sidebar-widget">
              <h3 className="sidebar-title">Categories</h3>
              <ul className="category-list">
                {categories.map(cat => (
                  <li key={cat}>
                    <Link to="/blog">{cat}</Link>
                  </li>
                ))}
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
