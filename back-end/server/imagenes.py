from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from flask import Response

from db_controller import DatabaseController
import os
imagenesBP = Blueprint('imagenesBP', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # Tipos de archivos permitidos

db_conn = DatabaseController() 


def allowed_file(filename):
    """Verifica si el archivo tiene una extensión permitida"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

from io import BytesIO

@imagenesBP.route('/imagenes', methods=['POST'])
def imagenes():
    if 'foto' not in request.files:
        return jsonify({'error': 'No se envió la imagen'}), 400

    foto = request.files['foto']

    if foto.filename == '':
        return jsonify({'error': 'El archivo no tiene nombre'}), 400

    if not allowed_file(foto.filename):
        return jsonify({'error': 'Tipo de archivo no permitido'}), 400

    # Intentar extraer el nombre de usuario del nombre del archivo, si existe
    username = None
    try:
        # Si el nombre tiene un ".", intentamos extraer el nombre antes del punto
        if '.' in foto.filename:
            possible_username = foto.filename.rsplit('.', 1)[0]
            # Validar que el posible nombre sea un nombre de usuario válido (opcional)
            if possible_username:  # Aquí podrías añadir más validaciones si es necesario
                username = possible_username
    except Exception as e:
        return jsonify({'error': 'Error al procesar el nombre del archivo', 'detalle': str(e)}), 400

    try:
        # Guardamos la imagen y el nombre de usuario (si lo hay) en la base de datos
        image_data = foto.read()

        query = "INSERT INTO `MULTIMEDIA` (`tipo`, `archivo`, `username`) VALUES (%s, %s, %s)"
        db_conn.execute_query(query, ('FOTO', image_data, username))
    except Exception as e:
        return jsonify({'error': 'Error al guardar en la base de datos', 'detalle': str(e)}), 500

    try:
        # Obtener el ID de la imagen insertada
        query = "SELECT MAX(id) AS max_id FROM `MULTIMEDIA`"
        result = db_conn.fetch_query(query)

        if not result or not result[0]:
            return jsonify({'error': 'No se pudo obtener un ID válido'}), 500

        max_id = result[0][0]
        image_url = f'http://{request.host}/visualiza/{max_id}'
    except Exception as e:
        return jsonify({'error': 'Error al obtener el ID de la imagen', 'detalle': str(e)}), 500

    return jsonify({'url': image_url}), 200


@imagenesBP.route('/visualiza/<int:id>', methods=['GET'])
def visualiza(id):
    try:
        # Obtener los datos de la imagen (BLOB) usando el ID
        query = "SELECT archivo FROM `MULTIMEDIA` WHERE id = %s"
        result = db_conn.fetch_query(query, (id,))

        if not result or not result[0]:
            return jsonify({'error': 'Imagen no encontrada'}), 404

        # Obtener los datos binarios del archivo
        image_data = result[0][0]

        # Enviar la imagen como respuesta con el tipo MIME adecuado
        return Response(image_data, mimetype='image/jpeg')  # Cambiar mimetype según el tipo de imagen
    except Exception as e:
        return jsonify({'error': 'Error al recuperar la imagen', 'detalle': str(e)}), 500
