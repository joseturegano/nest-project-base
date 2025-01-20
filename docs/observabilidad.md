# Observabilidad

## Componentes

### Health Checks
- [Documentación detallada del módulo Health](modulos/health.md)
- Monitoreo de servicios críticos:
  - MongoDB
  - Memoria
  - Almacenamiento
  - HTTP

### Métricas
- [Documentación detallada del módulo Metrics](modulos/metrics.md)
- Métricas Prometheus:
  - Contadores de solicitudes HTTP
  - Histogramas de duración de respuestas
  - Uso de recursos del sistema

### Logging
- Niveles configurables via LOG_LEVEL
- Formato JSON para mejor procesamiento
- Contexto enriquecido en cada log
- Rotación de logs automática

## Configuración

### Variables de Entorno
```env
# Logging
LOG_LEVEL=error|warn|info|debug
LOG_FORMAT=json|text

# Health Check
HEALTH_MEMORY_HEAP_THRESHOLD=500
HEALTH_DISK_THRESHOLD_PERCENT=0.9
HEALTH_MONGODB_TIMEOUT=5000

# Métricas
METRICS_PREFIX=app_
```

## Integración con Herramientas

### Prometheus
```yaml
scrape_configs:
  - job_name: 'nestjs'
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['localhost:3000']
```

### Grafana
- Dashboards predefinidos disponibles en /grafana
- Paneles para:
  - Tasa de solicitudes
  - Latencia de endpoints
  - Uso de recursos
  - Estado de servicios

## Buenas Prácticas

### Métricas
1. Usar nombres descriptivos
2. Incluir labels relevantes
3. Documentar unidades de medida
4. Mantener cardinalidad controlada

### Logging
1. Usar niveles apropiados
2. Incluir contexto relevante
3. Evitar información sensible
4. Estructurar logs en JSON

### Health Checks
1. Verificar dependencias críticas
2. Implementar timeouts adecuados
3. Separar liveness de readiness
4. Monitorear umbrales críticos

## Alertas

### Configuración de Alertas
```yaml
groups:
  - name: app_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.*"}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Alta tasa de errores"
```

### Notificaciones
- Integración con:
  - Email
  - Slack
  - PagerDuty
  - Webhook personalizado

[Volver al índice](README.md)
