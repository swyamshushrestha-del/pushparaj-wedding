import React from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ImagePlus, Image as ImageIcon, Settings, LogOut, ExternalLink } from 'lucide-react';
import GalleryManager from '../components/admin/GalleryManager';
import SettingsManager from '../components/admin/SettingsManager';
import ContentManager from '../components/admin/ContentManager';
import ImageManager from '../components/admin/ImageManager';
import Overview from '../components/admin/Overview';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the current page title from the route
  const getPageTitle = () => {
    const path = location.pathname.replace('/admin', '').replace('/', '');
    const titles = {
      '': 'Overview',
      'content': 'Content Manager',
      'images': 'Image Manager',
      'gallery': 'Gallery Manager',
      'settings': 'Settings',
    };
    return titles[path] || 'Dashboard';
  };

  return (
    <div className="cpanel-layout">
      {/* Sidebar */}
      <aside className="cpanel-sidebar">
        <div className="cpanel-brand">
          <span className="brand-logo">❀</span>
          <div>
            <h2>Pushparaj Wedding</h2>
            <span className="brand-tag">CPanel</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">Dashboard</span>
          <nav className="sidebar-nav">
            <NavLink to="/admin" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">Content</span>
          <nav className="sidebar-nav">
            <NavLink to="/admin/content" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <FileText size={18} />
              <span>Text & Translations</span>
            </NavLink>
            <NavLink to="/admin/images" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <ImagePlus size={18} />
              <span>Section Images</span>
            </NavLink>
            <NavLink to="/admin/gallery" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <ImageIcon size={18} />
              <span>Photo Gallery</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">System</span>
          <nav className="sidebar-nav">
            <NavLink to="/admin/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-link footer-link" onClick={() => navigate('/')}>
            <ExternalLink size={18} />
            <span>View Live Site</span>
          </button>
          <button className="sidebar-link logout-link" onClick={() => navigate('/login')}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="cpanel-main">
        <header className="cpanel-header">
          <div className="header-left">
            <h1>{getPageTitle()}</h1>
          </div>
          <div className="header-right">
            <div className="header-profile">
              <div className="profile-avatar">A</div>
              <div className="profile-info">
                <span className="profile-name">Admin</span>
                <span className="profile-role">Owner</span>
              </div>
            </div>
          </div>
        </header>

        <div className="cpanel-body">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="images" element={<ImageManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
