import React from 'react';
import { Activity, XCircle } from 'lucide-react';

export const ServiceBadge = ({ name, status, uptime }) => {
    const isRunning = status === 'running';
    const color = isRunning ? 'var(--color-running)' : 'var(--color-stopped)';

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            border: `1px solid ${isRunning ? 'rgba(0, 255, 163, 0.2)' : 'rgba(255, 61, 113, 0.2)'}`
        }}>
            <div style={{ marginRight: '1rem' }}>
                {isRunning ? <Activity color={color} size={20} /> : <XCircle color={color} size={20} />}
            </div>
            <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                    {isRunning ? `Uptime: ${uptime} hrs` : 'Stopped'}
                </div>
            </div>
            <div style={{
                marginLeft: 'auto',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 10px ${color}`
            }} />
        </div>
    );
};
