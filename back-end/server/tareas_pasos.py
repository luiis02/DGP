from flask import Blueprint, jsonify, request
from db_controller import DatabaseController
from datetime import datetime

tasksStepsBP = Blueprint('tasks_steps', __name__)
db_controller = DatabaseController()



# Obtener todas las tareas de un alumno:
@tasksStepsBP.route('/tasks/<int:student_id>', methods=['GET'])
def get_tasks(student_id):
    # Obtener parámetros de consulta
    status = request.args.get('status')  # 'in_progress', 'completed' o 'not_started'
    sort = request.args.get('sort', 'false') == 'true'

    # Construcción de la consulta base
    query = """SELECT * FROM Tasks WHERE student_id = %s"""
    params = [student_id]

    # Filtrar por estado si se proporciona
    if status in ['in_progress', 'completed', 'not_started']:
        query += " AND status = %s"
        params.append(status)

    # Ordenar por prioridad si la bandera 'sort' es verdadera
    if sort:
        query += " ORDER BY FIELD(priority, 'high', 'medium', 'low')"

    # Imprimir consulta y parámetros para debug
    print("Executing query:", query)
    print("With parameters:", params)

    # Ejecutar la consulta:
    try:
        result = db_controller.fetch_query(query, params)
        return jsonify(result), 200
    except Exception as e:
        print("Error al obtener las tareas:", str(e))
        return jsonify({'error': str(e)}), 500

# Obtener todas las tareas de un estudiante, excluyendo las tareas completadas:
@tasksStepsBP.route('/tasks/<int:student_id>/exclude-completed', methods=['GET'])
def get_tasks_exclude_completed(student_id):
    try:
        status = request.args.get('status', None)
        sort = request.args.get('sort', 'false') == 'true'

        # Construcción de la consulta base
        query = """SELECT * FROM Tasks WHERE student_id = %s AND status != 'completed'"""
        params = [student_id]

        # Ordenar por prioridad si se solicita
        if sort:
            query += " ORDER BY FIELD(priority, 'high', 'medium', 'low')"
            
        # Debug de la consulta
        print("Executing query (exclude completed):", query)
        print("With parameters:", params)

        # Ejecutar la consulta
        result = db_controller.fetch_query(query, params)
        return jsonify(result), 200
    except Exception as e:
        print("Error al obtener las tareas excluyendo completadas:", str(e))
        return jsonify({'error': str(e)}), 500


# Obtener todos los pasos de una tarea:
@tasksStepsBP.route('/tasks/<int:task_id>/steps', methods=['GET'])
def get_steps(task_id):
    # Construcción de la consulta base
    query = """SELECT * FROM Steps WHERE task_id = %s"""
    params = [task_id]

    # Imprimir consulta y parámetros para debug
    print("Executing query:", query)
    print("With parameters:", params)

    # Ejecutar la consulta:
    try:
        result = db_controller.fetch_query(query, params)
        return jsonify(result), 200
    except Exception as e:
        print("Error al obtener los pasos:", str(e))
        return jsonify({'error': str(e)}), 500

# Marcar una tarea como completada:
@tasksStepsBP.route('/tasks/<int:task_id>/complete', methods=['PUT'])
def mark_task_completed(task_id):
    # Construcción de la consulta para actualizar el estado de la tarea
    query = """UPDATE Tasks SET status = 'completed', updated_at = NOW() WHERE id = %s"""
    params = [task_id]

    # Imprimir consulta y parámetros para debug
    print("Executing query:", query)
    print("With parameters:", params)

    # Ejecutar la consulta
    try:
        result = db_controller.execute_query(query, params)

        # Verificar si se actualizó alguna fila
        if result > 0:
            return jsonify({"message": "Tarea marcada como completada."}), 200
        else:
            return jsonify({"error": "Tarea no encontrada o ya completada."}), 404
    except Exception as e:
        print("Error al marcar la tarea como completada:", str(e))
        return jsonify({'error': str(e)}), 500
    

# Modificar el estado de un paso de una tarea:
@tasksStepsBP.route('/step/<int:step_id>/modify_status', methods=['PUT'])
def modify_status(step_id):
    # Obtener datos JSON de la solicitud
    data = request.get_json()
    if not data or 'status' not in data:
        return jsonify({"error": "El campo 'status' es requerido."}), 400

    # Obtener el estado del JSON
    new_status = data['status']

    # Verificar que el estado sea válido
    valid_statuses = ['in_progress', 'completed', 'not_started']
    if new_status not in valid_statuses:
        return jsonify({"error": f"El estado '{new_status}' no es válido."}), 400

    # Construcción de la consulta para actualizar el estado de la tarea
    query = """UPDATE Steps SET status = %s, updated_at = NOW() WHERE id = %s"""
    params = [new_status, step_id]

    # Imprimir consulta y parámetros para debug
    print("Executing query:", query)
    print("With parameters:", params)

    # Ejecutar la consulta
    try:
        result = db_controller.execute_query(query, params)

        # Verificar si se actualizó alguna fila
        if result > 0:
            return jsonify({"message": "Estado del paso de la tarea cambiado."}), 200
        else:
            return jsonify({"error": "El estado del paso de la tarea no se ha podido cambiar."}), 404
    except Exception as e:
        print("Error al marcar la tarea como completada:", str(e))
        return jsonify({'error': str(e)}), 500
    
# Iniciar una tarea:
@tasksStepsBP.route('/tasks/<int:task_id>/start', methods=['PUT'])
def start_task(task_id):
    # Construcción de la consulta para actualizar el estado de la tarea
    query = """UPDATE Tasks SET status = 'in_progress', updated_at = NOW() WHERE id = %s"""
    params = [task_id]

    # Imprimir consulta y parámetros para debug
    print("Executing query:", query)
    print("With parameters:", params)

    # Ejecutar la consulta
    try:
        result = db_controller.execute_query(query, params)

        # Verificar si se actualizó alguna fila
        if result > 0:
            return jsonify({"message": "La tarea se ha iniciado correctamente."}), 200
        else:
            return jsonify({"error": "La tarea no ha podido iniciarse."}), 404
    except Exception as e:
        print("Error al iniciar la tarea:", str(e))
        return jsonify({'error': str(e)}), 500