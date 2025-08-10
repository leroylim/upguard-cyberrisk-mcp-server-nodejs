# Multi-stage build for production optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:18-alpine AS production

# Install security updates
RUN apk upgrade --no-cache

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S upguard -u 1001

# Set working directory
WORKDIR /app

# Copy node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY --chown=upguard:nodejs src/ ./src/
COPY --chown=upguard:nodejs package*.json ./

# Set production environment
ENV NODE_ENV=production

# Create logs directory
RUN mkdir -p logs && chown upguard:nodejs logs

# Switch to non-root user
USER upguard

# Expose port (if needed for health checks)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Server is running')" || exit 1

# Start the application
CMD ["node", "src/index.js"] 