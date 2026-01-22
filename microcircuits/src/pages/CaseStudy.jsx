import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


const CaseStudy = () => {
    // Static data for case studies
    const contextStudies = [
        {
            id: 1,
            category: "Design For Testability",
            title: "Optimizing Fault Coverage for 7nm Automotive SOC",
            description: "How we achieved 99.5% stuck-at coverage while reducing test time by 30%.",
            date: "10th Jan 2026",
            pdfUrl: "#"
        },
        {
            id: 2,
            category: "Physical Design",
            title: "Tape-Out Success: High-Speed AI Accelerator",
            description: "Meeting aggressive timing targets for a 2GHz AI processing unit in 5nm node.",
            date: "15th Jan 2026",
            pdfUrl: "#"
        },
        {
            id: 3,
            category: "Design & Verification",
            title: "Formal Verification of Multi-Core Cache Controller",
            description: "Reducing verification cycle by 40% using advanced formal property checking.",
            date: "20th Jan 2026",
            pdfUrl: "#"
        }
    ];
    const [sortBy, setSortBy] = useState('Newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const studiesPerPage = 6; // Number of studies to display per page

    // Animation State
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        // Intro Timer
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000); // 2 seconds centered

        return () => clearTimeout(timer);
    }, []);

    // Use all studies without pre-sorting since we'll sort during pagination
    const allStudies = contextStudies || [];
    
    // Sort studies based on current sort order
    const sortedStudies = allStudies.sort((a, b) => {
        if (sortBy === 'Newest') {
            return new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, '$1')) - new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, '$1'));
        } else {
            return new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, '$1')) - new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, '$1'));
        }
    });
    
    // Pagination logic
    const totalPages = Math.ceil(sortedStudies.length / studiesPerPage);
    const indexOfLastStudy = currentPage * studiesPerPage;
    const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
    const studies = sortedStudies.slice(indexOfFirstStudy, indexOfLastStudy);

    return (
        <div style={{ padding: '4rem 1rem 2rem', minHeight: '100vh', background: '#000', color: '#fff', fontFamily: '"Outfit", sans-serif', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
            <div className="container mobile-responsive-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>

                <AnimatePresence mode="popLayout">
                    {showIntro && (
                        <motion.div
                            key="intro-bg"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 90,
                                background: 'black'
                            }}
                        />
                    )}
                </AnimatePresence>

                {showIntro ? (
                    // INTRO STATE: CENTERED TEXT
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', padding: '2rem' }}>
                        <motion.div layoutId="hero-text" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem', color: '#fff' }}>
                                From RTL to Tape-Out:
                            </p>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
                                <span style={{
                                    background: 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginRight: '0.8rem'
                                }}>Real</span>
                                stories from the ASIC Frontlines
                            </h1>
                        </motion.div>
                    </div>
                ) : (
                    // FINAL CONTENT STATE
                    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 1rem 2rem' }}>
                        {/* Hero Section */}
                        <header style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
                            <motion.div
                                layoutId="hero-text"
                                transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                                style={{ display: 'inline-block', textAlign: 'center' }}
                            >
                                <p style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem', color: '#fff' }}>
                                    From RTL to Tape-Out:
                                </p>
                                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
                                    <span style={{
                                        background: 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        marginRight: '0.8rem'
                                    }}>Real</span>
                                    stories from the ASIC Frontlines
                                </h1>
                            </motion.div>

                            {/* Sort Section - Absolute positioned on desktop, stacked on mobile */}
                            <div style={{ position: 'relative', width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                            </div>
                        </header>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            {/* Sort Row - Similar to Careers page */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', position: 'relative', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>Sort By:</span>
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setIsSortOpen(!isSortOpen)}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid #333',
                                                color: '#fff',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = 'rgba(255,255,255,0.1)';
                                                e.target.style.borderColor = '#00c2ff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'transparent';
                                                e.target.style.borderColor = '#333';
                                            }}
                                        >
                                            <span>{sortBy === 'Newest' ? 'Newest' : 'Oldest'}</span>
                                            <ChevronDown 
                                                size={16} 
                                                style={{ 
                                                    transform: isSortOpen ? 'rotate(180deg)' : 'none',
                                                    transition: 'transform 0.3s ease'
                                                }} 
                                            />
                                        </button>
                                        
                                        {isSortOpen && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid #333',
                                                borderRadius: '20px',
                                                padding: '0.5rem 0',
                                                minWidth: '100%',
                                                zIndex: 10,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                                            }}>
                                                <div
                                                    onClick={() => {
                                                        setSortBy('Newest');
                                                        setIsSortOpen(false);
                                                        setCurrentPage(1); // Reset to first page when sort changes
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        cursor: 'pointer',
                                                        color: sortBy === 'Newest' ? '#00c2ff' : '#fff',
                                                        backgroundColor: sortBy === 'Newest' ? 'rgba(0,194,255,0.1)' : 'transparent',
                                                        transition: 'all 0.2s ease',
                                                        textAlign: 'left',
                                                        borderRadius: '20px',
                                                        margin: '0 0.2rem'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                                    onMouseLeave={(e) => {
                                                        if (sortBy !== 'Newest') {
                                                            e.target.style.backgroundColor = 'transparent';
                                                        }
                                                    }}
                                                >
                                                    Newest
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setSortBy('Oldest');
                                                        setIsSortOpen(false);
                                                        setCurrentPage(1); // Reset to first page when sort changes
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        cursor: 'pointer',
                                                        color: sortBy === 'Oldest' ? '#00c2ff' : '#fff',
                                                        backgroundColor: sortBy === 'Oldest' ? 'rgba(0,194,255,0.1)' : 'transparent',
                                                        transition: 'all 0.2s ease',
                                                        textAlign: 'left',
                                                        borderRadius: '20px',
                                                        margin: '0 0.2rem'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                                    onMouseLeave={(e) => {
                                                        if (sortBy !== 'Oldest') {
                                                            e.target.style.backgroundColor = 'transparent';
                                                        }
                                                    }}
                                                >
                                                    Oldest
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1rem',
                                marginBottom: '2rem'
                            }}>
                                {studies.map((study, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            style={{
                                                background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.95) 100%)',
                                                borderRadius: '24px',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                padding: '3rem 2rem 5rem 2rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                backdropFilter: 'blur(10px)',
                                                position: 'relative',
                                                minHeight: '380px',
                                                overflow: 'hidden',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
                                            }}
                                        >
                                            {/* Glass highlight effect at top */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: '15%',
                                                right: '15%',
                                                height: '1px',
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }} />

                                            <p style={{
                                                fontSize: '0.85rem',
                                                color: '#ccc',
                                                marginBottom: '1.5rem',
                                                fontWeight: 500,
                                                letterSpacing: '0.5px'
                                            }}>
                                                {study.category}
                                            </p>

                                            <h3 style={{
                                                fontSize: '1.8rem',
                                                fontWeight: 700,
                                                lineHeight: 1.25,
                                                marginBottom: '1rem',
                                                color: '#fff',
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {study.title}
                                            </h3>

                                            <p style={{ fontSize: '0.8rem', color: '#888', margin: '0 0 2rem', fontWeight: 500 }}>
                                                {study.date}
                                            </p>

                                            {/* Download Button */}
                                            <motion.button
                                                whileHover={{ height: '55px' }}
                                                style={{
                                                    height: '48px',
                                                    background: 'linear-gradient(90deg, #0076fe 0%, #0056b1 100%)',
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    width: '100%',
                                                    borderRadius: '0 0 24px 24px',
                                                    border: 'none',
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'height 0.3s ease'
                                                }}
                                            >
                                                Download
                                            </motion.button>
                                        </motion.div>
                                    ))}
                            </div>

                            {/* Functional Pagination */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', color: '#666', fontSize: '1.2rem', fontWeight: 500 }}>
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                        background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: currentPage === 1 ? '#444' : '#fff',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontWeight: 500
                                    }}
                                    onMouseEnter={(e) => {
                                        if (currentPage > 1) {
                                            e.target.style.background = 'rgba(255,255,255,0.2)';
                                            e.target.style.borderColor = '#00c2ff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (currentPage > 1) {
                                            e.target.style.background = 'rgba(255,255,255,0.1)';
                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }
                                    }}
                                >
                                    Previous
                                </button>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#00c2ff' }}>{indexOfFirstStudy + 1}-</span>
                                    <span>{Math.min(indexOfLastStudy, sortedStudies.length)}</span>
                                    <span style={{ margin: '0 10px', color: '#444' }}>of</span>
                                    <span>{sortedStudies.length}</span>
                                </div>
                                
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: currentPage === totalPages ? '#444' : '#fff',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontWeight: 500
                                    }}
                                    onMouseEnter={(e) => {
                                        if (currentPage < totalPages) {
                                            e.target.style.background = 'rgba(255,255,255,0.2)';
                                            e.target.style.borderColor = '#00c2ff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (currentPage < totalPages) {
                                            e.target.style.background = 'rgba(255,255,255,0.1)';
                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

const arrowCircleStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
};

export default CaseStudy;
