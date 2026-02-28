import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './ContentManager.css';

const ContentManager = () => {
    const { siteContent, updateContent } = useData();
    const [editLang, setEditLang] = useState('en');
    const [activeSection, setActiveSection] = useState('about');

    const contentKeys = {
        hero: ['subtitle', 'description', 'btnServices', 'btnGallery'],
        // Note: hero titles are array-based or handled differently, keeping to main text for simplicity
        about: ['title', 'storyTitle', 'p1', 'p2', 'p3', 'stats.years', 'stats.events', 'stats.flowers', 'stats.yearsValue', 'stats.eventsDesc', 'stats.flowersDesc', 'btnGetInTouch'],
        gallery: ['subtitle', 'title', 'description'],
        booking: ['title', 'subtitle', 'description'],
        footer: ['brandDesc', 'quickLinks', 'contact', 'rights', 'address1', 'address2', 'phone', 'email']
    };

    // Helper to get nested value
    const getValue = (section, path) => {
        const keys = path.split('.');
        let val = siteContent[editLang][section];
        for (const k of keys) {
            if (val) val = val[k];
        }
        return val || '';
    };

    const handleChange = (section, path, value) => {
        updateContent(editLang, section, path, value);
    };

    return (
        <div className="content-manager">
            <div className="manager-header">
                <div>
                    <h2>Content Management</h2>
                    <p className="text-muted">Edit the text content for the public website pages.</p>
                </div>
                <div className="lang-switcher">
                    <button className={editLang === 'en' ? 'active' : ''} onClick={() => setEditLang('en')}>English</button>
                    <button className={editLang === 'ne' ? 'active' : ''} onClick={() => setEditLang('ne')}>Nepali</button>
                </div>
            </div>

            <div className="manager-layout">
                <div className="section-tabs">
                    {Object.keys(contentKeys).map(section => (
                        <button
                            key={section}
                            className={`section-tab ${activeSection === section ? 'active' : ''}`}
                            onClick={() => setActiveSection(section)}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="section-content animate-fade-in">
                    <h3>Editing {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} ({editLang.toUpperCase()})</h3>
                    <div className="content-form">
                        {contentKeys[activeSection].map(keyPath => (
                            <div className="form-group" key={keyPath}>
                                <label>{keyPath}</label>
                                {keyPath.includes('description') || keyPath.includes('p1') || keyPath.includes('p2') || keyPath.includes('p3') || keyPath.includes('brandDesc') ? (
                                    <textarea
                                        rows="4"
                                        value={getValue(activeSection, keyPath)}
                                        onChange={(e) => handleChange(activeSection, keyPath, e.target.value)}
                                        className="form-control"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={getValue(activeSection, keyPath)}
                                        onChange={(e) => handleChange(activeSection, keyPath, e.target.value)}
                                        className="form-control"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentManager;
