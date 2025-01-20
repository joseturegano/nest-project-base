# Arquitectura del Proyecto

## Diseño del Sistema

### Principios de Diseño

- **Modularidad**: Cada funcionalidad está encapsulada en módulos independientes
- **SOLID**: Aplicación de principios SOLID en toda la estructura
- **Capa de Dominio**: Separación clara entre lógica de negocio y presentación
- **Inversión de Dependencias**: Uso de inyección de dependencias

### Diagrama de Arquitectura

```mermaid
graph TD
    A[Cliente] --> B[API Gateway]
    B --> C[Módulo de Items]
    B --> D[Módulo de Autenticación]
    B --> E[Módulo de Métricas]
    C --> F[Base de Datos]
    D --> F
    E --> G[OpenTelemetry]
    G --> H[Prometheus]
    G --> I[Jaeger]
```

## Estructura del Proyecto

```
.
├── src/
│   ├── common/          # Código compartido
│   │   ├── dtos/        # Data Transfer Objects
│   │   ├── filters/     # Filtros globales
│   │   ├── guards/      # Guards de autenticación
│   │   ├── interceptors/# Interceptores
│   │   └── pipes/       # Pipes de validación
│   ├── config/          # Configuración
│   ├── database/        # Conexión DB y seeds
│   ├── health/          # Health checks
│   ├── items/           # Módulo principal
│   ├── metrics/         # Métricas y observabilidad
│   ├── app.module.ts    # Módulo raíz
│   └── main.ts          # Punto de entrada
├── test/                # Pruebas E2E
├── docker/              # Configuración Docker
└── docs/                # Documentación adicional
```

## Flujos Principales

### Flujo de Autenticación

```mermaid
sequenceDiagram
    participant Cliente
    participant AuthController
    participant AuthService
    participant JWTService
    participant DB
    
    Cliente->>AuthController: POST /auth/login
    AuthController->>AuthService: validateUser()
    AuthService->>DB: Buscar usuario
    DB-->>AuthService: Datos usuario
    AuthService->>JWTService: Generar token
    JWTService-->>AuthService: Token JWT
    AuthService-->>AuthController: Token
    AuthController-->>Cliente: 200 OK con token
```

### Flujo de Creación de Items

```mermaid
sequenceDiagram
    participant Cliente
    participant ItemsController
    participant ItemsService
    participant DB
    
    Cliente->>ItemsController: POST /items
    ItemsController->>ItemsService: create()
    ItemsService->>DB: Validar y crear item
    DB-->>ItemsService: Item creado
    ItemsService-->>ItemsController: Item
    ItemsController-->>Cliente: 201 Created
```

## Patrones de Diseño

1. **Inyección de Dependencias**: Uso intensivo de DI para desacoplar componentes
2. **Repository Pattern**: Para acceso a datos
3. **Strategy Pattern**: En manejo de autenticación
4. **Observer Pattern**: Para métricas y observabilidad
5. **Decorator Pattern**: En interceptores y guards

[Volver al índice](../docs/README.md)
