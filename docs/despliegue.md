# Despliegue

## Entornos

### Desarrollo Local
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev
```

### Pruebas
```bash
# Ejecutar pruebas
npm test                 # Unitarias
npm run test:e2e        # End-to-end
npm run test:integration # Integración
```

### Producción
```bash
# Construir aplicación
npm run build

# Iniciar en producción
npm run start:prod
```

## Docker

### Construcción
```bash
# Construir imagen
docker build -t nest-app .

# Construir para múltiples plataformas
./build.sh
```

### Configuración
El Dockerfile incluye:
- Node.js en modo producción
- Multistage build para optimización
- Usuarios no privilegiados
- Healthchecks configurados

### Docker Compose
```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down
```

Servicios incluidos:
- API NestJS
- MongoDB
- Prometheus
- Grafana

## Variables de Entorno

### Configuración
- `.env.development`: Desarrollo local
- `.env.test`: Pruebas
- `.env.production`: Producción

### Variables Requeridas
```env
# Servidor
PORT=3000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=nestjs
MONGODB_USER=usuario
MONGODB_PASSWORD=contraseña

# Logging
LOG_LEVEL=error
LOG_FORMAT=json

# Seguridad
ENABLE_HELMET=true
ENABLE_COMPRESSION=true
```

## Scripts de Despliegue

### build.sh
- Construye la aplicación para múltiples arquitecturas
- Genera artefactos en el directorio /builds
- Soporta:
  - Linux (x64, arm64)
  - macOS (x64, arm64)
  - Windows (x64, arm64)

### ci.sh
- Script para integración continua
- Ejecuta:
  1. Pruebas
  2. Análisis de código
  3. Construcción de imagen
  4. Publicación de artefactos

## Monitoreo

### Prometheus
```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'nestjs'
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['app:3000']
```

### OpenTelemetry
```yaml
# otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
```

## CI/CD

### GitHub Actions
- Pruebas automáticas
- Análisis de código
- Construcción de imágenes
- Despliegue automático

### SonarQube
```properties
# sonar-project.properties
sonar.projectKey=nest-project-base
sonar.sources=src
sonar.tests=test
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

## Escalabilidad

### Horizontal
- Balanceo de carga
- Sesiones distribuidas
- Caché distribuido
- Replicación de MongoDB

### Vertical
- Ajuste de recursos
- Optimización de consultas
- Gestión de memoria
- Pooling de conexiones

[Volver al índice](README.md)
