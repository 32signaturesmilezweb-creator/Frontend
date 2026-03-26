import React, { useEffect, useState } from 'react';
import './ClinicGallery.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const galleryImages = [
  { id: 0, src: '/clinic-gallery/uploaded_media_0_1774511569819.jpg', alt: 'Clinic Interior 1', size: 'large' },
  { id: 1, src: '/clinic-gallery/uploaded_media_1_1774511569819.jpg', alt: 'Clinic Interior 2', size: 'medium' },
  { id: 2, src: '/clinic-gallery/uploaded_media_2_1774511569819.jpg', alt: 'Clinic Interior 3', size: 'medium' },
  { id: 3, src: '/clinic-gallery/uploaded_media_3_1774511569819.jpg', alt: 'Clinic Interior 4', size: 'large' },
  { id: 4, src: '/clinic-gallery/uploaded_media_4_1774511569819.jpg', alt: 'Clinic Interior 5', size: 'wide' },
  { id: 5, src: '/clinic-gallery/media__1774513230942.jpg', alt: 'Clinic Interior 6', size: 'large' },
  { id: 6, src: '/clinic-gallery/media__1774513251008.jpg', alt: 'Clinic Interior 7', size: 'medium' },
  { id: 7, src: '/clinic-gallery/media__1774513256630.jpg', alt: 'Clinic Interior 8', size: 'wide' },
  { id: 8, src: '/clinic-gallery/media__1774513262076.jpg', alt: 'Clinic Interior 9', size: 'medium' },
  { id: 9, src: '/clinic-gallery/media__1774513272363.jpg', alt: 'Clinic Interior 10', size: 'medium' }
];

const ClinicGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (img) => {
    setSelectedImage(img);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Header />
      <main className="clinic-gallery-page">
        <section className="gallery-hero">
          <div className="gallery-hero-content">
            <h1 className="glitch-text" data-text="Our Clinic">Our Clinic</h1>
            <p className="hero-subtitle">State-of-the-art facilities designed for your comfort and perfect smile.</p>
            <div className="neon-divider"></div>
          </div>
        </section>

        <section className="gallery-container">
          <div className="masonry-grid">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className={`gallery-item ${image.size}`}
                onClick={() => openLightbox(image)}
              >
                <div className="image-wrapper">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <div className="image-overlay">
                    <span className="view-text">View Full Image</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <span className="close-btn" onClick={closeLightbox}>&times;</span>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ClinicGallery;
