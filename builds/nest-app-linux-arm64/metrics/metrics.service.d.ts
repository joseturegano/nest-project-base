import { Counter, Histogram } from 'prom-client';
export declare class MetricsService {
    private readonly httpRequestsCounter;
    private readonly httpRequestDuration;
    constructor(httpRequestsCounter: Counter<string>, httpRequestDuration: Histogram<string>);
    incrementHttpRequests(method: string, path: string, status: number): void;
    observeHttpRequestDuration(method: string, path: string, status: number, duration: number): void;
    startTimer(): () => number;
}
