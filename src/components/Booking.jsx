import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import './Booking.css';

const Booking = () => {
    const { t, language } = useData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: 'reception',
        date: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDate = ({ bsDate, adDate }) => {
        setFormData({ ...formData, date: bsDate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! We will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', eventType: 'reception', date: '', message: '' });
    };

    return (
        <section className="booking section-padding" id="booking">
            <div className="container">
                <div className="booking-wrapper">
                    <div className="booking-info">
                        <span className="section-subtitle">{t('booking.title')}</span>
                        <h2 className="section-title">{t('booking.subtitle')}</h2>
                        <p className="booking-desc">
                            {t('booking.description')}
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="icon">📍</span>
                                <div>
                                    <strong>{t('booking.contact.studioTitle')}</strong>
                                    <p>{t('booking.contact.studioDesc')}</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="icon">📍</span>
                                <div>
                                    <strong>{t('booking.contact.officeTitle')}</strong>
                                    <p>{t('booking.contact.officeDesc')}</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="icon">📞</span>
                                <div>
                                    <strong>{t('booking.contact.phoneTitle')}</strong>
                                    <p>+977 123 456 7890</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="booking-form-wrapper">
                        <form className="booking-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">{t('booking.labels.name')}</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t('booking.placeholders.name')} required />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">{t('booking.labels.email')}</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('booking.placeholders.email')} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">{t('booking.labels.phone')}</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('booking.placeholders.phone')} required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="eventType">{t('booking.labels.eventType')}</label>
                                    <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange}>
                                        <option value="reception">{t('booking.eventTypes.reception')}</option>
                                        <option value="nepali_wedding">{t('booking.eventTypes.wedding')}</option>
                                        <option value="engagement">{t('booking.eventTypes.engagement')}</option>
                                        <option value="other">{t('booking.eventTypes.other')}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">{t('booking.labels.date')}</label>
                                    <Calendar
                                        onChange={handleDate}
                                        language={language === 'ne' ? 'ne' : 'en'}
                                        theme="default"
                                        className="form-control"
                                        hideDefaultValue={true}
                                        placeholder={t('booking.labels.date')}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">{t('booking.labels.vision')}</label>
                                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder={t('booking.placeholders.vision')}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn">{t('booking.btnSubmit')}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
