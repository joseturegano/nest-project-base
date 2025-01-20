# Configuración de la Aplicación

## Inicialización

La aplicación se configura en `src/main.ts` con las siguientes características:

### Prefijo Global
- Todos los endpoints tienen el prefijo `/api`
- Ejemplo: `/api/health`, `/api/metrics`

### Seguridad
- Helmet para políticas de seguridad HTTP
- Variable: `ENABLE_HELMET`
- Configuración CSP personalizable via `CSP_DIRECTIVES`

### Compresión
- Compresión de respuestas HTTP
- Variable: `ENABLE_COMPRESSION`
- Configuración:
  - `COMPRESSION_THRESHOLD`: Tamaño mínimo para comprimir (default: 1024)
  - `COMPRESSION_LEVEL`: Nivel de compresión (default: 6)

### Validación
Variables de entorno:
- `VALIDATION_WHITELIST`: Permite solo propiedades decoradas
- `VALIDATION_FORBID_NON_WHITELISTED`: Rechaza propiedades no decoradas
- `VALIDATION_TRANSFORM`: Transforma tipos automáticamente
- Los mensajes de error se deshabilitan en producción

### Documentación API
- Swagger UI disponible en `/api/docs`
- Características:
  - Autorización persistente
  - Ordenación alfabética de tags y operaciones
  - Soporte para autenticación Bearer

## Módulos y Servicios

### MongoDB
Variables de entorno para la conexión:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=nestjs
MONGODB_USER=usuario
MONGODB_PASSWORD=contraseña
MONGODB_AUTH_SOURCE=admin
MONGODB_RETRY_WRITES=true|false
MONGODB_RETRY_READS=true|false
MONGODB_MAX_POOL_SIZE=10
MONGODB_MIN_POOL_SIZE=1
```

### Rate Limiting
Protección contra ataques DDoS:
```env
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Variables de Entorno Generales
```env
# Servidor
PORT=3000
NODE_ENV=development|production

# Seguridad
ENABLE_HELMET=true|false
CSP_DIRECTIVES={"directivas":"personalizadas"}

# Compresión
ENABLE_COMPRESSION=true|false
COMPRESSION_THRESHOLD=1024
COMPRESSION_LEVEL=6

# Validación
VALIDATION_WHITELIST=true|false
VALIDATION_FORBID_NON_WHITELISTED=true|false
VALIDATION_TRANSFORM=true|false
```

## Módulos Principales
- **HealthModule**: Monitoreo de salud del sistema
- **MetricsModule**: Métricas y observabilidad
- **ItemsModule**: Gestión de items
- **DatabaseModule**: Gestión de base de datos y seeds
