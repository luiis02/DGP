#! /bin/bash

# Verificar si se proporcionó un paquete
if [ -z "$1" ]; then
    echo "Uso: ./add_package.sh <nombre_del_paquete>"
    exit 1
fi

PACKAGE_NAME=$1
ENV_DIR="venv"

# Verificar si el entorno virtual existe
if [ ! -d "$ENV_DIR" ]; then
    echo "El entorno virtual no existe. Por favor, créalo primero usando setup_env.sh."
    exit 1
fi

# Instalar el paquete
echo "Instalando el paquete '$PACKAGE_NAME'..."
pip install $PACKAGE_NAME

if [ $? -eq 0 ]; then
    echo "Paquete '$PACKAGE_NAME' instalado exitosamente."
else
    echo "Error al instalar el paquete '$PACKAGE_NAME'."
    deactivate
    exit 1
fi

# Actualizar requirements.txt
echo "Actualizando 'requirements.txt'..."
pip freeze > requirements.txt

echo "'requirements.txt' actualizado. Para desactivar el entorno virtual, ejecuta 'deactivate'."
