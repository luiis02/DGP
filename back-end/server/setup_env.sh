#!/bin/bash

# Nombre del entorno virtual
ENV_DIR="venv"

echo "Creando el entorno virtual en '$ENV_DIR'..."

# Verifica si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "Python3 no está instalado. Por favor, instálalo e intenta nuevamente."
    exit 1
fi

# Crea el entorno virtual
python3 -m venv $ENV_DIR

# Verifica si el entorno se creó correctamente
if [ $? -eq 0 ]; then
    echo "Entorno virtual creado exitosamente."
else
    echo "Error al crear el entorno virtual."
    exit 1
fi

# Verifica si `requirements.txt` existe
if [ -f "requirements.txt" ]; then
    echo "Instalando dependencias desde 'requirements.txt'..."
    pip install -r requirements.txt
else
    echo "No se encontró 'requirements.txt'. El entorno está listo pero sin dependencias."
fi

echo "El entorno virtual está configurado y activado. Para desactivarlo, ejecuta 'deactivate'."
