import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import './Gallery.css';

const Gallery = () => {
    const { galleryImages, t } = useData();
    const [modalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    // Listen for the custom event from the Hero button
    useEffect(() => {
        const handleOpenGallery = () => {
            if (galleryImages && galleryImages.length > 0) {
                openModal(0); // Open first image by default when clicked from Hero
            }
        };

        window.addEventListener('openGallery', handleOpenGallery);
        return () => window.removeEventListener('openGallery', handleOpenGallery);
    }, [galleryImages]);

    // Handle Modal Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!modalOpen) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalOpen, currentIndex, galleryImages.length]);

    // Handle Auto-play
    useEffect(() => {
        let interval;
        if (isAutoPlaying && modalOpen) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, modalOpen, currentIndex, galleryImages.length]);

    const openModal = (index) => {
        setCurrentIndex(index);
        setModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeModal = () => {
        setModalOpen(false);
        setIsAutoPlaying(false);
        document.body.style.overflow = 'auto';
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const toggleAutoPlay = (e) => {
        e.stopPropagation();
        setIsAutoPlaying(!isAutoPlaying);
    };

    return (
        <section className="gallery section-padding" id="portfolio">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">{t('gallery.subtitle')}</span>
                    <h2 className="section-title">{t('gallery.title')}</h2>
                    <p className="section-description">
                        {t('gallery.description')}
                    </p>
                </div>

                <div className="gallery-grid">
                    {galleryImages.map((item) => (
                        <div
                            className="gallery-item dynamic-item"
                            key={item.id}
                            onClick={() => openModal(index)}
                        >
                            <img src={item.src} alt={item.alt} />
                            <div className="gallery-overlay">
                                <span className="gallery-title">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Modal */}
            {modalOpen && galleryImages[currentIndex] && (
                <div className="gallery-modal animate-fade-in" onClick={closeModal}>
                    <button className="modal-close" onClick={closeModal} title="Close (Esc)">&times;</button>

                    <div className="modal-controls" onClick={(e) => e.stopPropagation()}>
                        <button className="nav-btn prev-btn" onClick={prevSlide} title="Previous (Left Arrow)">&#10094;</button>
                        <button className={`auto-play-btn ${isAutoPlaying ? 'active' : ''}`} onClick={toggleAutoPlay} title="Auto-Play">
                            {isAutoPlaying ? '⏸ Pause' : '▶ Auto-Play'}
                        </button>
                        <button className="nav-btn next-btn" onClick={nextSlide} title="Next (Right Arrow)">&#10095;</button>
                    </div>

                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={galleryImages[currentIndex].src} alt={galleryImages[currentIndex].alt} className="modal-img" />
                        <div className="modal-caption">
                            {galleryImages[currentIndex].title}
                            <span className="modal-counter">{currentIndex + 1} / {galleryImages.length}</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
