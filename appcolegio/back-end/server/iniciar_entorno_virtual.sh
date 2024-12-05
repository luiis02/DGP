#!/bin/bash

# Nombre del entorno virtual
ENV_DIR="venv"

# Comprobar si el directorio del entorno virtual existe
if [ -d "$ENV_DIR" ]; then
    echo "Activando el entorno virtual..."
    source "$ENV_DIR/bin/activate"

    # Comprobar si la activación fue exitosa
    if [ $? -eq 0 ]; then
        echo "Entorno virtual activado."
        echo "'requirements.txt' actualizado. Para desactivar el entorno virtual, ejecuta 'deactivate'."
    else
        echo "Error al activar el entorno virtual."
        exit 1
    fi
else
    echo "El entorno virtual no existe. Ejecuta 'python -m venv $ENV_DIR' para crearlo."
    exit 1
fi
