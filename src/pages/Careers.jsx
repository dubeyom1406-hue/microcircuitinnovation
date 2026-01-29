import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, MapPin, Clock, ArrowRight, FileText } from 'lucide-react';
import ApplyModal from '../../components/model/ApplyModal'; // Ensure this path matches your structure
import { useAdmin } from '../../context/AdminContext';

const Careers = () => {
    const { vacancies: contextVacancies, loading: adminLoading } = useAdmin();
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 8;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (direction) => {
        const next = document.getElementById('jobs-section');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    };

    const openApplyModal = (jobTitle) => {
        setSelectedJob(jobTitle);
        setIsModalOpen(true);
    };

    // Use context vacancies or fallback data
    const vacancies = contextVacancies.length > 0 ? contextVacancies : [
        {
            id: 1,
            title: "Senior RTL Design Engineer",
            location: "Bangalore, India",
            exp: "5-8 Years",
            type: "Full Time",
            description: "Lead the design of next-gen SoC subsystems. Experience with Verilog/SystemVerilog and low-power design techniques required."
        },
        {
            id: 2,
            title: "Physical Design Lead",
            location: "Hyderabad, India",
            exp: "8+ Years",
            type: "Full Time",
            description: "Own the block-level P&R, timing closure, and signoff for 3nm/5nm designs. Expertise in Synopsys/Cadence flows."
        },
        {
            id: 3,
            title: "DFT Engineer",
            location: "Remote / Hybrid",
            exp: "3-6 Years",
            type: "Full Time",
            description: "Implement and verify scan, MBIST, and JTAG. Knowledge of ATPG and fault simulation is essential."
        },
        {
            id: 4,
            title: "Analog Mixed Signal Designer",
            location: "Bangalore, India",
            exp: "4-7 Years",
            type: "Full Time",
            description: "Design high-speed SerDes and PLLs. Strong understanding of FinFET technologies."
        }
    ];

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
                            Join<span style={{ color: '#00c2ff' }}>Us</span>
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Hero Section */}
                <section id="hero-section" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '120px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(0, 194, 255, 0.1)', borderRadius: '50px', marginBottom: '1.5rem', border: '1px solid rgba(0, 194, 255, 0.2)' }}>
                            <span style={{ color: '#00c2ff', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px' }}>WE ARE HIRING</span>
                        </div>
                        <h1 style={{ fontSize: isMobile ? '3rem' : '5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            Build the <span style={{ color: '#00c2ff' }}>Silicon</span><br />
                            That Powers the World.
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#888', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            Join a team of elite engineers pushing the boundaries of Moore's Law.
                        </p>
                    </motion.div>

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

                <div id="jobs-section" style={{ padding: '2rem 0', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '2rem' }}>
                        Open Positions <span style={{ color: '#666', fontSize: '1rem', fontWeight: 400, marginLeft: '10px' }}>({vacancies.length})</span>
                    </h2>
                </div>

                {/* --- JOBS GRID --- */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '6rem'
                }}>
                    <AnimatePresence mode='wait'>
                        {vacancies.map((job, index) => (
                            <motion.div
                                key={job.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    // MATCHING CARD STYLE FROM EXPERTISE & CASE STUDY
                                    background: 'linear-gradient(180deg, #3c3c3c, #2b2b2b)',
                                    borderRadius: '18px',
                                    padding: '35px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    position: 'relative',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    height: '100%',
                                    minHeight: '380px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                                        <div style={{
                                            background: 'rgba(0, 194, 255, 0.1)',
                                            color: '#00c2ff',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            <Briefcase size={14} /> {job.type || 'Full Time'}
                                        </div>
                                    </div>

                                    <h3 style={{
                                        fontSize: '26px',
                                        fontWeight: '700',
                                        color: '#fff',
                                        marginBottom: '15px',
                                        lineHeight: '1.2'
                                    }}>
                                        {job.title}
                                    </h3>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '25px', color: '#888', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <MapPin size={16} color="#00c2ff" /> {job.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Clock size={16} color="#00c2ff" /> {job.exp}
                                        </div>
                                    </div>

                                    <p style={{
                                        color: '#cfcfcf',
                                        fontSize: '15px',
                                        lineHeight: '1.6',
                                        marginBottom: '30px'
                                    }}>
                                        {job.description}
                                    </p>
                                </div>

                                {/* --- BUTTON STYLE MATCHING EXPERTISE --- */}
                                <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: 'auto' }}>
                                    <button
                                        onClick={() => openApplyModal(job.title)}
                                        style={{
                                            background: '#0a78ff',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '50px',
                                            padding: '12px 30px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            whiteSpace: 'nowrap',
                                            flex: 1
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        Apply Now <ArrowRight size={18} />
                                    </button>

                                    {job.pdfUrl && (
                                        <a
                                            href={job.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#00c2ff',
                                                transition: 'all 0.3s ease',
                                                textDecoration: 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 194, 255, 0.1)';
                                                e.currentTarget.style.borderColor = '#00c2ff';
                                                e.currentTarget.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                            title="See JD"
                                        >
                                            <FileText size={22} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Application Modal */}
            <ApplyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobTitle={selectedJob}
            />
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

export default Careers;



































/*
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown } from 'lucide-react';
import ApplyModal from '../components/ApplyModal';
import { useAdmin } from '../context/AdminContext';

const Careers = () => {
    const { vacancies: contextVacancies, loading: adminLoading } = useAdmin();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const jobsPerPage = 8; // Number of jobs to display per page (4x2 grid)

    useEffect(() => {
        // Intro Timer
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000); // 2 seconds centered, then move

        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (direction) => {
        const sections = ['hero-section', 'role-section', 'jobs-section'];
        const currentPos = window.scrollY;

        // Find section positions
        const sectionOffsets = sections.map(id => {
            const el = document.getElementById(id);
            return el ? el.offsetTop : 0;
        });

        if (direction === 'down') {
            const next = sectionOffsets.find(offset => offset > currentPos + 50);
            if (next !== undefined) {
                window.scrollTo({ top: next, behavior: 'smooth' });
            }
        } else {
            const prev = [...sectionOffsets].reverse().find(offset => offset < currentPos - 50);
            if (prev !== undefined) {
                window.scrollTo({ top: prev, behavior: 'smooth' });
            }
        }
    };

    const handleApply = (title) => {
        setSelectedJob(title);
        setIsModalOpen(true);
    };

    // Use vacancies from AdminContext
    const allJobs = (contextVacancies || [])
        .map(v => ({
            id: v._id || v.id,
            title: v.title,
            exp: v.exp,
            loc: v.location,
            pdfUrl: v.pdfUrl,
            date: v.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            featured: v._id === '1' || v.id === 1
        }));

    // Sort jobs based on current sort order
    const sortedJobs = allJobs.sort((a, b) => {
        // Helper function to parse date string
        const parseDate = (dateStr) => {
            try {
                // Remove ordinal suffixes (st, nd, rd, th) and convert to date
                const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
                return new Date(cleanDate);
            } catch (e) {
                console.warn('Date parsing error:', e);
                // If parsing fails, return a default date
                return new Date(0); // Epoch time for invalid dates
            }
        };

        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        if (sortOrder === 'newest') {
            return dateB - dateA; // Newer dates first
        } else {
            return dateA - dateB; // Older dates first
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
    const indexOfFirstJob = (currentPage - 1) * jobsPerPage;
    const indexOfLastJob = indexOfFirstJob + jobsPerPage;
    const jobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="careers-page mobile-full-width"
            style={{ background: '#000', color: '#fff', overflowX: 'hidden', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}
        >
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
 //                   { Slide 1: Join a team }
                    <section id="hero-section" style={{
                        height: '65vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: isMobile ? '12rem 1rem 0' : '8rem 1rem 0', // Significant gap from header
                        position: 'relative'
                    }}>
                        <motion.h1
                            layoutId="hero-title"
                            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                            style={{
                                fontSize: isMobile ? '2.8rem' : 'clamp(3.5rem, 8.5vw, 6.5rem)',
                                fontWeight: 600,
                                lineHeight: 1.05,
                                background: 'linear-gradient(90deg, #4f9cf9 0%, #a855f7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                maxWidth: '1300px',
                                margin: '0 auto 1.5rem',
                                letterSpacing: '-1px',
                                padding: isMobile ? '0 1rem' : '0'
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
                            style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}
                            onClick={() => scrollToSection('down')}
                        >
                            <ChevronDown size={32} color="#00c2ff" strokeWidth={1.5} />
                        </motion.div>
                    </section>

  //                  { Slide 2: "Role" }
                    <section id="role-section" style={{
                        height: '30vh',
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
                                fontSize: isMobile ? '3.5rem' : 'clamp(4rem, 10vw, 8rem)',
                                fontWeight: 800,
                                margin: 0,
                                lineHeight: 0.8,
                                letterSpacing: '-3px'
                            }}
                        >
                            "Role"
                        </motion.h2>
                    </section>

  //                  { Slide 3: Jobs Grid }
                    <section id="jobs-section" style={{
                        minHeight: isMobile ? 'auto' : 'auto',
                        padding: isMobile ? '2rem 1rem' : '2rem 1rem',
                        maxWidth: '1400px',
                        margin: '0 auto'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem', gap: '1.5rem' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0 }}>
                                Find Your <span style={{ color: '#00c2ff' }}>Perfect Role</span>
                            </h3>
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

                        <div style={{
                            position: 'relative',
                            minHeight: '400px',
                            overflow: 'hidden'
                        }}>
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={currentPage}
                                    custom={direction}
                                    variants={{
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
                                    }}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
                                        opacity: { duration: 0.4, ease: "circOut" },
                                        scale: { duration: 0.4, ease: "circOut" },
                                        filter: { duration: 0.4, ease: "circOut" }
                                    }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(4, 1fr)',
                                        gap: '1.5rem',
                                        width: '100%'
                                    }}
                                >
                                    {jobs.map((job, index) => (
                                        <motion.div
                                            key={job.id || job.title}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="career-card"
                                            style={{
                                                background: '#111',
                                                borderRadius: '24px',
                                                padding: '3px',
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'hidden',
                                                border: '1px solid transparent',
                                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{
                                                    background: 'linear-gradient(135deg, #ff9800 0%, #f44336 100%)',
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
                                                    transition: 'all 0.3s ease'
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
                                </motion.div>
                            </AnimatePresence>
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
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setDirection(-1);
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
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
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                        setDirection(1);
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}
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

 //                   { Down/Up arrows }
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
        </motion.div>
    );
};

export default Careers;
*/