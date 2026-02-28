import React from 'react';
import { useData } from '../context/DataContext';
import './Testimonials.css';

const Testimonials = () => {
    const { t } = useData();
    const reviews = t('testimonials.reviews') || [];

    const testimonialsData = [
        {
            id: 1,
            reviewKey: 0,
            rating: 5
        },
        {
            id: 2,
            reviewKey: 1,
            rating: 5
        },
        {
            id: 3,
            reviewKey: 2,
            rating: 5
        }
    ];

    const renderStars = (count) => {
        return Array(count).fill('★').map((star, i) => (
            <span key={i} className="star">{star}</span>
        ));
    };

    return (
        <section className="testimonials section-padding" id="testimonials">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">{t('testimonials.title')}</span>
                    <h2 className="section-title">{t('testimonials.subtitle')}</h2>
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.map((review) => (
                        <div className="testimonial-card" key={review.id}>
                            <div className="stars">
                                {renderStars(review.rating)}
                            </div>
                            <p className="testimonial-text">"{reviews[review.reviewKey]?.text}"</p>
                            <div className="testimonial-author">
                                <h4>{reviews[review.reviewKey]?.author}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
