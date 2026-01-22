import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
    const [phase, setPhase] = useState(1);

    useEffect(() => {
        // Phase 1: Show "Design Great." perfectly centered
        // Phase 2: Show Mission Statement below (at 3s)
        // Phase 3: "Design Great." fades out (at 5.5s)
        // Phase 4: Complete and reveal site (at 8s)

        const timer1 = setTimeout(() => setPhase(2), 3000);
        const timer2 = setTimeout(() => setPhase(3), 5500);
        const timer3 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 8000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
        >
            {/* Wrapper for both elements to control overall positioning */}
            <div className="relative flex flex-col items-center">

                {/* DESIGN GREAT - Always centered relative to its initial appearance */}
                <AnimatePresence>
                    {phase < 3 && (
                        <motion.div
                            key="design-great"
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
                            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                            className="z-20"
                        >
                            <h1 className="text-6xl md:text-9xl font-bold tracking-tight text-white font-sans">
                                Design <span className="text-[#00c2ff]">Great.</span>
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mission Section - Appears below DESIGN GREAT */}
                <AnimatePresence>
                    {phase >= 2 && (
                        <motion.div
                            key="mission"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1.8, ease: "easeOut" }}
                            className="mt-8 md:mt-12 max-w-5xl relative z-10"
                        >
                            <h2 className="text-2xl md:text-5xl font-semibold text-white leading-tight font-sans">
                                <span className="opacity-80 block mb-2 font-medium">We don’t just Design Chips.</span>
                                <span>
                                    We Engineer{" "}
                                    <motion.span
                                        initial={{ color: "#ffffff" }}
                                        animate={{ color: "#FFD700" }}
                                        transition={{ delay: 1, duration: 2.5 }}
                                        className="font-extrabold uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                                    >
                                        Breakthroughs
                                    </motion.span>
                                </span>
                            </h2>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default IntroLoader;
