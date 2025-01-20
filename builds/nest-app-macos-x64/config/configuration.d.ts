declare class EnvironmentVariables {
    NODE_ENV: string;
    PORT: number;
    TZ: string;
    MONGODB_URI: string;
    MONGODB_DB_NAME: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    MONGODB_AUTH_SOURCE: string;
    MONGODB_RETRY_WRITES: boolean;
    MONGODB_RETRY_READS: boolean;
    MONGODB_MAX_POOL_SIZE: number;
    MONGODB_MIN_POOL_SIZE: number;
    LOG_LEVEL: string;
    LOG_FORMAT: string;
    ENABLE_REQUEST_LOGGING: boolean;
    ENABLE_RESPONSE_LOGGING: boolean;
    ENABLE_ERROR_LOGGING: boolean;
    OTLP_ENDPOINT: string;
    ENABLE_METRICS: boolean;
    METRICS_PORT: number;
    ENABLE_RATE_LIMIT: boolean;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX_REQUESTS: number;
    CORS_ORIGIN: string;
    ENABLE_HELMET: boolean;
    ENABLE_COMPRESSION: boolean;
    CACHE_TTL: number;
    CACHE_MAX_ITEMS: number;
    ENABLE_CACHE: boolean;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
declare const _default: () => {
    nodeEnv: string;
    port: number;
    timezone: string;
    mongodb: {
        uri: string;
        dbName: string;
        user: string | undefined;
        password: string | undefined;
        authSource: string;
        retryWrites: boolean;
        retryReads: boolean;
        maxPoolSize: number;
        minPoolSize: number;
    };
    logging: {
        level: string;
        format: string;
        enableRequest: boolean;
        enableResponse: boolean;
        enableError: boolean;
    };
    observability: {
        otlpEndpoint: string | undefined;
        enableMetrics: boolean;
        metricsPort: number;
    };
    security: {
        enableRateLimit: boolean;
        rateLimitWindowMs: number;
        rateLimitMaxRequests: number;
        corsOrigin: string;
        enableHelmet: boolean;
        enableCompression: boolean;
    };
    cache: {
        ttl: number;
        maxItems: number;
        enable: boolean;
    };
};
export default _default;
