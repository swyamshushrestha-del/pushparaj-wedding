import React from 'react';
import { useData } from '../context/DataContext';
import './Services.css';
import nepaliBg from '../assets/nepali_wedding_decor_1772272507827.png';
import receptionBg from '../assets/reception_decor_1772272550435.png';
import heroBg from '../assets/hero_floral_decor_1772272455981.png';

const Services = () => {
    const { t } = useData();

    const servicesData = [
        {
            id: 1,
            titleKey: 0,
            image: nepaliBg,
        },
        {
            id: 2,
            titleKey: 1,
            image: receptionBg,
        },
        {
            id: 3,
            titleKey: 2,
            image: heroBg,
        }
    ];

    const serviceItems = t('services.items') || [];

    return (
        <section className="services section-padding" id="services">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">{t('services.subtitle')}</span>
                    <h2 className="section-title">{t('services.title')}</h2>
                    <p className="section-description">
                        {t('services.description')}
                    </p>
                </div>

                <div className="services-grid">
                    {servicesData.map((service) => (
                        <div className="service-card" key={service.id}>
                            <div className="service-image-wrapper">
                                <img src={service.image} alt="Service preview" className="service-image" />
                                <div className="service-overlay"></div>
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">{serviceItems[service.titleKey]?.title}</h3>
                                <p className="service-text">{serviceItems[service.titleKey]?.desc}</p>
                                <a href="#contact" className="service-link">Learn More <span className="arrow">→</span></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
