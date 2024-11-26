from flask import Blueprint, jsonify, request
from db_controller import DatabaseController
from datetime import datetime

# Crear el Blueprint
peticionesBP = Blueprint('peticiones', __name__)

# Instanciar el controlador de la base de datos
db = DatabaseController()

@peticionesBP.route('/peticion', methods=['POST'])
def peticion():
    try:
        # Obtener datos del cuerpo de la solicitud
        data = request.get_json()
        profesor_id = data.get('profesor_id')
        alumno_id = data.get('alumno_id')
        material = data.get('material')
        fecha_entrega = data.get('fecha_entrega')

        print(data)
        print(profesor_id)
        print(alumno_id)
        print(material)
        print(fecha_entrega)

        if not (profesor_id and alumno_id and material and fecha_entrega):
            return jsonify({'error': 'Todos los campos son obligatorios.'}), 400

        # Insertar la solicitud en la base de datos
        query = """INSERT INTO SOLICITUD_MATERIAL (profesor_id, alumno_id, material, fecha_entrega) 
                    VALUES (%s, %s, %s, %s)"""
        params = (profesor_id, alumno_id, material, fecha_entrega)

        if db.execute_query(query, params):
            return jsonify({'message': 'Solicitud creada exitosamente.'}), 201
        else:
            return jsonify({'error': 'Error al insertar la solicitud en la base de datos.'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@peticionesBP.route('/peticion/<int:peticion_id>', methods=['DELETE'])
def eliminar_peticion(peticion_id):
    try:
        # Eliminar la solicitud de material por ID
        query = "DELETE FROM SOLICITUD_MATERIAL WHERE id = %s"
        params = (peticion_id,)

        if db.execute_query(query, params):
            return jsonify({'message': 'Solicitud eliminada exitosamente.'}), 200
        else:
            return jsonify({'error': 'Error al eliminar la solicitud.'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


@peticionesBP.route('/peticion/<int:peticion_id>', methods=['PUT'])
def editar_peticion(peticion_id):
    try:
        # Obtener datos del cuerpo de la solicitud
        data = request.get_json()
        material = data.get('material')
        fecha_entrega = data.get('fecha_entrega')

        if not (material and fecha_entrega):
            return jsonify({'error': 'Todos los campos son obligatorios.'}), 400

        # Actualizar la solicitud en la base de datos
        query = """UPDATE SOLICITUD_MATERIAL 
                    SET material = %s, fecha_entrega = %s 
                    WHERE id = %s"""
        params = (material, fecha_entrega, peticion_id)

        if db.execute_query(query, params):
            return jsonify({'message': 'Solicitud actualizada exitosamente.'}), 200
        else:
            return jsonify({'error': 'Error al actualizar la solicitud.'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@peticionesBP.route('/peticiones', methods=['GET'])
def obtener_peticiones():
    try:
        # Consultar todas las solicitudes
        query = "SELECT * FROM SOLICITUD_MATERIAL"
        resultados = db.fetch_query(query)

        if resultados is not None:
            solicitudes = [
                {
                    'id': row[0],
                    'profesor_id': row[1],
                    'alumno_id': row[2],
                    'material': row[3],
                    'fecha_entrega': row[4]
                } for row in resultados
            ]
            return jsonify(solicitudes), 200
        else:
            return jsonify({'error': 'No se pudieron obtener las solicitudes.'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@peticionesBP.route('/crear_tarea/<int:solicitud_id>', methods=['POST'])
def crear_tarea(solicitud_id):
    try:
        # Obtener datos del cuerpo de la solicitud
        data = request.get_json()
        descripcion = data.get('descripcion', None)  # No obligatorio
        fecha_limite = data.get('fecha_limite', None)  # No obligatorio

        # Validar que la fecha límite sea válida si se proporciona
        if fecha_limite and not validar_fecha(fecha_limite):
            return jsonify({'error': 'La fecha límite no es válida. Formato esperado: YYYY-MM-DD.'}), 400

        # Verificar si la solicitud existe
        query = "SELECT id FROM SOLICITUD_MATERIAL WHERE id = %s"
        solicitud = db.fetch_query(query, (solicitud_id,))
        if not solicitud:
            return jsonify({'error': 'No se encontró la solicitud de material.'}), 404

        # Insertar la tarea en la base de datos
        query_tarea = """INSERT INTO TAREA (solicitud_id, descripcion, estado, fecha_limite) 
                         VALUES (%s, %s, 'Pendiente', %s)"""
        params_tarea = (solicitud_id, descripcion, fecha_limite if fecha_limite else None)

        if db.execute_query(query_tarea, params_tarea):
            return jsonify({'message': 'Tarea creada exitosamente.'}), 201
        else:
            return jsonify({'error': 'Error al crear la tarea.'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
def validar_fecha(fecha_str):
    """Valida que la fecha esté en el formato correcto (YYYY-MM-DD)."""

    try:
        return datetime.strptime(fecha_str, "%Y-%m-%d")
    except ValueError:
        return None
