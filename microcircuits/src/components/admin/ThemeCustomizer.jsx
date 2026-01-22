import React from 'react';

const ThemeCustomizer = () => {
    return (
        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Design System</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: '#00c2ff', borderRadius: '8px', textAlign: 'center' }}>Primary Color</div>
                <div style={{ padding: '1rem', background: '#8b5cf6', borderRadius: '8px', textAlign: 'center' }}>Accent Color</div>
                <div style={{ padding: '1rem', background: '#000', border: '1px solid #333', borderRadius: '8px', textAlign: 'center' }}>Background</div>
            </div>
            <p style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.9rem' }}>Theme customization is coming soon in the next update.</p>
        </div>
    );
};

export default ThemeCustomizer;
