import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t, siteSettings } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ne' : 'en');
  };

  const renderLogo = () => {
    if (siteSettings?.logoUrl) {
      return (
        <a href="#" className="logo">
          <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="nav-logo-img" />
        </a>
      );
    }

    const [main, ...sub] = (siteSettings?.siteName || 'Pushparaj Wedding').split(' ');

    return (
      <a href="#" className="logo">
        <span className="logo-main">{main}</span>
        {sub.length > 0 && <span className="logo-sub">{sub.join(' ')}</span>}
      </a>
    );
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {renderLogo()}

        <nav className="nav-links">
          <a href="#services">{t('nav.services')}</a>
          <a href="#portfolio">{t('nav.gallery')}</a>
          <a href="#about">{t('nav.about')}</a>
          <a href="#booking" className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', marginLeft: '1rem' }}>{t('nav.book')}</a>
          <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
            {language === 'en' ? 'NP' : 'EN'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
