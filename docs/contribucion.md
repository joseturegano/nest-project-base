# Guía de Contribución

## Proceso de Desarrollo

### 1. Preparación
- Fork del repositorio
- Clonar localmente
- Instalar dependencias
```bash
npm install
```

### 2. Crear Branch
```bash
# Formato: tipo/descripcion-corta
git checkout -b feature/nueva-funcionalidad
git checkout -b fix/correccion-bug
git checkout -b docs/actualizacion-documentacion
```

### 3. Desarrollo
- Seguir estándares de código
- Escribir pruebas
- Documentar cambios
- Mantener commits atómicos

## Estándares de Código

### Estilo
- Usar Prettier para formato
- Seguir ESLint
- Mantener líneas < 100 caracteres
- Usar tipos TypeScript

### Nombrado
- Clases: PascalCase
- Interfaces: IPascalCase
- Variables/funciones: camelCase
- Constantes: UPPER_SNAKE_CASE

### Documentación
- Documentar en español
- Mantener documentación en archivos MD
- Actualizar Swagger para cambios en API
- Documentar solo lo necesario en código

## Pruebas

### Tipos
- Unitarias: `src/**/*.spec.ts`
- Integración: `test/integration/`
- E2E: `test/e2e/`
- Features: `test/features/`

### Cobertura
- Mínimo 80% cobertura
- 100% en lógica crítica
- Incluir casos borde
- Documentar casos complejos

## Pull Requests

### Preparación
1. Actualizar rama principal
2. Rebase interactivo si necesario
3. Ejecutar pruebas localmente
4. Verificar linting y tipos

### Descripción
```markdown
# Descripción
Breve descripción del cambio

## Tipo de Cambio
- [ ] Feature
- [ ] Bug fix
- [ ] Documentación
- [ ] Optimización
- [ ] Otro

## ¿Cómo se probó?
Detalles de las pruebas realizadas

## Checklist
- [ ] Pruebas pasando
- [ ] Documentación actualizada
- [ ] Swagger actualizado
- [ ] Changelog actualizado
```

## Commits

### Formato
```
tipo(alcance): descripción corta

Descripción larga si es necesaria
```

### Tipos
- feat: Nueva funcionalidad
- fix: Corrección de bug
- docs: Documentación
- style: Formato
- refactor: Refactorización
- test: Pruebas
- chore: Mantenimiento

## Documentación

### Archivos MD
- Mantener estructura actual
- Actualizar índices
- Incluir ejemplos
- Verificar enlaces

### Código
- Comentarios concisos
- Documentar decisiones importantes
- Mantener Swagger actualizado
- Documentar configuraciones

## Versionado

### Semantic Versioning
- MAJOR: Cambios incompatibles
- MINOR: Nuevas funcionalidades
- PATCH: Correcciones

### Changelog
- Mantener CHANGELOG.md actualizado
- Agrupar por tipo de cambio
- Incluir referencias a issues/PRs
- Documentar breaking changes

## Seguridad

### Reportar Vulnerabilidades
1. No abrir issues públicos
2. Contactar mantenedores
3. Proporcionar PoC si es posible
4. Esperar confirmación

### Revisión de Código
- Verificar inyecciones
- Validar entradas
- Revisar dependencias
- Seguir mejores prácticas

[Volver al índice](README.md)
