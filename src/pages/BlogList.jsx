import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWidgets from '../components/FloatingWidgets';
import './Blog.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
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
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.substring(0, 150) + "...";
  };

  return (
    <>
      <Header />
      <div className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <h1>Dental Blog & Insights</h1>
          </div>
        </section>

        <section className="container blog-container">
          <div className="blog-main">
            {loading ? (
              <p>Loading blogs...</p>
            ) : blogs.length === 0 ? (
              <p>No blogs published yet.</p>
            ) : (
              <div className="blog-grid">
                {blogs.map(blog => {
                  const date = new Date(blog.publishDate);
                  const bgImage = blog.thumbnail 
                    ? (blog.thumbnail.startsWith('http') ? blog.thumbnail : `${import.meta.env.VITE_API_URL}${blog.thumbnail}`)
                    : '/placeholder.jpg';
                    
                  return (
                    <div className="blog-card" key={blog._id}>
                      <div className="blog-card-img" style={{
                        background: `url(${bgImage}) center/cover`
                      }}>
                        <div className="blog-date-badge">
                          <span className="day">{date.getDate()}</span>
                          <span className="month">{date.toLocaleString('default', { month: 'short' })}</span>
                        </div>
                      </div>
                      <div className="blog-card-content">
                        <h3 className="blog-card-title">{blog.title}</h3>
                        <p className="blog-card-excerpt">
                          {blog.excerpt || getExcerpt(blog.content)}
                        </p>
                        <Link to={`/blog/${blog._id}`} className="blog-read-more">READ MORE</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h3 className="sidebar-title">Search</h3>
              <input type="text" className="search-input" placeholder="Search articles..." />
              <button className="btn-outline" style={{width: '100%', marginTop: '10px', padding: '10px', fontSize: '0.9rem'}}>Search</button>
            </div>
            
            <div className="sidebar-widget">
              <h3 className="sidebar-title">Categories</h3>
              <ul className="category-list">
                <li><Link to="#">Anti Aging</Link></li>
                <li><Link to="#">Dental Implants</Link></li>
                <li><Link to="#">Oral Hygiene</Link></li>
                <li><Link to="#">Smile Makeover</Link></li>
                <li><Link to="#">Children Dentistry</Link></li>
                <li><Link to="#">Clear Aligners</Link></li>
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
