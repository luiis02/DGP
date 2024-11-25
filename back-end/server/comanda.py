from flask import Blueprint, jsonify, request
from db_controller import DatabaseController
from datetime import datetime

comandaBP = Blueprint('comanda', __name__)

db = DatabaseController()

@comandaBP.route('/comanda', methods=['POST'])
def crear_tarea_comanda():
    # Obtener los datos de la solicitud
    data = request.get_json()

    # Validar que todos los parámetros necesarios estén presentes
    descripcion = data.get('descripcion')
    fecha_inicio = data.get('fecha_inicio')
    fecha_entrega = data.get('fecha_entrega')
    estudiantes = data.get('estudiantes')

    print(descripcion)
    print(fecha_inicio)
    print(fecha_entrega)
    print(estudiantes)


    # Verificar si faltan parámetros
    if not descripcion or not fecha_inicio or not fecha_entrega or not estudiantes:
        return jsonify({"message": "Faltan parámetros requeridos"}), 400

    try:
        # Convertir las fechas a objetos datetime
        fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%d')
        fecha_entrega = datetime.strptime(fecha_entrega, '%Y-%m-%d')

        # Crear la tarea de comanda, incluyendo el tipo
        tarea_query = """
            INSERT INTO TAREA (descripcion, fecha_inicio, fecha_fin, estado, tipo)
            VALUES (%s, %s, %s, %s, %s)
        """
        tarea_params = (descripcion, fecha_inicio, fecha_entrega, 'Pendiente', 'comanda')

        # Ejecutar la consulta para insertar la tarea
        if db.execute_query(tarea_query, tarea_params):
            # Obtener el ID de la tarea recién creada
            tarea_id = db.fetch_query("SELECT LAST_INSERT_ID()")[0][0]

            # Asignar estudiantes a la tarea
            for estudiante_id in estudiantes:
                asignar_estudiante_query = """
                    INSERT INTO TAREA_ESTUDIANTE (id_tarea, id_estudiante)
                    VALUES (%s, %s)
                """
                if not db.execute_query(asignar_estudiante_query, (tarea_id, estudiante_id)):
                    return jsonify({"message": "Error al asignar estudiantes a la tarea"}), 500

            # Si todo fue bien, responder con éxito
            return jsonify({"message": "Tarea de comanda creada y estudiantes asignados exitosamente"}), 201

        else:
            return jsonify({"message": "Error al crear la tarea"}), 500

    except Exception as e:
        return jsonify({"message": f"Error al procesar la solicitud: {str(e)}"}), 500

@comandaBP.route('/comanda/<int:tarea_id>', methods=['PUT'])
def editar_tarea_comanda(tarea_id):
    # Obtener los datos de la solicitud
    data = request.get_json()

    # Validar los parámetros recibidos
    descripcion = data.get('descripcion')
    fecha_inicio = data.get('fecha_inicio')
    fecha_entrega = data.get('fecha_entrega')
    estado = data.get('estado')

    # Verificar si al menos uno de los parámetros es válido para actualizar
    if not descripcion and not fecha_inicio and not fecha_entrega and not estado:
        return jsonify({"message": "No se proporcionaron parámetros para actualizar"}), 400

    # Crear una lista para almacenar las actualizaciones
    updates = []
    params = []

    # Si se proporcionó una nueva descripción
    if descripcion:
        updates.append("descripcion = %s")
        params.append(descripcion)

    # Si se proporcionó una nueva fecha de inicio
    if fecha_inicio:
        try:
            fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%d')
            updates.append("fecha_inicio = %s")
            params.append(fecha_inicio)
        except ValueError:
            return jsonify({"message": "Formato de fecha_inicio incorrecto. Use YYYY-MM-DD."}), 400

    # Si se proporcionó una nueva fecha de entrega
    if fecha_entrega:
        try:
            fecha_entrega = datetime.strptime(fecha_entrega, '%Y-%m-%d')
            updates.append("fecha_fin = %s")
            params.append(fecha_entrega)
        except ValueError:
            return jsonify({"message": "Formato de fecha_entrega incorrecto. Use YYYY-MM-DD."}), 400

    # Si se proporcionó un nuevo estado
    if estado:
        updates.append("estado = %s")
        params.append(estado)

    # Agregar el ID de la tarea al final de los parámetros
    params.append(tarea_id)

    # Construir la consulta de actualización
    set_clause = ", ".join(updates)
    update_query = f"""
        UPDATE TAREA
        SET {set_clause}
        WHERE id = %s
    """

    # Ejecutar la consulta para actualizar la tarea
    if db.execute_query(update_query, params):
        return jsonify({"message": "Tarea de comanda actualizada exitosamente"}), 200
    else:
        return jsonify({"message": "Error al actualizar la tarea"}), 500

@comandaBP.route('/comanda', methods=['GET'])
def obtener_tareas_comanda():
    try:
        # Consulta para obtener todas las tareas de comanda
        query = """
            SELECT id, descripcion, fecha_inicio, fecha_fin, estado, tipo
            FROM TAREA
            WHERE tipo = 'comanda'
        """
        
        # Ejecutar la consulta
        result = db.fetch_query(query)

        # Verificar si se encontraron tareas
        if not result:
            return jsonify({"message": "No se encontraron tareas de comanda"}), 404

        # Formatear las tareas en una lista de diccionarios
        tareas = []
        for tarea in result:
            tarea_dict = {
                "id": tarea[0],
                "descripcion": tarea[1],
                "fecha_inicio": tarea[2].strftime('%Y-%m-%d'),
                "fecha_fin": tarea[3].strftime('%Y-%m-%d'),
                "estado": tarea[4],
                "tipo": tarea[5]
            }
            tareas.append(tarea_dict)

        return jsonify({"tareas": tareas}), 200

    except Exception as e:
        return jsonify({"message": f"Error al procesar la solicitud: {str(e)}"}), 500

@comandaBP.route('/comanda/<int:tarea_id>', methods=['DELETE'])

def eliminar_tarea_comanda(tarea_id):
    try:
        # Consulta para eliminar la tarea de comanda
        query = "DELETE FROM TAREA WHERE id = %s AND tipo = 'comanda'"
        
        # Ejecutar la consulta
        if db.execute_query(query, (tarea_id,)):
            return jsonify({"message": "Tarea de comanda eliminada exitosamente"}), 200
        else:
            return jsonify({"message": "No se encontró la tarea de comanda para eliminar"}), 404
        
    except Exception as e:
        return jsonify({"message": f"Error al procesar la solicitud: {str(e)}"}), 500