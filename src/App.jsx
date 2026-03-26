import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import ConsultationForm from './components/ConsultationForm';
import Testimonials from './components/Testimonials';
import FloatingWidgets from './components/FloatingWidgets';
import TechSlider from './components/TechSlider';
import AboutClinic from './components/AboutClinic';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TreatmentPage from './pages/TreatmentPage';
import AdminBlogList from './pages/AdminBlogList';
import AdminBlogCreate from './pages/AdminBlogCreate';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import ClinicGallery from './pages/ClinicGallery';

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Treatments />
        <ConsultationForm />
        <Testimonials />
        <TechSlider />
        <AboutClinic />
        <FAQ />
      </main>
      <FloatingWidgets />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treatment/:slug" element={<TreatmentPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<AdminBlogList />} />
          <Route path="/admin/blog/new" element={<AdminBlogCreate />} />
          
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/clinic" element={<ClinicGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
