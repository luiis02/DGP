from flask import Blueprint, jsonify, request
from db_controller import DatabaseController

# Crear el Blueprint
tareasBP = Blueprint('tareas', __name__)

# Instanciar el controlador de la base de datos
db = DatabaseController()

@tareasBP.route('/asignar_estudiante/<int:tarea_id>/<int:estudiante_id>', methods=['POST'])
def asignar_estudiante_a_tarea(tarea_id, estudiante_id):

    # Asignar el estudiante a la tarea
    asignar_query = """
        INSERT INTO TAREA_ESTUDIANTE (id_tarea, id_estudiante)
        VALUES (%s, %s)
    """
    asignar_params = (tarea_id, estudiante_id)

    # Ejecutar la consulta para asignar el estudiante
    if db.execute_query(asignar_query, asignar_params):
        return jsonify({"message": "Estudiante asignado a la tarea exitosamente"}), 201
    else:
        return jsonify({"message": "Error al asignar el estudiante a la tarea"}), 500


@tareasBP.route('/cambiar_estado/<int:tarea_id>', methods=['POST'])
def marcar_tarea_como_finalizada(tarea_id):
    data = request.get_json()

    # Validar que los parámetros 'estudiante_id' y 'estado' estén presentes
    estado = data.get('estado')

    # Actualizar el estado de la tarea para ese estudiante
    actualizar_query = """
        UPDATE TAREA
        SET estado = %s
        WHERE id = %s
    """
    actualizar_params = (estado, tarea_id)

    # Ejecutar la consulta para actualizar el estado
    if db.execute_query(actualizar_query, actualizar_params):
        return jsonify({"message": "Estado cambiado"}), 200
    else:
        return jsonify({"message": "Error al marcar la tarea como finalizada"}), 500
    


# Añadir una nueva tarea
@tareasBP.route('/tareas', methods=['POST'])
def crear_tarea():

    data = request.get_json() # Obtener los datos del cuerpo de la solicitud

    #verificar que los campos esenciales estén presentes 
    required_fields = ['fecha_inicio', 'fecha_fin', 'prioridad', 'es_creada_por', 'id_estudiante']
    if not all(field in data for field in required_fields):
        missing_fields = [field for field in required_fields if field not in data]
        return jsonify({"error": f"Faltan los siguientes campos: {', '.join(missing_fields)}"}), 400

    # Asignar valores de los campos recibidos
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')
    estado = 'PENDIENTE'
    prioridad = data.get('prioridad')
    es_creada_por = data.get('es_creada_por')
    id_estudiante = data.get('id_estudiante')

    # Crear la tarea
    crear_tarea_query = "INSERT INTO TAREA (fecha_inicio, fecha_fin, estado, prioridad, es_creada_por, id_estudiante) VALUES (%s, %s, %s, %s, %s, %s)"

    try:
        db.execute_query(crear_tarea_query, (fecha_inicio, fecha_fin, estado, prioridad, es_creada_por, id_estudiante))
        return jsonify({"message": "Tarea creada exitosamente"}), 201
    except Exception as e:
        return jsonify({"message": f"Error al crear la tarea: {str(e)}"}), 500
    


@tareasBP.route('/ver_tareas/<int:estudiante_id>', methods=['GET'])
def ver_tareas_pendientes(estudiante_id):

    # Validar que el estudiante_id esté presente
    if not estudiante_id:
        return jsonify({"message": "Falta el parámetro 'estudiante_id'"}), 400

    try:
        # Consultar las tareas asignadas al estudiante
        query = """
            SELECT t.id, t.descripcion, t.estado AS tarea_estado
            FROM TAREA_ESTUDIANTE te
            JOIN TAREA t ON te.id_tarea = t.id
            WHERE te.id_estudiante = %s AND t.estado != 'FInalizada'
        """
        tareas = db.fetch_query(query, (estudiante_id,))

        # Verificar si el estudiante tiene tareas pendientes
        if not tareas:
            return jsonify({"message": "No tienes tareas pendientes."}), 200

        # Retornar las tareas con sus estados
        tareas_pendientes = [{"id_tarea": tarea[0], "descripcion": tarea[1], "estado": tarea[2]} for tarea in tareas]

        return jsonify({"tareas_pendientes": tareas_pendientes}), 200

    except Exception as e:
        return jsonify({"message": f"Error al obtener las tareas: {str(e)}"}), 500
    


@tareasBP.route('/ver_estado_tarea/<int:tarea_id>', methods=['GET'])
def ver_estado_tarea(tarea_id):

    if not tarea_id:
        return jsonify({"message": "Falta el parámetro 'tarea_id'"}), 400

    try:
        query = """
            SELECT ESTADO FROM TAREA WHERE ID = %s
        """
        tareas = db.fetch_query(query, (tarea_id,))

        # Verificar si el estudiante tiene tareas pendientes
        tareas_pendientes = [{"id_tarea": tarea_id, "estado": tarea[0]} for tarea in tareas]


        return jsonify(tareas_pendientes), 200

    except Exception as e:
        return jsonify({"message": f"Error al obtener las tareas: {str(e)}"}), 500
    



@tareasBP.route('/tareas/<int:estudiante_id>', methods=['GET'])
def obtener_tareas_estudiante(estudiante_id):

    # Validar que el estudiante_id esté presente
    if not estudiante_id:
        return jsonify({"message": "Falta el parámetro 'estudiante_id'"}), 400

    try:
        # Consultar las tareas asignadas al estudiante
        query  = "SELECT * FROM TAREA WHERE id_estudiante = %s"
        tareas = db.fetch_query(query, (estudiante_id,))

        # Verificar si el estudiante tiene tareas
        if not tareas:
            return jsonify({"message": "No tienes tareas."}), 200

        # Retornar las tareas con sus estados
        tareas = [
            {
                "id": tarea[0], 
                "fecha_inicio": tarea[1], 
                "fecha_fin": tarea[2],
                "estado": tarea[3], 
                "prioridad": tarea[4],
                "es_creada_por": tarea[5], 
                "id_estudiante": tarea[6],
                "id_solicitud": tarea[7]
            } for tarea in tareas
        ]

        return jsonify(tareas), 200

    except Exception as e:
        return jsonify({"message": f"Error al obtener las tareas: {str(e)}"}), 500
    

@tareasBP.route('/juego', methods=['POST'])
def crear_juego():
    """
    Endpoint para crear un registro de juego.
    Recibe un JSON con el campo 'url' para almacenarlo en la base de datos.
    """
    try:
        # Obtener los datos de la solicitud
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se proporcionaron datos"}), 400

        # Validar que todos los parámetros necesarios estén presentes
        url = data.get('url')
        if not url:
            return jsonify({"error": "El campo 'url' es requerido y no debe estar vacío"}), 400

        # Consulta para insertar la URL
        query = """
            INSERT INTO TAREA_JUEGO (url) VALUES (%s)
        """

        # Ejecutar la consulta
        if db.execute_query(query, (url,)):
            return jsonify({"success": "Juego almacenado"}), 201
        else:
            return jsonify({"error": "Error al almacenar el juego"}), 500

    except Exception as e:
        print(f"Error interno del servidor: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500
    
@tareasBP.route('/juego', methods=['GET'])
def obtener_juegos():
    # Consulta para obtener las IDs y URLs de los juegos
    query = "SELECT id, url FROM TAREA_JUEGO"
    try: 
        juegos = db.fetch_query(query)  # fetch_query devuelve una lista de tuplas
        print(juegos)  # Verificar el contenido recuperado

        # Convertir las tuplas en una lista de diccionarios con id y url
        juegos_list = [{"id": juego[0], "url": juego[1]} for juego in juegos] if juegos else None

        return jsonify(juegos_list), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}), 500

@tareasBP.route('/juego/<int:id>/', methods=['DELETE'])
def borrar_juego(id):
    # Consulta para borrar el juego con el id especificado
    query = "DELETE FROM TAREA_JUEGO WHERE id = %s"
    try:
        # Pasar el parámetro como una tupla
        if db.execute_query(query, (id,)):
            return jsonify({"success": "Juego eliminado"}), 200
        else:
            return jsonify({}), 404
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}), 500
