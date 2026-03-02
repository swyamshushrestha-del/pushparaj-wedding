import React from 'react';
import { useSiteData } from '../../context/DataContext';
import { Image, FileText, Calendar, Users, TrendingUp, Eye, Clock } from 'lucide-react';
import './Overview.css';

const Overview = () => {
    const { galleryImages, siteContent } = useSiteData();

    // Mock data for the dashboard
    const stats = [
        { label: 'Gallery Images', value: galleryImages.length, icon: <Image size={22} />, color: '#c9a87c', trend: '+3 this month' },
        { label: 'Content Sections', value: 5, icon: <FileText size={22} />, color: '#6366f1', trend: 'Hero, About, Gallery, Booking, Footer' },
        { label: 'Bookings', value: 24, icon: <Calendar size={22} />, color: '#10b981', trend: '+8 this week' },
        { label: 'Page Views', value: '1.2K', icon: <Eye size={22} />, color: '#f59e0b', trend: '+12% vs last month' },
    ];

    const recentActivity = [
        { action: 'Gallery image added', detail: 'New reception stage photo uploaded', time: '2 hours ago', type: 'gallery' },
        { action: 'Content updated', detail: 'About section title changed to "Our Journey"', time: '3 hours ago', type: 'content' },
        { action: 'New booking request', detail: 'Reception event - Aayusha & Ramesh', time: '5 hours ago', type: 'booking' },
        { action: 'Language added', detail: 'Nepali translations completed for all sections', time: '1 day ago', type: 'content' },
        { action: 'Image replaced', detail: 'Hero slider image 2 updated', time: '1 day ago', type: 'gallery' },
        { action: 'Settings changed', detail: 'Hero effect switched to slide-left', time: '2 days ago', type: 'settings' },
    ];

    const upcomingEvents = [
        { name: 'Sharma Wedding Reception', date: '२०८२ फागुन २०', type: 'Reception' },
        { name: 'Thapa Engagement', date: '२०८२ चैत ५', type: 'Engagement' },
        { name: 'Poudel Wedding Ceremony', date: '२०८२ चैत १२', type: 'Wedding' },
    ];

    // Simple bar chart data (monthly bookings)
    const monthlyData = [
        { month: 'Mag', value: 5 },
        { month: 'Fal', value: 8 },
        { month: 'Cha', value: 12 },
        { month: 'Bai', value: 18 },
        { month: 'Jes', value: 22 },
        { month: 'Asa', value: 15 },
    ];
    const maxValue = Math.max(...monthlyData.map(d => d.value));

    return (
        <div className="overview">
            {/* Stats Cards */}
            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div className="stat-card" key={i}>
                        <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-trend">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts and Activity Row */}
            <div className="dashboard-row">
                {/* Monthly Bookings Chart */}
                <div className="dashboard-card chart-card">
                    <div className="card-header">
                        <h3><TrendingUp size={18} /> Monthly Bookings</h3>
                        <span className="card-badge">Last 6 months</span>
                    </div>
                    <div className="bar-chart">
                        {monthlyData.map((d, i) => (
                            <div className="bar-col" key={i}>
                                <div className="bar-wrapper">
                                    <div
                                        className="bar"
                                        style={{ height: `${(d.value / maxValue) * 100}%` }}
                                    >
                                        <span className="bar-value">{d.value}</span>
                                    </div>
                                </div>
                                <span className="bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3><Calendar size={18} /> Upcoming Events</h3>
                        <span className="card-badge">{upcomingEvents.length} scheduled</span>
                    </div>
                    <div className="events-list">
                        {upcomingEvents.map((event, i) => (
                            <div className="event-item" key={i}>
                                <div className="event-dot"></div>
                                <div className="event-info">
                                    <strong>{event.name}</strong>
                                    <span>{event.date}</span>
                                </div>
                                <span className={`event-type type-${event.type.toLowerCase()}`}>{event.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card full-width">
                <div className="card-header">
                    <h3><Clock size={18} /> Recent Activity</h3>
                </div>
                <div className="activity-list">
                    {recentActivity.map((item, i) => (
                        <div className="activity-item" key={i}>
                            <div className={`activity-dot dot-${item.type}`}></div>
                            <div className="activity-info">
                                <strong>{item.action}</strong>
                                <span>{item.detail}</span>
                            </div>
                            <span className="activity-time">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Overview;
