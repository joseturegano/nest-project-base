# Módulo de Health Check

## Descripción
Proporciona endpoints para monitorear la salud del sistema.

## Endpoints

### GET /api/health
Verificación completa del sistema que incluye:
- Conexión a MongoDB
- Uso de memoria heap
- Conectividad HTTP
- Espacio en disco

### GET /api/health/liveness
Verifica si la aplicación está viva:
- Comprueba la conexión a MongoDB

### GET /api/health/readiness
Verifica si la aplicación está lista para recibir tráfico:
- Conexión a MongoDB
- Uso de memoria heap
- Espacio en disco

## Configuración

### Variables de Entorno
```env
# Umbrales de salud
HEALTH_MEMORY_HEAP_THRESHOLD=500    # MB
HEALTH_DISK_THRESHOLD_PERCENT=0.9   # 90%
HEALTH_MONGODB_TIMEOUT=5000         # ms
```

### Umbrales por Defecto
- Memoria Heap: 500MB
- Disco: 90% de uso máximo
- Timeout MongoDB: 5000ms

## Indicadores de Salud

### MongoDB
- Verifica la conectividad a la base de datos
- Configurable con timeout personalizado
- Crítico para operaciones de la aplicación

### Memoria Heap
- Monitorea el uso de memoria de la aplicación
- Alerta cuando se supera el umbral configurado
- Ayuda a prevenir problemas de memoria

### HTTP
- Verifica la conectividad del servidor
- Comprueba que los endpoints están respondiendo
- Usa el puerto configurado de la aplicación

### Almacenamiento
- Monitorea el espacio en disco disponible
- Alerta cuando se supera el porcentaje de uso configurado
- Previene problemas de almacenamiento

## Respuestas

### Éxito
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

### Error
```json
{
  "status": "error",
  "error": {
    "mongodb": {
      "status": "down",
      "message": "timeout"
    }
  }
}
