import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Careers from './pages/Careers';
import CaseStudy from './pages/CaseStudy';
import Contact from './pages/Contact';
import About from './pages/About';



import { AnimatePresence } from 'framer-motion';
import './index.css';

const AppContent = () => {
    const location = useLocation();
    const isAdminPage = false; // Admin functionality removed
    const [showHeader, setShowHeader] = React.useState(true);

    React.useEffect(() => {
        if (isAdminPage) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }, [isAdminPage]);

    return (
        <div className="App">
            {!isAdminPage && <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<Home onComplete={() => setShowHeader(true)} />} />
                    <Route path="/expertise" element={<Expertise />} />
                    <Route path="/casestudy" element={<CaseStudy />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />


                    {/* Fallback */}
                    <Route path="*" element={<Expertise />} />
                </Routes>
            </main>
            {!isAdminPage && (
                <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Copyright © 2025 MicroCircuits Innovations Pvt. Ltd. All rights reserved.</p>
                </footer>
            )}
        </div>
    );
};

import CustomCursor from './components/CustomCursor';

function App() {
    return (
        <div>
            <CustomCursor />
            <Router>
                <AppContent />
            </Router>
        </div>
    );
}

export default App;
