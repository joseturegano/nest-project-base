# Instalación y Configuración

## Requisitos del Sistema

- **Node.js**: Versión 20.x o superior
- **Docker**: Versión 24.x o superior
- **Docker Compose**: Versión 2.x o superior
- **Yarn** o **npm**: Gestor de paquetes
- **Git**: Control de versiones
- **OpenSSL**: Para generación de certificados (opcional)

## Instalación Inicial

1. Clonar el repositorio:
```bash
git clone https://github.com/iromanm1982/nest-project-base
cd tu-repositorio
```

2. Instalar dependencias:
```bash
yarn install
# o
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus valores
```

4. Iniciar servicios con Docker:
```bash
docker-compose up -d
```

5. Ejecutar en modo desarrollo:
```bash
yarn start:dev
# o
npm run start:dev
```

## Integración Continua y Despliegues (CI/CD)

### Script de Construcción (build.sh)

El script `build.sh` automatiza el proceso de construcción y empaquetado de la aplicación. Sus características principales son:

- **Verificación de dependencias**: Node.js y npm
- **Limpieza de builds anteriores**
- **Instalación de dependencias** usando `npm ci`
- **Construcción de la aplicación** con `npm run build`
- **Ejecución de pruebas** unitarias y end-to-end
- **Empaquetado multiplataforma** para:
  - Linux (x64 y arm64)
  - macOS (x64 y arm64)
  - Windows (x64 y arm64)
- **Generación de logs** detallados del proceso

**Uso:**
```bash
./build.sh
```

### Script de Integración Continua (ci.sh)

El script `ci.sh` implementa el pipeline de integración continua. Sus características principales son:

- **Verificación de dependencias**: Docker, Docker Compose y curl
- **Limpieza de recursos Docker** anteriores
- **Construcción de imágenes Docker**
- **Inicio de servicios** con docker-compose
- **Verificación de salud** de servicios con reintentos
- **Ejecución de pruebas** en contenedores aislados
- **Verificación de métricas** de Prometheus

**Uso:**
```bash
./ci.sh
```

## Configuración de Entorno

### Variables de Entorno

| Variable            | Descripción                          | Valor por Defecto       |
|---------------------|--------------------------------------|-------------------------|
| NODE_ENV            | Entorno de ejecución                | development             |
| PORT                | Puerto de la aplicación             | 3000                    |
| MONGODB_URI         | URL de conexión MongoDB             | mongodb://localhost:27017 |
| MONGODB_DB_NAME     | Nombre de la base de datos          | nestjs                  |
| JWT_SECRET          | Secreto para JWT                    | change_this_secret      |
| RATE_LIMIT_WINDOW   | Ventana de rate limiting (ms)       | 60000                   |
| RATE_LIMIT_MAX      | Máximo de peticiones por ventana    | 1000                    |

### Configuración de Seguridad

1. Generar certificados TLS para desarrollo:
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

2. Configurar CORS para desarrollo:
```javascript
// En src/main.ts
app.enableCors({
  origin: ['http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

## Configuración Adicional

### Docker

- **docker-compose.yaml**: Configuración de servicios
- **Dockerfile**: Configuración de la imagen principal
- **.dockerignore**: Archivos excluidos en la construcción

### Linting y Formato

- **.eslintrc.js**: Configuración de ESLint
- **.prettierrc**: Configuración de Prettier
- **.editorconfig**: Configuración del editor

[Volver al índice](../docs/README.md)
