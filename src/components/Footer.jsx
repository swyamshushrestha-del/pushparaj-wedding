import React from 'react';
import { useSiteData } from '../context/DataContext';
import './Footer.css';

const Footer = () => {
    const { t, siteSettings } = useSiteData();

    const renderFooterLogo = () => {
        if (siteSettings?.logoUrl) {
            return (
                <div className="footer-logo">
                    <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="footer-logo-img" />
                </div>
            );
        }

        const [main, ...sub] = (siteSettings?.siteName || 'Pushparaj Wedding').split(' ');

        return (
            <h2 className="footer-logo">
                <span className="logo-main">{main}</span>
                {sub.length > 0 && <span className="logo-sub">{sub.join(' ')}</span>}
            </h2>
        );
    };

    return (
        <footer className="footer" id="contact">
            <div className="container footer-content">
                <div className="footer-brand">
                    {renderFooterLogo()}
                    <p className="footer-desc">
                        {t('footer.brandDesc')}
                    </p>
                </div>

                <div className="footer-links">
                    <h4 className="footer-title">{t('footer.quickLinks')}</h4>
                    <a href="#home">{t('nav.home')}</a>
                    <a href="#services">{t('nav.services')}</a>
                    <a href="#portfolio">{t('nav.gallery')}</a>
                    <a href="#booking">{t('nav.book')}</a>
                    <a href="/login" style={{ marginTop: '0.5rem', color: 'var(--color-primary)', fontSize: '0.8rem' }}>{t('nav.admin')}</a>
                </div>

                <div className="footer-contact">
                    <h4 className="footer-title">{t('footer.contact')}</h4>
                    <p>{t('footer.address1')}</p>
                    <p>{t('footer.address2')}</p>
                    <p>{t('footer.phone')}</p>
                    <p>{t('footer.email')}</p>
                </div>
            </div>

            <div className="footer-bottom text-center">
                <p>&copy; {new Date().getFullYear()} Pushparaj Wedding. {t('footer.rights')}</p>
            </div>
        </footer>
    );
};

export default Footer;
