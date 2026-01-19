# Stage 1: Get Tailscale binaries
FROM alpine:latest AS tailscale
WORKDIR /app
COPY . .
ENV TSVERSION=1.56.1
RUN wget https://pkgs.tailscale.com/stable/tailscale_${TSVERSION}_amd64.tgz && \
    tar xzf tailscale_${TSVERSION}_amd64.tgz && \
    mv tailscale_${TSVERSION}_amd64/tailscale* /usr/local/bin/

# Stage 2: Final image
FROM node:20-slim
WORKDIR /app

# Install necessary runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    iptables \
    curl \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy Tailscale from stage 1
COPY --from=tailscale /usr/local/bin/tailscale /usr/local/bin/tailscale
COPY --from=tailscale /usr/local/bin/tailscaled /usr/local/bin/tailscaled

# Copy application files
COPY package*.json ./
RUN npm install --production

COPY . .

# Make start script executable
RUN chmod +x start.sh

# Environment variables (to be overridden by Northflank)
ENV NODE_ENV=production
ENV API_PORT=3000

EXPOSE 3000

CMD ["./start.sh"]
