import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const ProtectedRoute = ({ children }) => {
    const { isAdmin: isAuthenticated, loading } = useAdmin();
    const [showDebug, setShowDebug] = React.useState(false);

    React.useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setShowDebug(true), 5000);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                gap: '1rem',
                fontFamily: 'sans-serif'
            }}>
                <div className="loader" style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#00c2ff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p>Loading Admin Matrix...</p>

                {showDebug && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            background: 'rgba(255,0,0,0.1)',
                            border: '1px solid rgba(255,0,0,0.2)',
                            padding: '1rem',
                            borderRadius: '8px',
                            maxWidth: '400px',
                            textAlign: 'center'
                        }}
                    >
                        <p style={{ color: '#ff4b4b', fontWeight: 'bold' }}>Taking too long?</p>
                        <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
                            Firebase might be failing to initialize on Vercel.
                            Ensure <strong>Environment Variables</strong> (VITE_FIREBASE_*) are set in Vercel settings and the project is redeployed.
                        </p>
                    </motion.div>
                )}
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
