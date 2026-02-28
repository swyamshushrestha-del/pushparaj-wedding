import React from 'react';
import { useData } from '../context/DataContext';
import './About.css';

const About = () => {
    const { t, siteImages } = useData();

    return (
        <section className="about section-padding" id="about">
            <div className="container">
                <div className="about-wrapper">
                    <div className="about-image-column">
                        <div className="about-image-container">
                            <img src={siteImages.about} alt="Pushparaj Wedding Founders" className="about-img" />
                            <div className="experience-badge">
                                <span className="years">{t('about.stats.yearsValue')}</span>
                                <span className="text">{t('about.stats.years')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-content-column">
                        <span className="section-subtitle">{t('about.title')}</span>
                        <h2 className="section-title">{t('about.storyTitle')}</h2>
                        <p className="about-desc">
                            {t('about.p1')}
                        </p>
                        <p className="about-desc">
                            {t('about.p2')}
                        </p>
                        <p className="about-desc">
                            {t('about.p3')}
                        </p>

                        <div className="about-features">
                            <div className="feature-item">
                                <span className="feature-icon">✨</span>
                                <div className="feature-text">
                                    <h4>{t('about.stats.events')}</h4>
                                    <p>{t('about.stats.eventsDesc')}</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🌿</span>
                                <div className="feature-text">
                                    <h4>{t('about.stats.flowers')}</h4>
                                    <p>{t('about.stats.flowersDesc')}</p>
                                </div>
                            </div>
                        </div>

                        <a href="#contact" className="btn btn-primary mt-4">{t('about.btnGetInTouch')}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
