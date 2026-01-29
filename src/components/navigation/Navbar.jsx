import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import Search from './Search';

const Navbar = () => {
    const { layoutSettings } = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Hide navbar ONLY on admin pages
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    const navLinks = [
        { id: '/expertise', label: 'Expertise' },
        { id: '/casestudy', label: 'CaseStudy' },
        { id: '/careers', label: 'Careers' },
        { id: '/about', label: 'About' },
        { id: '/contact', label: 'Contact' },
        { id: '/search', label: 'Search' },
    ];

    const { navbar } = layoutSettings;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3000,
            pointerEvents: 'none',
            width: '100%',
            height: '100px', // Navbar height
            display: 'grid',
            gridTemplateColumns: isMobile ? 'auto 1fr auto' : '1fr auto 1fr',
            alignItems: 'center',
            padding: isMobile ? '0 1.5rem 0 0' : '0 3rem 0 0'

        }}>

            {/* --- LEFT COLUMN: Logo (+ Text on Desktop) --- */}
            <div style={{
                justifySelf: 'start',
                marginLeft: isMobile ? '-10rem' : '-9rem',
                marginTop: isMobile ? '-7rem' : '-6rem', // Shifted higher for alignment
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                pointerEvents: 'auto',
                cursor: 'pointer'
            }} onClick={() => navigate('/')}>
                <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src="/logo_large.png"
                    alt="MIPL Logo"
                    style={{
                        // UPDATED: Monumental size for brand dominance
                        height: isMobile ? '160px' : '250px',
                        width: 'auto',
                        filter: 'drop-shadow(0 0 12px rgba(0, 194, 255, 0.6))'
                    }}
                />

                {/* Branding Text - Visible on Desktop */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            display: 'flex',
                            gap: '0.4rem',
                            fontSize: '1.2rem',
                            fontWeight: '500',
                            letterSpacing: '0.02em',
                            lineHeight: '1',
                            whiteSpace: 'nowrap',
                            marginLeft: '-9rem', // Corrected overlap
                            zIndex: 110,
                            position: 'relative'
                        }}
                    >
                        <span style={{ color: '#fff' }}>MicroCircuits</span>
                        <span style={{ color: '#ccc' }}>Innovations</span>
                    </motion.div>
                )}
            </div>

            {/* --- CENTER COLUMN: Navigation Capsule (Desktop Only) --- */}
            {!isMobile ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.header
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            padding: navbar.padding || '0.15rem 1.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            background: navbar.background || 'rgba(60, 60, 60, 0.4)',
                            backdropFilter: `blur(${navbar.blur || '15px'})`,
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                            pointerEvents: 'auto',
                            marginTop: '-4rem' // Shifted higher
                        }}>
                        <nav style={{
                            display: 'flex',
                            gap: '1.8rem',
                            alignItems: 'center'
                        }}>
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.id;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (link.id === '/search') {
                                                setIsSearchOpen(true);
                                            } else {
                                                navigate(link.id);
                                            }
                                        }}
                                        style={{
                                            color: isActive ? '#00c2ff' : '#ccc',
                                            textDecoration: 'none',
                                            fontSize: '0.9rem',
                                            fontWeight: isActive ? '500' : '400',
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap',
                                            textShadow: isActive ? '0 0 10px rgba(0, 194, 255, 0.4)' : 'none'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#00c2ff'}
                                        onMouseLeave={(e) => {
                                            if (!isActive) e.target.style.color = '#ccc';
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </nav>
                    </motion.header>
                </div>
            ) : (
                // Empty spacer for mobile grid
                <div />
            )}

            {/* --- RIGHT COLUMN: Slogan (Desktop) or Menu (Mobile) --- */}
            <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center' }}>
                {!isMobile ? (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            fontSize: '1rem',
                            fontWeight: '400',
                            color: '#888',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.05em',
                            marginTop: '-6rem' // Aligned with branding text
                        }}
                    >
                        Innovations. Redefined
                    </motion.div>
                ) : (
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            pointerEvents: 'auto',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            zIndex: 1100,
                            cursor: 'pointer'
                        }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobile && isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1050,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                            pointerEvents: 'auto'
                        }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
                            {navLinks.map((link, idx) => {
                                const isActive = location.pathname === link.id;
                                return (
                                    <motion.a
                                        key={link.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        href={link.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (link.id === '/search') {
                                                setIsSearchOpen(true);
                                            } else {
                                                navigate(link.id);
                                            }
                                            setIsMenuOpen(false);
                                        }}
                                        style={{
                                            color: isActive ? '#00c2ff' : '#fff',
                                            textDecoration: 'none',
                                            fontSize: '2rem',
                                            fontWeight: '600',
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        {link.label}
                                    </motion.a>
                                );
                            })}
                        </nav>
                        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600' }}>MicroCircuits</span>
                            <span style={{ color: '#b0bebe', fontSize: '1.2rem' }}>Innovations</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default Navbar;