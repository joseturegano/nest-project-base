# Pruebas

## Estructura

El proyecto utiliza diferentes tipos de pruebas:
- Unitarias: Pruebas de componentes individuales
- Integración: Pruebas de interacción entre componentes
- E2E: Pruebas de extremo a extremo

## Configuración

### Timeouts
- E2E: 30 segundos (para inicialización de contenedores y servicios)
- Integración: 15 segundos (para operaciones con bases de datos)
- Unitarias: 10 segundos (valor por defecto)

### Entorno de Pruebas
- Se utiliza MongoDB en contenedor para pruebas
- Variables de entorno específicas para pruebas en `.env.test`
- Mocks configurados para logs y servicios externos

### Configuración de Integración
- Base de datos de prueba configurada automáticamente
- Valores predeterminados para servicios (MongoDB, Redis)
- Limpieza automática de datos entre pruebas

### Contenedores de Prueba
- MongoDB en contenedor para aislamiento
- Gestión automática del ciclo de vida del contenedor
- Limpieza de recursos después de las pruebas

## Mejores Prácticas
1. Mantener las pruebas independientes
2. Limpiar datos y estado entre pruebas
3. Usar datos de prueba específicos y controlados
4. Evitar dependencias entre pruebas
5. Mantener los tiempos de ejecución optimizados

## Estructura de Archivos
- `test/`: Directorio principal de pruebas
  - `app.e2e-spec.ts`: Pruebas E2E principales
  - `integration.setup.ts`: Configuración para pruebas de integración
  - `testcontainers.setup.ts`: Configuración de contenedores
  - `test.module.ts`: Módulo principal para pruebas
  - `timeout.config.ts`: Configuración de tiempos límite
  - `jest.setup.ts`: Configuración global de Jest

## Ejecución
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas E2E
npm run test:e2e

# Ejecutar pruebas de integración
npm run test:integration

# Ejecutar pruebas unitarias
npm run test:unit
