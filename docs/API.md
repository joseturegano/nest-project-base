# Documentación de la API

## Endpoints

### Items

#### Obtener items paginados

```http
GET /api/items
```

**Parámetros:**
- `limit`: Número máximo de items por página (default: 10)
- `offset`: Número de items a saltar (default: 0)

**Respuesta:**
```json
[
  {
    "_id": "64b8f5f5e4b0a1a2b3c4d5e6",
    "name": "Item 1",
    "description": "Descripción del item 1",
    "active": true,
    "createdAt": "2023-07-20T12:34:56.789Z",
    "updatedAt": "2023-07-20T12:34:56.789Z"
  }
]
```

### Health Check

#### Verificar estado completo del sistema

```http
GET /api/health
```

**Respuesta:**
```json
{
  "status": "ok",
  "info": {
    "mongodb": { "status": "up" },
    "memory_heap": { "status": "up" },
    "storage": { "status": "up" }
  }
}
```

#### Verificar estado básico (liveness)

```http
GET /api/health/liveness
```

**Respuesta:**
```json
{
  "status": "ok",
  "info": {
    "mongodb": { "status": "up" }
  }
}
```

#### Verificar disponibilidad (readiness)

```http
GET /api/health/readiness
```

**Respuesta:**
```json
{
  "status": "ok",
  "info": {
    "mongodb": { "status": "up" },
    "memory_heap": { "status": "up" },
    "storage": { "status": "up" }
  }
}
```

### Métricas

#### Obtener métricas del sistema

```http
GET /api/metrics
```

Retorna métricas en formato Prometheus, incluyendo:
- `http_requests_total`: Contador de solicitudes HTTP por método, ruta y código de estado
- `http_request_duration_seconds`: Histograma de duración de solicitudes HTTP

## Ejemplos de Uso

### Obtener items paginados
```bash
curl -X GET "http://localhost:3000/api/items?limit=10&offset=20" \
  -H "Accept: application/json"
```

### Verificar estado del sistema
```bash
curl -X GET "http://localhost:3000/api/health"
```

### Obtener métricas
```bash
curl -X GET "http://localhost:3000/api/metrics"
```

## Documentación Swagger

La documentación detallada de la API está disponible en:
```
http://localhost:3000/api/docs
```

[Volver al índice](README.md)
