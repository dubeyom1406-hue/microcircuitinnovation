import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { id: '/', label: 'Home' },
        { id: '/expertise', label: 'Expertise' },
        { id: '/about', label: 'About' },
        { id: '/casestudy', label: 'CaseStudy' },
        { id: '/careers', label: 'Careers' },
        { id: '/contact', label: 'Contact' },
    ];

    return (
        <div>
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 // Small delay after intro finishes
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                transition: 'all 0.3s ease'
            }}>
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <img src="/mipl_logo.jpg" alt="MIPL Logo" style={{ height: '70px', objectFit: 'contain', marginRight: '-12px', zIndex: 1 }} />
                <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>MicroCircuits</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{
                background: 'rgba(40, 40, 40, 0.6)',
                backdropFilter: 'blur(12px)',
                padding: '0.5rem 1.5rem',
                borderRadius: '40px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'center'
            }}>
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.id}
                        onClick={(e) => { e.preventDefault(); navigate(link.id); }}
                        style={{
                            color: location.pathname === link.id ? '#fff' : '#999',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            fontWeight: location.pathname === link.id ? '500' : '400',
                            transition: 'color 0.3s',
                            position: 'relative',
                            padding: '4px 0'
                        }}
                    >
                        {link.label}
                        {location.pathname === link.id && (
                            <div style={{
                                position: 'absolute',
                                bottom: -2,
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: '#00c2ff',
                                borderRadius: '2px'
                            }} />
                        )}
                    </a>
                ))}

            </nav>

            {/* Mobile menu button */}
            <div className="mobile-menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`} style={
                isMenuOpen ? {
                    position: 'fixed',
                    top: '70px',
                    left: 0,
                    right: 0,
                    background: 'rgba(0, 0, 0, 0.95)',
                    backdropFilter: 'blur(10px)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center',
                    zIndex: 999,
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                } : {
                    display: 'none'
                }
            }>
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.id}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(link.id);
                            setIsMenuOpen(false);
                        }}
                        style={{
                            color: location.pathname === link.id ? '#fff' : '#999',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: location.pathname === link.id ? '500' : '400',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            background: location.pathname === link.id ? 'rgba(0, 194, 255, 0.1)' : 'transparent'
                        }}
                    >
                        {link.label}
                    </a>
                ))}

            </nav>

            <div className="tagline mobile-hidden" style={{ color: '#666', fontSize: '0.7rem' }}>
                Innovations. Redefined
            </div>
        </motion.header>
        
        </div>
    );
};

export default Navbar;