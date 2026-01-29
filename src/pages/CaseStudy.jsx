import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const CaseStudy = () => {
    // 1. Get Data from Context
    const { caseStudies: contextStudies } = useAdmin();

    // 2. State Management
    const [sortBy, setSortBy] = useState('Newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const studiesPerPage = 8;
    const [showIntro, setShowIntro] = useState(true);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (direction) => {
        const next = document.getElementById('studies-section');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    };

    // Data Source
    const studies = contextStudies && contextStudies.length > 0 ? contextStudies : [
        {
            id: 1,
            title: "5nm Automotive SoC Success",
            category: "Automotive",
            date: "2025-01-15",
            image: "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=2832&auto=format&fit=crop",
            description: "Achieved first-pass silicon success for a mission-critical ADAS chip using advanced DFT methodologies.",
            pdfUrl: "#"
        },
        {
            id: 2,
            title: "HPC Processor Power Optimization",
            category: "HPC",
            date: "2024-11-20",
            image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2940&auto=format&fit=crop",
            description: "Reduced dynamic power by 30% in a high-performance computing cluster through novel clock gating strategies.",
            pdfUrl: "#"
        },
        {
            id: 3,
            title: "AI Accelerator Physical Design",
            category: "AI/ML",
            date: "2024-10-05",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop",
            description: "Delivered a 350mm² AI training chip at 3nm node, meeting aggressive timing closure targets.",
            pdfUrl: "#"
        }
    ];

    // Sorting
    const sortedStudies = [...studies].sort((a, b) => {
        if (sortBy === 'Newest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'Oldest') return new Date(a.date) - new Date(b.date);
        return 0;
    });

    // Pagination
    const indexOfLastStudy = currentPage * studiesPerPage;
    const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
    const currentStudies = sortedStudies.slice(indexOfFirstStudy, indexOfLastStudy);
    const totalPages = Math.ceil(sortedStudies.length / studiesPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        document.getElementById('studies-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: '"Outfit", sans-serif', paddingBottom: '100px' }}
        >
            {/* Intro Overlay */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{ fontSize: '4rem', fontWeight: 700, letterSpacing: '-2px' }}
                        >
                            Case<span style={{ color: '#00c2ff' }}>Studies</span>
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Hero Section */}
                <section id="hero-section" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '120px', textAlign: 'center' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontSize: isMobile ? '2.5rem' : 'clamp(2rem, 8vw, 4rem)',
                            fontWeight: 600,
                            letterSpacing: '-1px',
                            lineHeight: 1.1,
                            marginBottom: '0.5rem'
                        }}
                    >
                        Proven Results. <span style={{ color: '#00c2ff' }}>Silicon Success.</span>
                    </motion.h1>
                    <p style={{ fontSize: '1.2rem', color: '#888', maxWidth: '600px', margin: '1rem auto', lineHeight: 1.6 }}>
                        Explore how we help global semiconductor leaders overcome their toughest design challenges.
                    </p>

                    {/* Scroll Down Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}
                        onClick={() => scrollToSection('down')}
                    >
                        <div style={arrowCircleStyle}>
                            <ChevronDown size={24} color="#fff" />
                        </div>
                    </motion.div>
                </section>

                {/* Filter & Sort Bar */}
                <div id="studies-section" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '1.1rem', color: '#888' }}>
                        Showing <span style={{ color: '#fff', fontWeight: 600 }}>{currentStudies.length}</span> of <span style={{ color: '#fff', fontWeight: 600 }}>{sortedStudies.length}</span> case studies
                    </div>

                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '8px',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            Sort by: {sortBy} <ChevronDown size={16} />
                        </button>

                        <AnimatePresence>
                            {isSortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '110%',
                                        background: '#1a1a1a',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        width: '150px',
                                        zIndex: 10,
                                        overflow: 'hidden'
                                    }}
                                >
                                    {['Newest', 'Oldest'].map(option => (
                                        <div
                                            key={option}
                                            onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                                            style={{
                                                padding: '0.8rem 1rem',
                                                cursor: 'pointer',
                                                color: sortBy === option ? '#00c2ff' : '#fff',
                                                background: sortBy === option ? 'rgba(0, 194, 255, 0.05)' : 'transparent',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={(e) => e.target.style.background = sortBy === option ? 'rgba(0, 194, 255, 0.05)' : 'transparent'}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- CARD GRID --- */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    <AnimatePresence mode='wait'>
                        {currentStudies.map((study, index) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    background: 'linear-gradient(180deg, #3c3c3c, #2b2b2b)',
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'transform 0.3s ease',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {/* Image Section */}
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        left: '1rem',
                                        background: 'rgba(0,0,0,0.6)',
                                        backdropFilter: 'blur(4px)',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        color: '#fff',
                                        zIndex: 2,
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {study.category}
                                    </div>
                                    <img
                                        src={study.image || "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=2832&auto=format&fit=crop"}
                                        alt={study.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => e.target.src = "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=2832&auto=format&fit=crop"}
                                    />
                                </div>

                                {/* Content Section */}
                                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                                        {new Date(study.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                    <h3 style={{
                                        fontSize: '26px',
                                        fontWeight: '700',
                                        marginBottom: '14px',
                                        lineHeight: '1.2',
                                        color: '#fff'
                                    }}>
                                        {study.title}
                                    </h3>
                                    <p style={{
                                        color: '#cfcfcf',
                                        fontSize: '15px',
                                        marginBottom: '30px',
                                        flex: 1,
                                        lineHeight: 1.5
                                    }}>
                                        {study.description}
                                    </p>

                                    {/* --- FIX: DIRECT LINK (No Script Blocking) --- */}
                                    <a
                                        href={study.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: '#0a78ff',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '50px',
                                            padding: '12px 24px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            textDecoration: 'none', // Remove link underline
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            whiteSpace: 'nowrap',
                                            width: 'fit-content',
                                            alignSelf: 'flex-start'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        Download PDF <Download size={18} />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '6rem' }}>
                        <div
                            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: currentPage > 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: currentPage > 1 ? 'pointer' : 'default',
                                opacity: currentPage > 1 ? 1 : 0.5,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <ChevronLeft size={24} color="#fff" />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
                            <span style={{ color: '#00c2ff' }}>{currentPage}</span> / <span style={{ color: '#666' }}>{totalPages}</span>
                        </div>

                        <div
                            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: currentPage < totalPages ? 'rgba(0, 194, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: currentPage < totalPages ? 'pointer' : 'default',
                                border: currentPage < totalPages ? '1px solid rgba(0, 194, 255, 0.2)' : 'none',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease',
                                opacity: currentPage < totalPages ? 1 : 0.5
                            }}
                            onMouseEnter={(e) => {
                                if (currentPage < totalPages) {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.2)';
                                    e.currentTarget.style.borderColor = '#00c2ff';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentPage < totalPages) {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.2)';
                                }
                            }}
                        >
                            <ChevronRight size={24} color={currentPage < totalPages ? "#00c2ff" : "#fff"} />
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
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






























/*
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


import { useAdmin } from '../context/AdminContext';

const CaseStudy = () => {
    const { caseStudies: contextStudies, loading: adminLoading } = useAdmin();
    const [sortBy, setSortBy] = useState('Newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [direction, setDirection] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const studiesPerPage = 8;
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        // Intro Timer
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (direction) => {
        const sections = ['hero-section', 'studies-section'];
        const currentPos = window.scrollY;

        const sectionOffsets = sections.map(id => {
            const el = document.getElementById(id);
            return el ? el.offsetTop : 0;
        });

        if (direction === 'down') {
            const next = sectionOffsets.find(offset => offset > currentPos + 50);
            if (next !== undefined) window.scrollTo({ top: next, behavior: 'smooth' });
        } else {
            const prev = [...sectionOffsets].reverse().find(offset => offset < currentPos - 50);
            if (prev !== undefined) window.scrollTo({ top: prev, behavior: 'smooth' });
        }
    };

    // Use all studies without pre-sorting since we'll sort during pagination
    // Use studies from AdminContext
    const allStudies = (contextStudies || []).map(s => ({
        ...s,
        id: s._id || s.id,
        date: s.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }));

    // Sort studies based on current sort order
    const sortedStudies = allStudies.sort((a, b) => {
        // Prefer createdAt for sorting
        if (a.createdAt && b.createdAt) {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return sortBy === 'Newest' ? timeB - timeA : timeA - timeB;
        }

        // Helper function to parse date string
        const parseDate = (dateStr) => {
            try {
                // Remove ordinal suffixes (st, nd, rd, th) and convert to date
                const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
                return new Date(cleanDate);
            } catch (e) {
                console.warn('Date parsing error:', e);
                return new Date(0);
            }
        };

        if (sortBy === 'Newest') {
            return parseDate(b.date) - parseDate(a.date);
        } else {
            return parseDate(a.date) - parseDate(b.date);
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedStudies.length / studiesPerPage);
    const indexOfFirstStudy = (currentPage - 1) * studiesPerPage;
    const indexOfLastStudy = indexOfFirstStudy + studiesPerPage;
    const studies = sortedStudies.slice(indexOfFirstStudy, indexOfLastStudy);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentPage(prev => {
            if (newDirection === 1) return Math.min(totalPages, prev + 1);
            return Math.max(1, prev - 1);
        });
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.98,
            filter: 'blur(10px)'
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.98,
            filter: 'blur(10px)'
        })
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ padding: '4rem 1rem 2rem', minHeight: '100vh', background: '#000', color: '#fff', fontFamily: '"Outfit", sans-serif', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}
        >
            <div className="container mobile-responsive-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>

    //             {... (keep Intro AnimatePresence) }
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
                    // ... (Keep Intro Content)
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
  //                      { ... (Keep Header) }
                        <header id="hero-section" style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
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

  //                          { Sort Section }
                            <div style={{ position: 'relative', width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                            </div>
                        </header>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
   //                         { ... (Keep Sort Row) }
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
                                                        if (currentPage !== 1) paginate(1 - currentPage); // Reset 
                                                        else setCurrentPage(1);
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
                                                        if (currentPage !== 1) paginate(1 - currentPage); // Reset
                                                        else setCurrentPage(1);
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

   //                         { Grid with Animation }
                            <div style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
                                <AnimatePresence initial={false} custom={direction} mode="wait">
                                    <motion.div
                                        key={currentPage}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
                                            opacity: { duration: 0.4, ease: "circOut" },
                                            scale: { duration: 0.4, ease: "circOut" },
                                            filter: { duration: 0.4, ease: "circOut" }
                                        }}
                                        id="studies-section"
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                            gap: '1rem',
                                            marginBottom: '2rem',
                                            width: '100%'
                                        }}
                                    >
                                        {studies.map((study, index) => (
                                            <motion.div
                                                key={study.id || study.title}
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
     //                                           { Glass highlight effect at top }
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

    //                                            { Download Button }
                                                <motion.button
                                                    whileHover={{ height: '55px' }}
                                                    style={{
                                                        background: '#007bff', // Standard Blue
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '0.8rem 2rem', // Increased horizontal padding
                                                        borderRadius: '30px',
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        marginTop: '2rem',
                                                        justifyContent: 'center',
                                                        whiteSpace: 'nowrap',   // Forces text to stay on one line
                                                        width: 'fit-content',   // Allows button to grow with text
                                                        minWidth: '150px'
                                                    }}
                                                >
                                                    Download
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

  //                          { Functional Pagination }
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', color: '#666', fontSize: '1.2rem', fontWeight: 500 }}>
                                <button
                                    onClick={() => paginate(-1)}
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
                                    onClick={() => paginate(1)}
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

    //                    { Down/Up arrows }
                        <div style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
                            zIndex: 100
                        }}>
                            <div
                                onClick={() => scrollToSection('up')}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 194, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(0, 194, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.2)';
                                    e.currentTarget.style.borderColor = '#00c2ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.2)';
                                }}
                            >
                                <ChevronDown size={24} color="#00c2ff" style={{ transform: 'rotate(180deg)' }} />
                            </div>
                            <div
                                onClick={() => scrollToSection('down')}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 194, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(0, 194, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.2)';
                                    e.currentTarget.style.borderColor = '#00c2ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.2)';
                                }}
                            >
                                <ChevronDown size={24} color="#00c2ff" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
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
*/