import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import './Hero.css';

const Hero = () => {
    const { siteSettings, siteImages, t } = useData();
    const [currentSlide, setCurrentSlide] = useState(0);
    const prevSlideRef = useRef(0);

    const slides = [
        { id: 1, image: siteImages.hero[0], titleKey: 0 },
        { id: 2, image: siteImages.hero[1], titleKey: 1 },
        { id: 3, image: siteImages.hero[2], titleKey: 2 }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            handleSlideChange((currentSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [currentSlide, slides.length]);

    const handleSlideChange = (newIndex) => {
        prevSlideRef.current = currentSlide;
        setCurrentSlide(newIndex);
    };

    const openGallery = (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('openGallery'));
    };

    return (
        <section className="hero" id="home">
            {slides.map((slide, index) => {
                let statusClass = '';
                if (index === currentSlide) statusClass = 'active';
                else if (index === prevSlideRef.current) statusClass = 'prev';

                return (
                    <div
                        key={slide.id}
                        className={`hero-background effect-${siteSettings?.heroEffect || 'fade'} ${statusClass}`}
                    >
                        <img src={slide.image} alt="Grand luxury floral wedding decor" className="hero-img" />
                        <div className="hero-overlay"></div>
                    </div>
                );
            })}

            <div className="container hero-content animate-fade-in">
                <span className="hero-subtitle">{t('hero.subtitle')}</span>
                <h1 className="hero-title">{t('hero.titles') ? t('hero.titles')[slides[currentSlide].titleKey] : ''}</h1>
                <p className="hero-description">
                    {t('hero.description')}
                </p>
                <div className="hero-actions">
                    <a href="#services" className="btn btn-primary">{t('hero.btnServices')}</a>
                    <button onClick={openGallery} className="btn btn-outline" style={{ color: 'var(--color-surface)', borderColor: 'var(--color-surface)' }}>
                        {t('hero.btnGallery')}
                    </button>
                </div>
            </div>

            {/* Slider Indicators */}
            <div className="hero-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleSlideChange(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
