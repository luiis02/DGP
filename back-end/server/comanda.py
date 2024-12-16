from flask import Blueprint, jsonify, request
from db_controller import DatabaseController
from datetime import datetime

comandaBP = Blueprint('comanda', __name__)

db = DatabaseController()

@comandaBP.route('/comanda', methods=['POST'])
def crear_tarea_comanda():
    data = request.json
    alumno_id = data.get('alumno_id')
    screen = data.get('screen')
    fecha = data.get('fecha_entrega')
    url = data.get('url')
    print(data)
    # Validaciones básicas
    if  not alumno_id:
        return jsonify({"error": "Datos insuficientes o inválidos"}), 400

    query = """
        INSERT INTO TAREA_COMANDAS (alumno_id, screen, fecha, url)
        VALUES (%s, %s, %s, %s)
    """
    params = (alumno_id, screen, fecha, url)

    try:
        result = db.execute_query(query, params)
        return jsonify({"message": "Tarea de comanda creada correctamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

@comandaBP.route('/menu', methods=['POST'])
def create_menu():
    data = request.json
    nombre = data.get('nombre')
    cantidad = data.get('cantidad')
    url = data.get('url', "http")
    if not nombre:
        return jsonify({"error": "El campo 'nombre' es obligatorio"}), 400

    query = "INSERT INTO MENU (nombre, cantidad, url) VALUES (%s, %s, %s)"
    params = (nombre, cantidad, url)

    try:
        print("Antes de la query")
        result = db.execute_query(query, params)
        print("Despues de la query")
        return jsonify({"message": "Menú creado correctamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener todos los menús (READ):
@comandaBP.route('/menu', methods=['GET'])
def get_menus():
    query = "SELECT * FROM MENU"

    try:
        menus = db.fetch_query(query)
        return jsonify(menus), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener un menú por ID (READ):
@comandaBP.route('/menus/<int:id>', methods=['GET'])
def get_menu(id):
    query = "SELECT * FROM MENUS WHERE id = %s"
    params = (id,)

    try:
        menu = db.fetch_query(query, params)
        if menu:
            return jsonify(menu), 200
        else:
            return jsonify({"error": "Menú no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Actualizar un menú por ID (UPDATE):
@comandaBP.route('/menus/<int:id>', methods=['PUT'])
def update_menu(id):
    data = request.json
    nombre = data.get('nombre')
    descripcion = data.get('descripcion', None)
    imagen_url = data.get('imagen_url', None)

    if not nombre:
        return jsonify({"error": "El campo 'nombre' es obligatorio"}), 400

    query = "UPDATE MENUS SET nombre = %s, descripcion = %s, imagen_url = %s WHERE id = %s"
    params = (nombre, descripcion, imagen_url, id)

    try:
        rows_affected = db.execute_query(query, params)
        if rows_affected > 0:
            return jsonify({"message": "Menú actualizado correctamente"}), 200
        else:
            return jsonify({"error": "Menú no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Eliminar un menú por ID (DELETE):
@comandaBP.route('/menus/<int:id>', methods=['DELETE'])
def delete_menu(id):
    query = "DELETE FROM MENUS WHERE id = %s"
    params = (id,)

    try:
        rows_affected = db.execute_query(query, params)
        if rows_affected > 0:
            return jsonify({"message": "Menú eliminado correctamente"}), 200
        else:
            return jsonify({"error": "Menú no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
# CRUD para las tareas de comanda de comedor:
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #


# Obtener todas las tareas de comanda (READ):
@comandaBP.route('/comanda', methods=['GET'])
def get_comandas():
    query = """
        SELECT tc.id, tc.aula_id, a.nombre AS aula_nombre, 
               tc.menu_id, m.nombre AS menu_nombre,
               tc.alumno_id, u.nombre AS alumno_nombre,
               tc.cantidad, tc.screen, tc.fecha
        FROM TAREA_COMANDAS tc
        JOIN AULAS a ON tc.aula_id = a.id
        JOIN MENUS m ON tc.menu_id = m.id
        JOIN USUARIO u ON tc.alumno_id = u.id
    """

    try:
        comandas = db.fetch_query(query)
        return jsonify(comandas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtener todas las tareas de comanda para un alumno por su ID (READ):
@comandaBP.route('/comanda/<int:alumno_id>', methods=['GET'])
def get_comandas_por_alumno(alumno_id):
    query = """
        SELECT tc.id, tc.aula_id, a.nombre AS aula_nombre, 
               tc.menu_id, m.nombre AS menu_nombre,
               tc.alumno_id, u.nombre AS alumno_nombre,
               tc.cantidad, tc.screen, tc.fecha
        FROM TAREA_COMANDAS tc
        JOIN AULAS a ON tc.aula_id = a.id
        JOIN MENUS m ON tc.menu_id = m.id
        JOIN USUARIO u ON tc.alumno_id = u.id
        WHERE tc.alumno_id = %s
    """
    params = (alumno_id,)

    try:
        comandas = db.fetch_query(query, params)
        if comandas:
            return jsonify(comandas), 200
        else:
            return jsonify({"message": "No se encontraron tareas para el alumno especificado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Actualizar una tarea de comanda por ID (UPDATE):
@comandaBP.route('/comanda/<int:id>', methods=['PUT'])
def update_comanda(id):
    data = request.json
    aula_id = data.get('aula_id')
    menu_id = data.get('menu_id')
    alumno_id = data.get('alumno_id')
    cantidad = data.get('cantidad')
    screen = data.get('screen')

    # Validaciones básicas
    if not aula_id or not menu_id or not alumno_id or cantidad <= 0:
        return jsonify({"error": "Datos insuficientes o inválidos"}), 400

    query = """
        UPDATE TAREA_COMANDAS 
        SET aula_id = %s, menu_id = %s, alumno_id = %s, cantidad = %s, screen = %s
        WHERE id = %s
    """
    params = (aula_id, menu_id, alumno_id, cantidad, screen, id)

    try:
        rows_affected = db.execute_query(query, params)
        if rows_affected > 0:
            return jsonify({"message": "Tarea actualizada correctamente"}), 200
        else:
            return jsonify({"error": "Tarea no encontrada"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Eliminar una tarea de comanda por ID (DELETE):
@comandaBP.route('/comanda/<int:id>', methods=['DELETE'])
def delete_comanda(id):
    query = "DELETE FROM TAREA_COMANDAS WHERE id = %s"
    params = (id,)

    try:
        rows_affected = db.execute_query(query, params)
        if rows_affected > 0:
            return jsonify({"message": "Tarea eliminada correctamente"}), 200
        else:
            return jsonify({"error": "Tarea no encontrada"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500