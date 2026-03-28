import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import './Blog.css';

const categories = ['Anti Aging', 'Dental Implants', 'Oral Hygiene', 'Smile Makeover', 'Children Dentistry', 'Clear Aligners'];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Consultation form state
  const [form, setForm] = useState({ name: '', phone: '' });
  const [formStatus, setFormStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
          setFilteredBlogs(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const getExcerpt = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.substring(0, 130) + '...';
  };

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return setFilteredBlogs(blogs);
    setFilteredBlogs(blogs.filter(b =>
      b.title.toLowerCase().includes(q) ||
      (b.excerpt || '').toLowerCase().includes(q)
    ));
  };

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
        setFormStatus({ type: 'error', msg: 'Failed to send. Please try again.' });
      }
    } catch {
      setFormStatus({ type: 'error', msg: 'Cannot connect. Please call us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <h1>Dental Blog &amp; Insights</h1>
            <p>Expert advice, tips and news from the 32 Signature Smilez team</p>
          </div>
        </section>

        <section className="container blog-container">
          {/* ── MAIN BLOG GRID ── */}
          <div className="blog-main">
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.4)', padding: '40px 0' }}>Loading blogs…</p>
            ) : filteredBlogs.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.4)', padding: '40px 0' }}>No blogs found.</p>
            ) : (
              <div className="blog-grid">
                {filteredBlogs.map(blog => {
                  const date = new Date(blog.publishDate);
                  const bgImage = blog.thumbnail
                    ? (blog.thumbnail.startsWith('http') ? blog.thumbnail : `${import.meta.env.VITE_API_URL}${blog.thumbnail}`)
                    : '/placeholder.jpg';

                  return (
                    <div className="blog-card" key={blog._id}>
                      <div
                        className="blog-card-img"
                        style={{ background: `url(${bgImage}) center/cover no-repeat` }}
                      >
                        <div className="blog-card-img-overlay" />
                        <div className="blog-date-badge">
                          <span className="day">{date.getDate()}</span>
                          <span className="month">{date.toLocaleString('default', { month: 'short' })}</span>
                        </div>
                        {blog.category && (
                          <span className="blog-card-tag">{blog.category}</span>
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3 className="blog-card-title">{blog.title}</h3>
                        <p className="blog-card-excerpt">
                          {blog.excerpt || getExcerpt(blog.content)}
                        </p>
                        <div className="blog-card-footer">
                          <Link to={`/blog/${blog._id}`} className="blog-read-more">
                            Read More <span className="blog-read-more-arrow">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="blog-sidebar">

            {/* Search */}
            <div className="sidebar-widget">
              <h3 className="sidebar-title">Search</h3>
              <input
                type="text"
                className="search-input"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>

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
                    <Link to="#" onClick={() => {
                      setSearchQuery(cat);
                      setFilteredBlogs(blogs.filter(b =>
                        (b.category || '').toLowerCase() === cat.toLowerCase()
                      ));
                    }}>
                      {cat}
                    </Link>
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

export default BlogList;
