import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = ({ onComplete }) => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState(1);

    useEffect(() => {
        // Phase 1: Design GREAT + Mission (0-4s)
        const timer1 = setTimeout(() => setPhase(2), 4000); // Fade out Phase 1

        // Phase 3: Great Engineering + Mission (5.5s)
        const timer2 = setTimeout(() => setPhase(3), 5500);

        // Fade out Phase 3 (at 9.5s)
        const timer3 = setTimeout(() => setPhase(4), 9500);

        // Phase 5: Design. Develop. Deliver (11s)
        const timer4 = setTimeout(() => {
            setPhase(5);
            if (onComplete) onComplete();

            // Auto-redirect after final phase (11s + 5s = 16s total)
            setTimeout(() => {
                navigate('/expertise');
            }, 5000);
        }, 11000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <div style={{
            background: '#000',
            minHeight: '100vh',
            color: '#fff',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '"Outfit", sans-serif'
        }}>
            <AnimatePresence mode="wait">
                {/* PHASE 1: Design GREAT */}
                {phase === 1 && (
                    <motion.div
                        key="phase1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)" }}
                        transition={{ duration: 1.5 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            margin: 0,
                            lineHeight: 1
                        }}>
                            Design <span style={{ color: '#00c2ff' }}>GREAT</span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            style={{
                                marginTop: '1.5rem',
                                fontSize: 'clamp(0.6rem, 1vw, 1rem)',
                                color: '#999',
                                fontWeight: 400,
                                letterSpacing: '0.02em',
                                maxWidth: '600px'
                            }}
                        >
                            We don’t just Design Chips. We Engineer <span style={{ color: '#FFD700', fontWeight: 600 }}>Breakthroughs</span>.
                        </motion.p>
                    </motion.div>
                )}

                {/* PHASE 3: GREAT ENGINEERING */}
                {phase === 3 && (
                    <motion.div
                        key="phase3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)" }}
                        transition={{ duration: 2, ease: "easeOut", exit: { duration: 1.5 } }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2rem, 7vw, 5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            margin: 0,
                            lineHeight: 1
                        }}>
                            <span style={{ color: '#00c2ff' }}>GREAT</span> ENGINEERING
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            style={{
                                marginTop: '1.5rem',
                                fontSize: 'clamp(0.6rem, 1vw, 1rem)',
                                color: '#999',
                                fontWeight: 400,
                                letterSpacing: '0.02em',
                                maxWidth: '600px'
                            }}
                        >
                            We don’t just Design Chips. We Engineer <span style={{ color: '#FFD700', fontWeight: 600 }}>Breakthroughs</span>.
                        </motion.p>
                    </motion.div>
                )}

                {/* PHASE 5: Design. Develop. Deliver. */}
                {phase === 5 && (
                    <motion.div
                        key="phase5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2rem, 6vw, 4rem)',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            margin: 0,
                            lineHeight: 1.2,
                            color: '#fff'
                        }}>
                            Design. Develop. <span style={{ color: '#00c2ff' }}>Deliver.</span>
                        </h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60px' }}
                            transition={{ delay: 1, duration: 1 }}
                            style={{ height: '4px', background: '#FFD700', borderRadius: '2px', margin: '2rem 0' }}
                        />

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 1.5 }}
                            style={{
                                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                                fontWeight: 300,
                                color: '#ccc',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase'
                            }}
                        >
                            Your Next Chip Starts <span style={{ color: '#fff', fontWeight: 600 }}>Here</span>
                        </motion.h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
