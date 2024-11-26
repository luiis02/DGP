from flask import Blueprint, jsonify, request
from db_controller import DatabaseController

# Crear el Blueprint
profesorBP = Blueprint('profesor', __name__)

# Instanciar el controlador de la base de datos
db = DatabaseController()

@profesorBP.route('/alumno/historial', methods=['GET'])
def ver_historial_alumno():
    # Obtener el id_alumno de la solicitud
    id_alumno = request.args.get('id_alumno')

    # Validar que el id_alumno esté presente
    if not id_alumno:
        return jsonify({"message": "Falta el parámetro 'id_alumno'"}), 400

    try:
        # Consultar el historial de tareas realizadas por el alumno
        query = """
            SELECT t.descripcion, t.fecha_inicio, t.fecha_fin, t.estado AS estado_tarea
            FROM TAREA t
            INNER JOIN TAREA_ESTUDIANTE te ON t.id = te.id_tarea
            WHERE te.id_estudiante = %s
            ORDER BY t.fecha_fin DESC
        """
        historial = db.fetch_query(query, (id_alumno,))

        # Verificar si hay tareas en el historial
        if not historial:
            return jsonify({"message": "No se encontraron tareas para el alumno especificado"}), 404

        # Formatear el historial en un JSON
        historial_formateado = []
        for tarea in historial:
            historial_formateado.append({
                "descripcion": tarea[0],
                "fecha_inicio": tarea[1].strftime('%Y-%m-%d'),
                "fecha_fin": tarea[2].strftime('%Y-%m-%d'),
                "estado_tarea": tarea[3],
                "estado_alumno": tarea[4] if tarea[4] else "No finalizada"
            })

        # Devolver el historial
        return jsonify({
            "id_alumno": id_alumno,
            "historial": historial_formateado
        }), 200

    except Exception as e:

        return jsonify({"message": f"Error al obtener el historial del alumno: {str(e)}"}), 500