# Documentación de la API

## Endpoints principales

### Items
- `GET /items`: Obtener lista de items
- `GET /items/:id`: Obtener un item específico
- `POST /items`: Crear un nuevo item
- `PUT /items/:id`: Actualizar un item existente
- `DELETE /items/:id`: Eliminar un item

### Health
- `GET /health`: Verificar estado del servicio

### Metrics
- `GET /metrics`: Obtener métricas de Prometheus

## Autenticación
La API utiliza JWT para autenticación. Incluir token en el header:
`Authorization: Bearer <token>`

## Ejemplos de requests

```json
// Crear item
POST /items
{
  "name": "Nuevo item",
  "description": "Descripción del item"
}

// Obtener items
GET /items?page=1&limit=10
```

## Códigos de estado comunes
- 200: OK
- 201: Creado
- 400: Bad Request
- 401: No autorizado
- 404: No encontrado
- 500: Error del servidor
