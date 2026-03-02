import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicSite from './pages/PublicSite';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useData } from './context/DataContext';
import './App.css';

function App() {
  const { siteSettings } = useData();

  // Sync site identity with browser tab
  React.useEffect(() => {
    const { siteName, siteSubtitle, logoUrl } = siteSettings;
    if (siteName) {
      document.title = siteSubtitle ? `${siteName} | ${siteSubtitle}` : siteName;
    }

    // Update favicon if logo exists
    if (logoUrl) {
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = logoUrl;
      }
    }
  }, [siteSettings]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
