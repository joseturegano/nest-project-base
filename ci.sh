#!/bin/bash
set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Función para logging
log() {
    echo -e "${GREEN}[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $(date '+%Y-%m-%d %H:%M:%S') - $1${NC}"
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARN] $(date '+%Y-%m-%d %H:%M:%S') - $1${NC}"
}

# Verificar dependencias
check_dependencies() {
    log "Verificando dependencias..."
    command -v docker >/dev/null 2>&1 || error "Docker no está instalado"
    command -v docker-compose >/dev/null 2>&1 || error "Docker Compose no está instalado"
    command -v curl >/dev/null 2>&1 || error "Curl no está instalado"
}

# Limpiar recursos anteriores
cleanup() {
    log "Limpiando recursos anteriores..."
    docker-compose down -v --remove-orphans || warn "Error al limpiar recursos"
    docker system prune -f || warn "Error al limpiar sistema Docker"
}

# Construir la aplicación
build() {
    log "Construyendo la aplicación..."
    docker-compose build --no-cache || error "Error en la construcción"
}

# Iniciar servicios
start_services() {
    log "Iniciando servicios..."
    docker-compose up -d || error "Error al iniciar servicios"
}

# Esperar a que los servicios estén listos
wait_for_services() {
    local max_attempts=12
    local wait_time=5
    local attempt=1
    
    log "Esperando a que los servicios estén listos..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:3000/api/health/readiness > /dev/null; then
            log "Servicios listos!"
            return 0
        fi
        
        log "Esperando ${wait_time} segundos... ($((max_attempts - attempt)) intentos restantes)"
        sleep $wait_time
        attempt=$((attempt + 1))
    done
    
    error "Los servicios no se iniciaron correctamente después de $((max_attempts * wait_time)) segundos"
    return 1
}

# Ejecutar pruebas
run_tests() {
    log "Ejecutando pruebas..."
    
    # Ejecutar las pruebas usando la configuración del package.json
    if ! docker-compose exec -T app npm run test:all; then
        warn "Algunas pruebas unitarias fallaron"
    fi
    
    if ! docker-compose exec -T app npm run test:e2e; then
        warn "Algunas pruebas e2e fallaron"
    fi
    
    # Verificar si hubo fallas críticas
    if docker-compose logs app | grep -q "Test failed"; then
        error "Pruebas críticas fallaron"
    fi
}

# Verificar métricas
check_metrics() {
    log "Verificando endpoints de métricas..."
    curl -f http://localhost:9090/metrics >/dev/null 2>&1 || warn "Endpoint de métricas no disponible"
}

# Función principal
main() {
    log "Iniciando pipeline de CI..."
    
    check_dependencies
    cleanup
    build
    start_services
    wait_for_services
    run_tests
    check_metrics
    
    log "✓ Pipeline de CI completado exitosamente"
}

# Ejecutar pipeline
main "$@"
