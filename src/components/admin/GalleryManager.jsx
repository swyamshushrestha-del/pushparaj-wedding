import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import './GalleryManager.css';

const GalleryManager = () => {
    const { galleryImages, addImage, removeImage } = useSiteData();
    const [newImageObj, setNewImageObj] = useState({ title: '', src: '', alt: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [uploadType, setUploadType] = useState('url'); // 'url' or 'local'

    const handleAddImage = (e) => {
        e.preventDefault();
        if (newImageObj.src && newImageObj.title) {
            addImage({
                ...newImageObj,
                alt: newImageObj.alt || newImageObj.title
            });
            setNewImageObj({ title: '', src: '', alt: '' });
            setIsAdding(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImageObj({ ...newImageObj, src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Gallery Portfolio</h2>
                <button className="btn btn-primary add-btn" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancel' : <><Plus size={18} /> Add New Image</>}
                </button>
            </div>

            {isAdding && (
                <div className="add-form-card">
                    <h3>Add New Image</h3>
                    <form onSubmit={handleAddImage} className="admin-form">
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>Image Source</label>
                            <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        checked={uploadType === 'url'}
                                        onChange={() => setUploadType('url')}
                                    />
                                    <span style={{ marginLeft: '0.5rem' }}>Web URL</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        checked={uploadType === 'local'}
                                        onChange={() => setUploadType('local')}
                                    />
                                    <span style={{ marginLeft: '0.5rem' }}>Upload Local File</span>
                                </label>
                            </div>
                        </div>

                        {uploadType === 'url' ? (
                            <div className="form-group">
                                <label>Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={uploadType === 'url' ? newImageObj.src : ''}
                                    onChange={(e) => setNewImageObj({ ...newImageObj, src: e.target.value })}
                                    required={uploadType === 'url'}
                                />
                            </div>
                        ) : (
                            <div className="form-group">
                                <label>Select Image File</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required={uploadType === 'local'}
                                    style={{ padding: '0.5rem 0', border: 'none' }}
                                />
                                {newImageObj.src && uploadType === 'local' && (
                                    <div style={{ marginTop: '1rem', height: '100px', borderRadius: '4px', overflow: 'hidden' }}>
                                        <img src={newImageObj.src} alt="Preview" style={{ height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="form-group">
                            <label>Title / Caption</label>
                            <input
                                type="text"
                                placeholder="e.g., Grand Engagement Stage"
                                value={newImageObj.title}
                                onChange={(e) => setNewImageObj({ ...newImageObj, title: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Image</button>
                    </form>
                </div>
            )}

            <div className="manager-grid">
                {galleryImages.map((img) => (
                    <div className="admin-gallery-card" key={img.id}>
                        <div className="admin-img-wrapper">
                            <img src={img.src} alt={img.alt} />
                        </div>
                        <div className="admin-card-content">
                            <h4>{img.title}</h4>
                            <button className="delete-btn" onClick={() => removeImage(img.id)} title="Remove Image">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryManager;
