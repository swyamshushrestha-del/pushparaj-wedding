import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicSite from './pages/PublicSite';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
