import React, { createContext, useState, useEffect, useContext } from 'react';
import img1 from '../assets/hero_floral_decor_1772272455981.png';
import img2 from '../assets/nepali_wedding_decor_1772272507827.png';
import img3 from '../assets/reception_decor_1772272550435.png';
import { translations } from './translations';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Gallery Images
    const defaultGalleryImages = [
        { id: 1, src: img1, alt: 'Grand Arch Decor', title: 'Grand Floral Archway' },
        { id: 2, src: img2, alt: 'Nepali Mandap', title: 'Traditional Nepali Mandap' },
        { id: 3, src: img3, alt: 'Reception Stage', title: 'Modern Reception Stage' },
    ];

    const [galleryImages, setGalleryImages] = useState(() => {
        const savedData = localStorage.getItem('pushparaj_gallery');
        return savedData ? JSON.parse(savedData) : defaultGalleryImages;
    });

    // Site Images (Hero slides, About section)
    const defaultSiteImages = {
        hero: [img1, img2, img3],
        about: img2
    };

    const [siteImages, setSiteImages] = useState(() => {
        const savedData = localStorage.getItem('pushparaj_site_images');
        return savedData ? JSON.parse(savedData) : defaultSiteImages;
    });

    // Site Settings
    const [siteSettings, setSiteSettings] = useState(() => {
        const savedSettings = localStorage.getItem('pushparaj_settings');
        return savedSettings ? JSON.parse(savedSettings) : {
            heroEffect: 'fade',
            siteName: 'Pushparaj Wedding',
            siteSubtitle: 'Bespoke Floral Designs',
            logoUrl: null
        };
    });

    // Language
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('pushparaj_language') || 'en';
    });

    // Site Content (Text/Translations)
    const [siteContent, setSiteContent] = useState(() => {
        const savedContent = localStorage.getItem('pushparaj_site_content');
        return savedContent ? JSON.parse(savedContent) : translations;
    });

    // Persist to LocalStorage
    useEffect(() => {
        localStorage.setItem('pushparaj_gallery', JSON.stringify(galleryImages));
    }, [galleryImages]);

    useEffect(() => {
        localStorage.setItem('pushparaj_site_images', JSON.stringify(siteImages));
    }, [siteImages]);

    useEffect(() => {
        localStorage.setItem('pushparaj_settings', JSON.stringify(siteSettings));
    }, [siteSettings]);

    useEffect(() => {
        localStorage.setItem('pushparaj_language', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('pushparaj_site_content', JSON.stringify(siteContent));
    }, [siteContent]);

    // Updater Functions
    const addImage = (newImage) => {
        const newId = galleryImages.length > 0 ? Math.max(...galleryImages.map(img => img.id)) + 1 : 1;
        setGalleryImages([...galleryImages, { ...newImage, id: newId }]);
    };

    const removeImage = (id) => {
        setGalleryImages(galleryImages.filter(img => img.id !== id));
    };

    const updateSettings = (newSettings) => {
        setSiteSettings(prev => ({ ...prev, ...newSettings }));
    };

    const updateSiteImage = (section, imageUrl, index = null) => {
        setSiteImages(prev => {
            const newState = { ...prev };
            if (index !== null && Array.isArray(newState[section])) {
                newState[section] = [...newState[section]];
                newState[section][index] = imageUrl;
            } else {
                newState[section] = imageUrl;
            }
            return newState;
        });
    };

    const updateContent = (lang, section, objOrKey, value = null) => {
        setSiteContent(prev => {
            const newState = { ...prev };

            if (typeof objOrKey === 'object') {
                // Bulk update section
                newState[lang][section] = { ...newState[lang][section], ...objOrKey };
            } else if (typeof objOrKey === 'string') {
                // Update nested key (e.g. "stats.yearsValue")
                const keys = objOrKey.split('.');
                let current = newState[lang][section];
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) current[keys[i]] = {};
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
            }
            return newState;
        });
    };

    // Helper translation function
    const t = (key) => {
        const keys = key.split('.');
        let value = siteContent[language];
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // return the key itself if not found
            }
        }
        return value;
    };

    return (
        <DataContext.Provider value={{
            galleryImages, addImage, removeImage,
            siteImages, updateSiteImage,
            siteSettings, updateSettings,
            language, setLanguage,
            siteContent, updateContent, t
        }}>
            {children}
        </DataContext.Provider>
    );
};
