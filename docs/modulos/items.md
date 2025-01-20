# Módulo de Items

## Descripción

El módulo de items es el núcleo de la aplicación, encargado de gestionar los recursos principales del sistema. Implementa un CRUD completo con paginación, validaciones y manejo de errores.

## Estructura del Módulo

```
src/items/
├── items.controller.ts    # Controlador REST
├── items.service.ts       # Lógica de negocio
├── items.module.ts        # Configuración del módulo
├── schemas/               # Esquemas de MongoDB
│   └── item.schema.ts     # Esquema principal
├── dtos/                  # Data Transfer Objects
│   ├── create-item.dto.ts # DTO para creación
│   ├── update-item.dto.ts # DTO para actualización
│   └── item.dto.ts        # DTO para respuesta
└── features/              # Pruebas BDD
    ├── get-items.feature  # Especificación BDD
    └── get-items.steps.ts # Implementación steps
```

## Características Principales

- **CRUD completo**: Crear, leer, actualizar y eliminar items
- **Paginación**: Soporte para paginación con limit y offset
- **Validaciones**: Esquema validado con Mongoose
- **Documentación**: Swagger completo con ejemplos
- **Pruebas**: Unitarias y E2E implementadas

## Endpoints

### Obtener items paginados

```http
GET /api/items?limit=10&offset=20
```

**Parámetros:**
- `limit`: Número máximo de items por página (default: 10)
- `offset`: Número de items a saltar (default: 0)

**Respuesta:**
```json
{
  "items": [
    {
      "id": "64b8f5f5e4b0a1a2b3c4d5e6",
      "name": "Item 1",
      "description": "Descripción del item",
      "createdAt": "2023-07-20T12:34:56.789Z",
      "updatedAt": "2023-07-20T12:34:56.789Z"
    }
  ],
  "total": 100,
  "limit": 10,
  "offset": 20
}
```

### Crear item

```http
POST /api/items
```

**Cuerpo:**
```json
{
  "name": "Item 1",
  "description": "Descripción del item"
}
```

**Respuesta:**
```json
{
  "id": "64b8f5f5e4b0a1a2b3c4d5e6",
  "name": "Item 1",
  "description": "Descripción del item",
  "createdAt": "2023-07-20T12:34:56.789Z",
  "updatedAt": "2023-07-20T12:34:56.789Z"
}
```

## Ejemplos de Uso

### Obtener items paginados
```bash
curl -X GET "http://localhost:3000/api/items?limit=10&offset=20" \
  -H "Accept: application/json"
```

### Crear item
```bash
curl -X POST "http://localhost:3000/api/items" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Item 1",
    "description": "Descripción del item"
  }'
```

### Actualizar item
```bash
curl -X PUT "http://localhost:3000/api/items/64b8f5f5e4b0a1a2b3c4d5e6" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Item Actualizado",
    "description": "Nueva descripción"
  }'
```

### Eliminar item
```bash
curl -X DELETE "http://localhost:3000/api/items/64b8f5f5e4b0a1a2b3c4d5e6"
```

[Volver al índice](../../docs/README.md)
