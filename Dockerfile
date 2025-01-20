# syntax=docker/dockerfile:1.4

# ---- Base Node ----
FROM node:20.11.1-slim AS base

# Variables de entorno base
ENV NODE_ENV=production \
    PORT=3000 \
    TZ=UTC

WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar todas las dependencias con cache
RUN --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

# ---- Builder ----
FROM dependencies AS builder

# Copiar archivos de configuración
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Copiar código fuente
COPY src/ ./src/
COPY test/ ./test/

# Construir la aplicación
RUN npm run build:prod

# Limpiar dependencias de desarrollo
RUN npm prune --production && npm cache clean --force

# ---- Runner ----
FROM base AS runner

# Instalar dependencias mínimas necesarias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    dumb-init \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/* && \
    groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nestjs && \
    mkdir -p /app/dist /app/node_modules && \
    chown -R nestjs:nodejs /app

# Variables de entorno
ENV MONGODB_URI="" \
    MONGODB_DB_NAME="" \
    MONGODB_USER="" \
    MONGODB_PASSWORD="" \
    MONGODB_AUTH_SOURCE="admin" \
    MONGODB_RETRY_WRITES=true \
    MONGODB_RETRY_READS=true \
    MONGODB_MAX_POOL_SIZE=10 \
    MONGODB_MIN_POOL_SIZE=1 \
    LOG_LEVEL=info \
    LOG_FORMAT=json \
    ENABLE_REQUEST_LOGGING=true \
    ENABLE_RESPONSE_LOGGING=true \
    ENABLE_ERROR_LOGGING=true \
    OTLP_ENDPOINT="" \
    DATADOG_API_KEY="" \
    ENABLE_METRICS=true \
    METRICS_PORT=9090 \
    NODE_OPTIONS="--max-old-space-size=2048 --enable-source-maps" \
    UV_THREADPOOL_SIZE=4 \
    MALLOC_ARENA_MAX=2 \
    ENABLE_RATE_LIMIT=true \
    RATE_LIMIT_WINDOW_MS=60000 \
    RATE_LIMIT_MAX_REQUESTS=100 \
    CORS_ORIGIN="*" \
    ENABLE_HELMET=true \
    ENABLE_COMPRESSION=true \
    CACHE_TTL=300 \
    CACHE_MAX_ITEMS=1000 \
    ENABLE_CACHE=true

# Copiar solo los archivos necesarios
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

# Labels para observabilidad y metadata
LABEL org.opencontainers.image.title="NestJS MongoDB API" \
      org.opencontainers.image.description="API NestJS con MongoDB optimizada para producción" \
      org.opencontainers.image.version="0.0.1" \
      org.opencontainers.image.licenses="UNLICENSED"

# Healthcheck mejorado
HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
    CMD curl -f http://localhost:${PORT}/health/liveness || exit 1

# Configuración final
USER root
EXPOSE ${PORT} ${METRICS_PORT}

# Usar dumb-init como init system
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/main"]
