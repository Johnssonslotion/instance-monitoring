import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Cpu, HardDrive, Server, Zap } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { ServiceBadge } from './components/ServiceBadge';
import { LogTerminal } from './components/LogTerminal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const X_API_KEY = import.meta.env.VITE_X_API_KEY || 'local-test-key';

function App() {
  const [infra, setInfra] = useState({ cpu: 0, memory: 0, disk: 0 });
  const [services, setServices] = useState([]);
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/status`, {
          headers: { 'X-API-KEY': X_API_KEY }
        });
        if (res.ok) {
          const data = await res.json();
          setInfra(data.infrastructure);
          setServices(data.services);
          setConnected(true);
          setLastUpdated(new Date().toISOString());
        } else {
          console.error('API Error:', res.status);
          setConnected(false);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setConnected(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fallback polling

    // Socket.io Connection
    const socket = io(API_BASE_URL || window.location.origin, {
      path: '/socket.io',
      auth: { token: X_API_KEY },
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Socket Connected');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Socket Disconnected');
      setConnected(false);
    });

    socket.on('metrics:update', (data) => {
      setInfra(data.infrastructure);
      setServices(data.services);
      setLastUpdated(new Date().toISOString());
    });

    socket.on('logs:stream', (log) => {
      setLogs(prev => [...prev, log].slice(-50)); // Keep last 50 logs
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Zap size={24} color="var(--color-infra)" style={{ marginRight: '0.8rem' }} />
            <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>Instance Monitoring</h1>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            OCI A1 Master Node Status
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.4rem 0.8rem',
            background: connected ? 'rgba(0, 255, 163, 0.1)' : 'rgba(255, 61, 113, 0.1)',
            borderRadius: '20px',
            border: `1px solid ${connected ? 'var(--color-running)' : 'var(--color-stopped)'}`
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: connected ? 'var(--color-running)' : 'var(--color-stopped)',
              marginRight: '0.5rem'
            }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: connected ? 'var(--color-running)' : 'var(--color-stopped)' }}>
              {connected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.4rem' }}>
            Last Updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '-'}
          </div>
        </div>
      </header>

      {!connected && (
        <div style={{
          background: 'rgba(255, 61, 113, 0.2)',
          border: '1px solid var(--color-stopped)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#ff8a8a',
          fontSize: '1.2rem'
        }}>
          ⚠️ A1 HOST UNREACHABLE
        </div>
      )}

      {/* Infrastructure Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatsCard title="CPU Usage" value={infra.cpu} unit="%" icon={Cpu} color="#00E5FF" />
        <StatsCard title="Memory Usage" value={infra.memory} unit="%" icon={Server} color="#B388FF" />
        <StatsCard title="Disk Usage" value={infra.disk} unit="%" icon={HardDrive} color="#00FFA3" />
      </section>

      {/* Services & Logs Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Services */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            Services Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {services.map((svc, idx) => (
              <ServiceBadge key={idx} name={svc.name} status={svc.status} uptime={svc.uptime_val} />
            ))}
            {services.length === 0 && <div style={{ opacity: 0.5 }}>No active services found.</div>}
          </div>
        </div>

        {/* Logs */}
        <LogTerminal logs={logs} />
      </section>
    </div>
  );
}

export default App;
