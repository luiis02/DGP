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