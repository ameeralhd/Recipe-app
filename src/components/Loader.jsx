import React from 'react';

const Loader = () => {
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', padding: '4rem'
        }}>
            <div style={{
                width: '40px', height: '40px',
                border: '4px solid hsl(var(--color-background))',
                borderTop: '4px solid hsl(var(--color-primary))',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default Loader;
