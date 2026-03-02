import React, { useRef } from 'react';
import { useSiteData } from '../../context/DataContext';
import './ImageManager.css';

const ImageManager = () => {
    const { siteImages, updateSiteImage } = useSiteData();
    const heroRefs = [useRef(null), useRef(null), useRef(null)];
    const aboutRef = useRef(null);

    const handleImageUpload = (section, index, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        if (index !== null) {
            updateSiteImage(section, url, index);
        } else {
            updateSiteImage(section, url);
        }
    };

    return (
        <div className="image-manager">
            <div className="manager-header">
                <div>
                    <h2>Image Management</h2>
                    <p className="text-muted">Update pictures for Hero slider and About section. Changes appear instantly on the public site.</p>
                </div>
            </div>

            {/* Hero Section Images */}
            <div className="image-section">
                <h3>🖼️ Hero Slider Images</h3>
                <p className="section-desc">These three images rotate in the background of the main hero banner.</p>
                <div className="image-grid">
                    {siteImages.hero.map((img, i) => (
                        <div className="image-card" key={i}>
                            <div className="image-preview">
                                <img src={img} alt={`Hero slide ${i + 1}`} />
                                <div className="image-label">Slide {i + 1}</div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={heroRefs[i]}
                                style={{ display: 'none' }}
                                onChange={(e) => handleImageUpload('hero', i, e)}
                            />
                            <button className="btn btn-outline upload-btn" onClick={() => heroRefs[i].current.click()}>
                                📤 Replace Image
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* About Section Image */}
            <div className="image-section">
                <h3>📷 About Section Image</h3>
                <p className="section-desc">This image appears next to the "Our Story" section on the main page.</p>
                <div className="image-grid single">
                    <div className="image-card large">
                        <div className="image-preview">
                            <img src={siteImages.about} alt="About section" />
                            <div className="image-label">About Image</div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={aboutRef}
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageUpload('about', null, e)}
                        />
                        <button className="btn btn-outline upload-btn" onClick={() => aboutRef.current.click()}>
                            📤 Replace Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageManager;
