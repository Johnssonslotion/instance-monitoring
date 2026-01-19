import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export const LogTerminal = ({ logs }) => {
    const terminalRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel" style={{ height: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center' }}>
                <Terminal size={16} style={{ marginRight: '0.5rem', opacity: 0.7 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Live System Logs</span>
            </div>
            <div ref={terminalRef} style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                lineHeight: '1.5'
            }}>
                {logs.map((log, index) => (
                    <div key={index} style={{ marginBottom: '0.2rem', display: 'flex' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', marginRight: '1rem', minWidth: '140px' }}>
                            {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        <span style={{
                            color: log.level === 'error' ? '#FF3D71' :
                                log.level === 'warn' ? '#FFB300' : '#00FFA3',
                            marginRight: '1rem',
                            fontWeight: 'bold',
                            minWidth: '60px'
                        }}>
                            [{log.service}]
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.9)' }}>{log.message}</span>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div style={{ opacity: 0.3, fontStyle: 'italic' }}>Waiting for logs...</div>
                )}
            </div>
        </div>
    );
};
