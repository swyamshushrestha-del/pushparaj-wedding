import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            navigate('/admin');
        } else {
            setError('Incorrect password. Hint: Try "admin123"');
        }
    };

    return (
        <div className="login-page">
            <div className="login-bg-pattern"></div>
            <div className="login-card animate-fade-in">
                <div className="login-header">
                    <div className="login-logo">
                        <span className="logo-icon">❀</span>
                    </div>
                    <h1>Pushparaj Wedding</h1>
                    <span className="login-badge">CPanel</span>
                    <p className="login-tagline">Administration & Content Management</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    {error && <div className="error-message"><span>⚠</span> {error}</div>}

                    <div className="input-group">
                        <Lock size={18} className="input-icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoFocus
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="Enter admin password"
                        />
                        <button type="button" className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button type="submit" className="login-submit">
                        Sign In
                    </button>
                </form>

                <button className="back-link" onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> Return to Website
                </button>
            </div>
        </div>
    );
};

export default Login;
