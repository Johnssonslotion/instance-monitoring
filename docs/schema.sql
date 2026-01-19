-- system_metrics table for monitoring (TimescaleDB)
CREATE TABLE IF NOT EXISTS system_metrics (
    time TIMESTAMPTZ NOT NULL,
    type TEXT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    meta JSONB
);

-- Convert to hypertable for TimescaleDB
-- Note: This requires the TimescaleDB extension
SELECT create_hypertable('system_metrics', 'time', if_not_exists => TRUE);

-- Index for faster querying
CREATE INDEX IF NOT EXISTS idx_system_metrics_type_time ON system_metrics (type, time DESC);
