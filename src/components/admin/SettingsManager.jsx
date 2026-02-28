import React from 'react';
import { useData } from '../../context/DataContext';
import './SettingsManager.css';

const SettingsManager = () => {
    const { siteSettings, updateSettings } = useData();

    const handleEffectChange = (e) => {
        updateSettings({ heroEffect: e.target.value });
    };

    return (
        <div className="settings-container">
            <div className="manager-header">
                <h2>Site Settings</h2>
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
