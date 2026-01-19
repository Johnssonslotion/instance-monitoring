#!/bin/sh

# Start Tailscale in the background
# We use --authkey to join the network
# --hostname allows us to identify this node in the Tailscale admin console
if [ -n "$TAILSCALE_AUTH_KEY" ]; then
  echo "Starting Tailscale..."
  tailscaled --tun=userspace-networking --socks5-server=localhost:1055 &
  
  # Wait for tailscaled to start
  sleep 2
  
  tailscale up --authkey=$TAILSCALE_AUTH_KEY --hostname=status-bridge-edge
else
  echo "Warning: TAILSCALE_AUTH_KEY not set. Tailscale will not start."
fi

# Start the Node.js API server
echo "Starting API Server..."
npm start
