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
    command -v node >/dev/null 2>&1 || error "Node.js no está instalado"
    command -v npm >/dev/null 2>&1 || error "NPM no está instalado"
}

# Limpiar directorio de builds
clean_builds() {
    log "Limpiando directorio de builds..."
    rm -rf builds/*
    mkdir -p builds
}

# Instalar dependencias
install_dependencies() {
    log "Instalando dependencias..."
    npm ci || error "Error al instalar dependencias"
}

# Construir la aplicación
build_app() {
    log "Construyendo la aplicación..."
    npm run build || error "Error en la construcción"
}

# Ejecutar pruebas
run_tests() {
    log "Ejecutando pruebas..."
    npm run test || warn "Algunas pruebas unitarias fallaron"
    npm run test:e2e || warn "Algunas pruebas e2e fallaron"
}

# Crear paquetes para diferentes plataformas
create_packages() {
    log "Creando paquetes para diferentes plataformas..."
    
    # Definir plataformas
    local platforms=(
        "linux-x64"
        "linux-arm64"
        "macos-x64"
        "macos-arm64"
        "windows-x64"
        "windows-arm64"
    )
    
    for platform in "${platforms[@]}"; do
        log "Empaquetando para $platform..."
        
        # Crear directorio para la plataforma
        local build_dir="builds/nest-app-$platform"
        mkdir -p "$build_dir"
        
        # Copiar archivos necesarios
        cp -r dist/* "$build_dir/"
        cp package*.json "$build_dir/"
        cp .env.* "$build_dir/"
        
        # Instalar solo dependencias de producción
        (cd "$build_dir" && npm ci --only=production --ignore-scripts) || warn "Error al instalar dependencias para $platform"
        
        # Crear archivo comprimido según la plataforma
        if [[ $platform == windows* ]]; then
            (cd builds && zip -r "nest-app-$platform.zip" "nest-app-$platform") || warn "Error al crear zip para $platform"
        else
            (cd builds && tar czf "nest-app-$platform.tar.gz" "nest-app-$platform") || warn "Error al crear tar.gz para $platform"
        fi
    }
}

# Generar log de build
generate_build_log() {
    log "Generando log de build..."
    {
        echo "Build completado: $(date)"
        echo "Node version: $(node -v)"
        echo "NPM version: $(npm -v)"
        echo "Git commit: $(git rev-parse HEAD)"
        echo "Plataformas generadas:"
        ls -l builds/
    } > build_log.txt
}

# Función principal
main() {
    log "Iniciando proceso de build..."
    
    check_dependencies
    clean_builds
    install_dependencies
    build_app
    run_tests
    create_packages
    generate_build_log
    
    log "✓ Build completado exitosamente"
    log "Los artefactos se encuentran en el directorio 'builds/'"
}

# Ejecutar build
main "$@"
