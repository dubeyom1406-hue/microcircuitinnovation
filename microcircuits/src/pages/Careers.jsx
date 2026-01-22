import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown } from 'lucide-react';
import ApplyModal from '../components/ApplyModal';


const Careers = () => {
    // Static data for vacancies
    const contextVacancies = [
        {
            id: 1,
            title: "Physical Design Engineer",
            exp: "3-5 Years",
            location: "Ahmedabad, Gujarat",
            description: "We are looking for a Physical Design Engineer to join our team. You will be responsible for the physical implementation of high-performance integrated circuits.",
            date: "12 January 2026",
            pdfUrl: "#"
        },
        {
            id: 2,
            title: "DFT Engineer",
            exp: "2-4 Years",
            location: "Bangalore (Remote Available)",
            description: "Joining our DFT team, you will work on cutting-edge design for testability solutions for complex SOCs.",
            date: "15 January 2026",
            pdfUrl: "#"
        },
        {
            id: 3,
            title: "RTL Design Lead",
            exp: "8-12 Years",
            location: "Ahmedabad, Gujarat",
            description: "Lead the design architecture and RTL development for our next-generation semiconductor products.",
            date: "18 January 2026",
            pdfUrl: "#"
        }
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6; // Number of jobs to display per page

    useEffect(() => {
        // Intro Timer
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000); // 2 seconds centered, then move

        return () => clearTimeout(timer);
    }, []);

    const handleApply = (title) => {
        setSelectedJob(title);
        setIsModalOpen(true);
    };

    // Use vacancies from API
    const allJobs = (contextVacancies || [])
        .map(v => ({
            id: v.id,
            title: v.title,
            exp: v.exp,
            loc: v.location,
            date: v.date,
            featured: v.id === 1
        }));
        
    // Sort jobs based on current sort order
    const sortedJobs = allJobs.sort((a, b) => {
        // Parse dates to compare them properly
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (sortOrder === 'newest') {
            return dateB - dateA; // Newer dates first
        } else {
            return dateA - dateB; // Older dates first
        }
    });
    
    // Pagination logic
    const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const jobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <div className="careers-page mobile-full-width" style={{ background: '#000', color: '#fff', overflowX: 'hidden', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
            <ApplyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobTitle={selectedJob}
            />

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
                // INTRO STATE: Text Centered
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <motion.h1
                        layoutId="hero-title"
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 600,
                            background: 'linear-gradient(90deg, #4f9cf9 0%, #a855f7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center',
                            padding: '0 2rem'
                        }}
                    >
                        Join a team and inspire the work.
                    </motion.h1>
                </div>
            ) : (
                // FINAL STATE: Page Content
                <div key="careers-content">
                    {/* Slide 1: Join a team */}
                    <section style={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '0 1rem',
                        position: 'relative'
                    }}>
                        <motion.h1
                            layoutId="hero-title"
                            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                            style={{
                                fontSize: 'clamp(3.5rem, 8.5vw, 6.5rem)',
                                fontWeight: 600,
                                lineHeight: 1.05,
                                background: 'linear-gradient(90deg, #4f9cf9 0%, #a855f7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                maxWidth: '1300px',
                                margin: '0 auto 3rem',
                                letterSpacing: '-1px'
                            }}
                        >
                            Join a team and inspire the work.
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                maxWidth: '800px',
                                margin: '0 auto',
                                lineHeight: 1.4,
                                fontWeight: 400
                            }}>
                                Discover how you can make an impact. See our areas of work and opportunities
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 10, 0] }}
                            transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)' }}
                        >
                            <ChevronDown size={32} color="#444" strokeWidth={1.5} />
                        </motion.div>
                    </section>

                    {/* Slide 2: "Role" */}
                    <section style={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        background: '#000',
                        padding: '0 1rem'
                    }}>
                        <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                fontSize: 'clamp(4rem, 10vw, 8rem)',
                                fontWeight: 800,
                                margin: 0,
                                lineHeight: 0.8,
                                letterSpacing: '-3px'
                            }}
                        >
                            "Role"
                        </motion.h2>
                    </section>

                    {/* Slide 3: Jobs Grid */}
                    <section style={{
                        padding: '4rem 1rem',
                        maxWidth: '1400px',
                        margin: '0 auto',
                        minHeight: '100vh'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0 }}>
                                Find Your <span style={{ color: '#00c2ff' }}>Perfect</span>
                            </h3>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>Sort By:</span>
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
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
                                            <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                                            <ChevronDown 
                                                size={16} 
                                                style={{ 
                                                    transform: sortOrder === 'newest' ? 'rotate(0deg)' : 'rotate(180deg)',
                                                    transition: 'transform 0.3s ease'
                                                }} 
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '3rem'
                        }}>
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={job.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="career-card"
                                    style={{
                                        background: '#111',
                                        borderRadius: '24px',
                                        padding: '3px',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <motion.div
                                        whileHover={{
                                            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                                        }}
                                        style={{
                                            background: '#1a1a1a',
                                            borderRadius: '22px',
                                            padding: '2.5rem 1.5rem',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            transition: 'background 0.3s ease'
                                        }}
                                    >
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <Briefcase size={32} color="#fff" strokeWidth={1.5} />
                                            <div style={{ width: '30px', height: '2px', background: 'rgba(255,255,255,0.3)', margin: '15px auto 0' }} />
                                        </div>

                                        <h4 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 700,
                                            marginBottom: '1rem',
                                            color: '#fff',
                                            lineHeight: 1.2
                                        }}>
                                            {job.title}
                                        </h4>

                                        <div style={{
                                            color: '#ccc',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.6,
                                            marginBottom: '2.5rem',
                                            fontWeight: 400
                                        }}>
                                            {job.exp}<br />
                                            {job.loc}<br />
                                            {job.date}
                                        </div>

                                        <button
                                            onClick={() => handleApply(job.title)}
                                            style={{
                                                width: '100%',
                                                padding: '0.8rem',
                                                background: 'linear-gradient(90deg, #0076fe 0%, #0056b1 100%)',
                                                border: 'none',
                                                borderRadius: '50px',
                                                color: '#fff',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                marginTop: 'auto',
                                                boxShadow: '0 4px 15px rgba(0, 118, 254, 0.3)'
                                            }}
                                        >
                                            Apply Here
                                        </button>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1.5rem',
                            marginTop: '6rem',
                            color: '#666',
                            fontSize: '1.2rem',
                            fontWeight: 500
                        }}>
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
                                <span style={{ color: '#00c2ff' }}>{indexOfFirstJob + 1}-</span>
                                <span>{Math.min(indexOfLastJob, sortedJobs.length)}</span>
                                <span style={{ margin: '0 10px', color: '#444' }}>of</span>
                                <span>{sortedJobs.length}</span>
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
                    </section>

                    {/* Down/Up arrows */}
                    <div style={{
                        position: 'fixed',
                        bottom: '1rem',
                        right: '1rem',
                        display: 'flex',
                        gap: '0.8rem',
                        zIndex: 10
                    }}>
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <ChevronDown size={24} color="#333" style={{ transform: 'rotate(180deg)' }} />
                        </div>
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <ChevronDown size={24} color="#666" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
