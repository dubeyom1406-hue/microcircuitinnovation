import React from 'react';
import { motion } from 'framer-motion';

const InfiniteLoader = ({ size = 120, color = "#00c2ff" }) => {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg
                width={size}
                height={size / 2}
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="filter"
            >
                <defs>
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="outer-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background ghost path */}
                <path
                    d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                    stroke="rgba(0, 194, 255, 0.05)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Main animated path with glow */}
                <motion.path
                    d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#neon-glow)"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0.5 }}
                    animate={{
                        pathLength: [0.3, 0.6, 0.3],
                        pathOffset: [0, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Trailing glow effect */}
                <motion.path
                    d="M 25 25 C 25 5, 45 5, 50 25 C 55 45, 75 45, 75 25 C 75 5, 55 5, 50 25 C 45 45, 25 45, 25 25 Z"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    filter="url(#outer-glow)"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0.2 }}
                    animate={{
                        pathLength: [0.4, 0.8, 0.4],
                        pathOffset: [0, 1],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </svg>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 flex flex-col items-center gap-1"
            >
                <span className="text-[#00c2ff] text-[10px] font-bold tracking-[0.4em] uppercase">
                    Processing
                </span>
                <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1 h-1 rounded-full bg-[#00c2ff]"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default InfiniteLoader;
