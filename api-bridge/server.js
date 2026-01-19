require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.API_PORT || 3000;

// Database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// API Key Validation Middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.X_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
  next();
};

/**
 * GET /api/status
 * Returns current infrastructure and service status
 */
app.get('/api/status', validateApiKey, async (req, res) => {
  try {
    // 1. Fetch latest infrastructure metrics
    const infraQuery = `
      SELECT DISTINCT ON (type) type, value, time
      FROM system_metrics
      WHERE type IN ('cpu', 'mem', 'disk')
      ORDER BY type, time DESC
    `;
    const infraRes = await pool.query(infraQuery);

    const infrastructure = {
      cpu: 0,
      memory: 0,
      disk: 0,
      last_updated: new Date().toISOString()
    };

    infraRes.rows.forEach(row => {
      if (row.type === 'cpu') infrastructure.cpu = row.value;
      if (row.type === 'mem') infrastructure.memory = row.value;
      if (row.type === 'disk') infrastructure.disk = row.value;
      infrastructure.last_updated = row.time;
    });

    // 2. Fetch latest container status
    const serviceQuery = `
      SELECT DISTINCT ON (meta->>'container_name') 
             meta->>'container_name' as name, 
             CASE WHEN value = 1 THEN 'running' ELSE 'stopped' END as status,
             value as uptime_val,
             time as last_seen
      FROM system_metrics
      WHERE type = 'container_status'
      ORDER BY meta->>'container_name', time DESC
    `;
    const serviceRes = await pool.query(serviceQuery);

    res.json({
      infrastructure,
      services: serviceRes.rows
    });
  } catch (err) {
    console.error('Error fetching status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Socket.io Setup
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: ["GET", "POST"]
  }
});

// Mock Log Generator for Demo
const generateMockLog = () => {
  const services = ['api-server', 'worker-01', 'db-connector', 'auth-service'];
  const levels = ['info', 'warn', 'error', 'debug'];
  const msgs = ['Request received', 'Connection timeout', 'Cache miss', 'Transaction committed', 'Retrying connection'];

  return {
    service: services[Math.floor(Math.random() * services.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    message: `${msgs[Math.floor(Math.random() * msgs.length)]} [${Math.floor(Math.random() * 1000)}ms]`,
    timestamp: new Date().toISOString()
  };
};

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === process.env.X_API_KEY) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Emit some mock logs for start
  const logInterval = setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance to emit log
      socket.emit('logs:stream', generateMockLog());
    }
  }, 2000);

  // Emit metrics every 5s
  const metricInterval = setInterval(async () => {
    try {
      // Reuse the logic from GET /api/status if separated, otherwise copy query logic vertically or mock for now
      // For production, this should refactor the data fetching into a shared function
      const infraQuery = `
          SELECT DISTINCT ON (type) type, value, time
          FROM system_metrics
          WHERE type IN ('cpu', 'mem', 'disk')
          ORDER BY type, time DESC
        `;
      const serviceQuery = `
          SELECT DISTINCT ON (meta->>'container_name') meta->>'container_name' as name, 
                 CASE WHEN value = 1 THEN 'running' ELSE 'stopped' END as status,
                 value as uptime_val, time as last_seen
          FROM system_metrics
          WHERE type = 'container_status'
          ORDER BY meta->>'container_name', time DESC
        `;

      const [infraRes, serviceRes] = await Promise.all([
        pool.query(infraQuery),
        pool.query(serviceQuery)
      ]);

      const infrastructure = { cpu: 0, memory: 0, disk: 0, last_updated: new Date().toISOString() };
      infraRes.rows.forEach(row => {
        if (row.type === 'cpu') infrastructure.cpu = row.value;
        if (row.type === 'mem') infrastructure.memory = row.value;
        if (row.type === 'disk') infrastructure.disk = row.value;
        infrastructure.last_updated = row.time;
      });

      socket.emit('metrics:update', {
        infrastructure,
        services: serviceRes.rows
      });

    } catch (err) {
      console.error('Socket Metric Error:', err);
    }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(metricInterval);
    clearInterval(logInterval);
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`API Bridge listening at http://0.0.0.0:${port}`);
});
