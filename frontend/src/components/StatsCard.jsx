import React from 'react';

export const StatsCard = ({ title, value, unit, icon: Icon, color = '#00E5FF' }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', opacity: 0.8 }}>
                <Icon size={18} color={color} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</span>
                <span style={{ fontSize: '1rem', marginLeft: '0.3rem', opacity: 0.6 }}>{unit}</span>
            </div>
            {/* Simple Gauge Bar */}
            <div style={{ marginTop: '1rem', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{
                    width: `${Math.min(value, 100)}%`,
                    height: '100%',
                    background: color,
                    borderRadius: '2px',
                    transition: 'width 0.5s ease'
                }} />
            </div>
        </div>
    );
};
