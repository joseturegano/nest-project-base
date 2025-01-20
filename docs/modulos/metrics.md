# Módulo de Métricas

## Descripción
Proporciona métricas de rendimiento y monitoreo de la aplicación usando Prometheus.

## Métricas Disponibles

### HTTP Requests Total
- Nombre: `http_requests_total`
- Tipo: Counter
- Etiquetas:
  - `method`: Método HTTP (GET, POST, etc.)
  - `path`: Ruta del endpoint
  - `status`: Código de estado HTTP
- Descripción: Cuenta el número total de solicitudes HTTP recibidas

### HTTP Request Duration
- Nombre: `http_request_duration_seconds`
- Tipo: Histogram
- Etiquetas:
  - `method`: Método HTTP
  - `path`: Ruta del endpoint
  - `status`: Código de estado HTTP
- Descripción: Mide la duración de las solicitudes HTTP en segundos

## Endpoints

### GET /api/metrics
- Expone todas las métricas en formato Prometheus
- Gestionado por @willsoto/nestjs-prometheus
- No requiere autenticación por defecto

## Uso en Código

```typescript
// Inyección del servicio
constructor(private metricsService: MetricsService) {}

// Iniciar medición de duración
const timer = this.metricsService.startTimer();

// Registrar solicitud completada
this.metricsService.incrementHttpRequests(method, path, status);

// Registrar duración
const duration = timer();
this.metricsService.observeHttpRequestDuration(method, path, status, duration);
```

## Integración con Prometheus

### Configuración de Prometheus
```yaml
scrape_configs:
  - job_name: 'nestjs'
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['localhost:3000']
```

### Ejemplos de Consultas PromQL

#### Tasa de Solicitudes por Minuto
```promql
rate(http_requests_total[1m])
```

#### Latencia Promedio
```promql
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
```

#### Tasa de Errores
```promql
rate(http_requests_total{status=~"5.*"}[5m])
