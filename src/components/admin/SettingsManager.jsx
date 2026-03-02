import React from 'react';
import { useSiteData } from '../../context/DataContext';
import './SettingsManager.css';

const SettingsManager = () => {
    const { siteSettings, updateSettings, t } = useSiteData();
    const logoInputRef = React.useRef(null);

    const handleIdentityChange = (e) => {
        const { name, value } = e.target;
        updateSettings({ [name]: value });
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        updateSettings({ logoUrl: url });
    };

    const handleClearLogo = () => {
        updateSettings({ logoUrl: null });
    };

    const handleEffectChange = (e) => {
        updateSettings({ heroEffect: e.target.value });
    };

    return (
        <div className="settings-container">
            <div className="manager-header">
                <h2>{t('footer.contact')} - {t('nav.services')}</h2>
            </div>

            {/* Brand Identity Section */}
            <div className="settings-card">
                <h3>{t('footer.settings.identityTitle')}</h3>
                <p className="settings-desc">Manage your business name, slogan, and logo.</p>

                <div className="settings-form">
                    <div className="form-group">
                        <label>{t('footer.settings.siteName')}</label>
                        <input
                            type="text"
                            name="siteName"
                            className="form-control"
                            value={siteSettings.siteName || ''}
                            onChange={handleIdentityChange}
                            placeholder="e.g., Pushparaj Wedding"
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('footer.settings.siteSubtitle')}</label>
                        <input
                            type="text"
                            name="siteSubtitle"
                            className="form-control"
                            value={siteSettings.siteSubtitle || ''}
                            onChange={handleIdentityChange}
                            placeholder="e.g., Bespoke Floral Designs"
                        />
                    </div>

                    <div className="form-group logo-group">
                        <label>{t('footer.settings.logo')}</label>
                        <div className="logo-management">
                            {siteSettings.logoUrl ? (
                                <div className="logo-preview-card">
                                    <img src={siteSettings.logoUrl} alt="Site Logo" className="logo-preview-img" />
                                    <button className="btn-clear" onClick={handleClearLogo}>×</button>
                                </div>
                            ) : (
                                <div className="logo-placeholder">No Logo Uploaded</div>
                            )}
                            <div className="logo-actions">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={logoInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleLogoUpload}
                                />
                                <button className="btn btn-outline" onClick={() => logoInputRef.current.click()}>
                                    {siteSettings.logoUrl ? t('footer.settings.uploadLogo') : 'Upload Logo'}
                                </button>
                                <p className="help-text">{t('footer.settings.logoDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-card">
                <h3>Hero Slider Configuration</h3>
                <p className="settings-desc">Choose the transition animation for the main hero background images.</p>

                <div className="settings-form">
                    <div className="form-group">
                        <label>Transition Effect</label>
                        <div className="radio-group">
                            <label className={`radio-label ${siteSettings.heroEffect === 'fade' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="heroEffect"
                                    value="fade"
                                    checked={siteSettings.heroEffect === 'fade'}
                                    onChange={handleEffectChange}
                                />
                                <span className="radio-text">Crossfade (Classic)</span>
                            </label>

                            <label className={`radio-label ${siteSettings.heroEffect === 'slide-left' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="heroEffect"
                                    value="slide-left"
                                    checked={siteSettings.heroEffect === 'slide-left'}
                                    onChange={handleEffectChange}
                                />
                                <span className="radio-text">Slide Left</span>
                            </label>

                            <label className={`radio-label ${siteSettings.heroEffect === 'slide-right' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="heroEffect"
                                    value="slide-right"
                                    checked={siteSettings.heroEffect === 'slide-right'}
                                    onChange={handleEffectChange}
                                />
                                <span className="radio-text">Slide Right</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsManager;
