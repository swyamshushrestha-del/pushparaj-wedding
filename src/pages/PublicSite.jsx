import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Booking from '../components/Booking';
import Footer from '../components/Footer';

const PublicSite = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <About />
                <Testimonials />
                <Gallery />
                <Booking />
            </main>
            <Footer />
        </div>
    );
};

export default PublicSite;
