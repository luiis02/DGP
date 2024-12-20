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
    
@tareasBP.route('/solicitud', methods=['GET'])
def obtener_solicitudes():
    """
    Endpoint para obtener todas las solicitudes con sus detalles.
    Incluye el nombre del profesor, el aula, la lista de materiales y las cantidades solicitadas.
    """
    try:
        # Consulta para obtener la información de las solicitudes, el profesor y los materiales
        query = """
            SELECT sm.id AS solicitud_id, 
                   u.nombre AS profesor_nombre,  
                   sm.aula,
                   sm.fecha_entrega,
                   ma.nombre_material, 
                   smd.cantidad_solicitada
            FROM SOLICITUD_MATERIAL sm
            JOIN USUARIO u ON sm.profesor_id = u.id
            JOIN SOLICITUD_MATERIAL_DETALLE smd ON sm.id = smd.solicitud_id
            JOIN MATERIALES_ALMACEN ma ON smd.id_material = ma.id_material
        """
        solicitudes = db.fetch_query(query)  # Debe devolver una lista de tuplas o diccionarios

        if not solicitudes:
            return jsonify({"message": "No hay solicitudes registradas"}), 200

        # Organizar los resultados en un formato estructurado
        solicitudes_dict = {}
        for solicitud in solicitudes:
            # Desestructurar según el formato de los datos devueltos
            solicitud_id = solicitud['solicitud_id']
            profesor_nombre = solicitud['profesor_nombre']
            aula = solicitud['aula']
            fecha_entrega = solicitud['fecha_entrega']
            nombre_material = solicitud['nombre_material']
            cantidad_solicitada = solicitud['cantidad_solicitada']

            # Agrupar materiales por solicitud
            if solicitud_id not in solicitudes_dict:
                solicitudes_dict[solicitud_id] = {
                    "id": solicitud_id,
                    "profesor_nombre": profesor_nombre,
                    "aula": aula,
                    "fecha_entrega": str(fecha_entrega),  # Convertir a string para JSON
                    "materiales": []
                }

            solicitudes_dict[solicitud_id]["materiales"].append({
                "nombre_material": nombre_material,
                "cantidad_solicitada": cantidad_solicitada
            })

        # Convertir a una lista de solicitudes
        solicitudes_list = list(solicitudes_dict.values())

        return jsonify(solicitudes_list), 200

    except Exception as e:
        return jsonify({"error": "Error al obtener las solicitudes", "details": str(e)}), 500


    
@tareasBP.route('/solicitud', methods=['POST'])
def crear_solicitud():
    """
    Endpoint para crear una nueva solicitud con materiales.
    También actualiza la tabla MATERIALES_ALMACEN al restar las cantidades solicitadas.
    """
    data = request.get_json()
    # Validar datos
    if not data:
        return jsonify({"error": "No se proporcionaron datos"}), 400

    profesor_id = data.get('profesor_id')
    fecha_entrega = data.get('fecha_entrega')
    aula = data.get('aula')
    materiales = data.get('material')

    if not profesor_id or not fecha_entrega or not materiales:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    try:
        # Crear la solicitud principal
        crear_solicitud_query = """
            INSERT INTO SOLICITUD_MATERIAL (profesor_id, fecha_entrega, aula)
            VALUES (%s, %s, %s)
        """
        db.execute_query(crear_solicitud_query, (profesor_id, fecha_entrega, aula))
        solicitud_id_query = """SELECT LAST_INSERT_ID() AS id"""
        solicitud_id_result = db.fetch_query(solicitud_id_query)
        solicitud_id = solicitud_id_result[0]['id']
        print(solicitud_id)
        # Insertar los detalles de la solicitud y actualizar el almacén
        insertar_detalle_query = """
            INSERT INTO SOLICITUD_MATERIAL_DETALLE (solicitud_id, id_material, cantidad_solicitada)
            VALUES (%s, %s, %s)
        """
        actualizar_almacen_query = """
            UPDATE MATERIALES_ALMACEN
            SET cantidad = cantidad - %s
            WHERE id_material = %s
        """
        for material in materiales:
            id_material = material.get('id_material')
            cantidad = material.get('cantidad')
            if id_material is None or cantidad is None:
                return jsonify({"error": "Datos de material incompletos"}), 400
            if cantidad > 0: 
                # Insertar detalle
                db.execute_query(insertar_detalle_query, (solicitud_id, id_material, cantidad))
                # Actualizar almacén
                db.execute_query(actualizar_almacen_query, (cantidad, id_material))
        return jsonify({"message": "Solicitud creada correctamente", "solicitud_id": solicitud_id}), 201

    except Exception as e:
        return jsonify({"error": "Error al crear la solicitud", "details": str(e)}), 500

@tareasBP.route('/solicitud/<int:solicitud_id>', methods=['PUT'])
def actualizar_solicitud(solicitud_id):
    """
    Endpoint para actualizar una solicitud existente y sus detalles.
    También actualiza los valores de la tabla MATERIALES_ALMACEN.
    """
    data = request.get_json()

    # Validar datos
    if not data:
        return jsonify({"error": "No se proporcionaron datos"}), 400

    fecha_entrega = data.get('fecha_entrega')
    materiales = data.get('material')

    if not fecha_entrega or not materiales:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    try:
        # Actualizar la solicitud principal
        actualizar_solicitud_query = """
            UPDATE SOLICITUD_MATERIAL
            SET fecha_entrega = %s
            WHERE id = %s
        """
        db.execute_query(actualizar_solicitud_query, (fecha_entrega, solicitud_id))

        # Eliminar los detalles existentes
        eliminar_detalle_query = """
            DELETE FROM SOLICITUD_MATERIAL_DETALLE
            WHERE solicitud_id = %s
        """
        db.execute_query(eliminar_detalle_query, (solicitud_id,))

        # Insertar los nuevos detalles
        insertar_detalle_query = """
            INSERT INTO SOLICITUD_MATERIAL_DETALLE (solicitud_id, id_material, cantidad_solicitada)
            VALUES (%s, %s, %s)
        """
        for material in materiales:
            id_material = material.get('id_material')
            cantidad_solicitada = material.get('cantidad')

            if not id_material or not cantidad_solicitada:
                return jsonify({"error": "Datos de material incompletos"}), 400

            # Insertar detalle
            db.execute_query(insertar_detalle_query, (solicitud_id, id_material, cantidad_solicitada))

            # Actualizar los valores en MATERIALES_ALMACEN
            actualizar_almacen_query = """
                UPDATE MATERIALES_ALMACEN
                SET cantidad = cantidad - %s
                WHERE id_material = %s
            """
            db.execute_query(actualizar_almacen_query, (cantidad_solicitada, id_material))

        return jsonify({"message": "Solicitud actualizada correctamente"}), 200

    except Exception as e:
        return jsonify({"error": "Error al actualizar la solicitud", "details": str(e)}), 500

@tareasBP.route('/solicitud/<int:solicitud_id>', methods=['DELETE'])
def eliminar_solicitud(solicitud_id):
    """
    Endpoint para eliminar una solicitud y sus detalles.
    """
    try:
        # Recuperar los materiales de la solicitud antes de eliminarla
        recuperar_materiales_query = """
            SELECT id_material, cantidad_solicitada
            FROM SOLICITUD_MATERIAL_DETALLE
            WHERE solicitud_id = %s
        """
        materiales = db.fetch_query(recuperar_materiales_query, (solicitud_id,))

        # Actualizar el almacén antes de eliminar los detalles
        for material in materiales:
            id_material, cantidad_solicitada = material
            actualizar_almacen_query = """
                UPDATE MATERIALES_ALMACEN
                SET cantidad = cantidad + %s
                WHERE id_material = %s
            """
            db.execute_query(actualizar_almacen_query, (cantidad_solicitada, id_material))

        # Eliminar los detalles de la solicitud
        eliminar_detalle_query = """
            DELETE FROM SOLICITUD_MATERIAL_DETALLE
            WHERE solicitud_id = %s
        """
        db.execute_query(eliminar_detalle_query, (solicitud_id,))

        # Eliminar la solicitud principal
        eliminar_solicitud_query = """
            DELETE FROM SOLICITUD_MATERIAL
            WHERE id = %s
        """
        db.execute_query(eliminar_solicitud_query, (solicitud_id,))

        return jsonify({"message": "Solicitud eliminada correctamente"}), 200

    except Exception as e:
        return jsonify({"error": "Error al eliminar la solicitud", "details": str(e)}), 500


@tareasBP.route('/inventario', methods=['GET'])
def obtener_tareas_inventario():
    """
    Endpoint para obtener todas las tareas de inventario.
    """
    try:
        query = "SELECT * FROM TAREA_INVENTARIO"
        tareas_inventario = db.fetch_query(query)

        if not tareas_inventario:
            return jsonify({"message": "No hay tareas de inventario registradas."}), 200

        # Convertir las tuplas en una lista de diccionarios
        tareas_inventario_list = [
            {
                "id": tarea[0], 
                "fecha_inicio": tarea[1],
                "fecha_fin": tarea[2], 
                "estado": tarea[3], 
                "prioridad": tarea[4], 
                "es_creada_por": tarea[5],
                "id_estudiante": tarea[6]
            } for tarea in tareas_inventario
        ]

        return jsonify({"tareas_inventario": tareas_inventario_list}), 200

    except Exception as e:
        return jsonify({"error": f"Error al obtener las tareas de inventario: {str(e)}"}), 500

@tareasBP.route('/inventario/<int:id>', methods=['GET'])
def obtener_tarea(id):
    """
    Endpoint para obtener todas las tareas de inventario.
    """
    try:
        query = "SELECT * FROM TAREA_INVENTARIO"
        tareas_inventario = db.fetch_query(query)

        return jsonify({"tareas_inventario": tareas_inventario}), 200

    except Exception as e:
        return jsonify({"error": f"Error al obtener las tareas de inventario: {str(e)}"}), 500

@tareasBP.route('/inventario', methods=['POST'])
def crear_tarea_inventario():
    """
    Endpoint para crear una nueva tarea de inventario.
    """
    data = request.get_json()

    # Validar los campos necesarios
    required_fields = ['fecha_inicio', 'fecha_fin', 'prioridad', 'id_estudiante']
    if not all(field in data for field in required_fields):
        missing_fields = [field for field in required_fields if field not in data]
        return jsonify({"error": f"Faltan los siguientes campos: {', '.join(missing_fields)}"}), 400
    print(data)
    # Asignar valores de los campos recibidos
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')
    estado = 'PENDIENTE'
    prioridad = data.get('prioridad')
    id_estudiante = data.get('id_estudiante')
    aula = data.get('aula')
    url = data.get('url')
    screen = data.get('screen')
    solicitud_id = data.get('solicitud_id')

    # Crear la tarea de inventario
    crear_tarea_inventario_query = """
        INSERT INTO TAREA_INVENTARIO (fecha_inicio, fecha_fin, estado, prioridad, estudiante_id, aula, url_imagen, screen, solicitud_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    try:
        db.execute_query(crear_tarea_inventario_query, (fecha_inicio, fecha_fin, estado, prioridad, id_estudiante, aula, url, screen, solicitud_id))
        return jsonify({"message": "Tarea de inventario creada exitosamente"}), 201
    except Exception as e:
        return jsonify({"message": f"Error al crear la tarea de inventario: {str(e)}"}), 500

@tareasBP.route('/inventario/<int:tarea_id>', methods=['PUT'])
def actualizar_tarea_inventario(tarea_id):
    """
    Endpoint para actualizar una tarea de inventario existente.
    """
    data = request.get_json()

    # Validar los campos necesarios
    estado = data.get('estado')
    if not estado:
        return jsonify({"error": "El campo 'estado' es obligatorio."}), 400

    try:
        # Actualizar la tarea de inventario
        actualizar_query = """
            UPDATE TAREA_INVENTARIO
            SET estado = %s
            WHERE id = %s
        """
        db.execute_query(actualizar_query, (estado, tarea_id))

        return jsonify({"message": "Tarea de inventario actualizada exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": f"Error al actualizar la tarea de inventario: {str(e)}"}), 500

@tareasBP.route('/inventario/<int:tarea_id>', methods=['DELETE'])
def eliminar_tarea_inventario(tarea_id):
    """
    Endpoint para eliminar una tarea de inventario.
    """
    try:
        # Eliminar la tarea de inventario
        eliminar_query = """
            DELETE FROM TAREA_INVENTARIO WHERE id = %s
        """
        result = db.execute_query(eliminar_query, (tarea_id,))

        if result:
            return jsonify({"message": "Tarea de inventario eliminada correctamente"}), 200
        else:
            return jsonify({"error": "No se encontró la tarea de inventario."}), 404

    except Exception as e:
        return jsonify({"error": f"Error al eliminar la tarea de inventario: {str(e)}"}), 500


@tareasBP.route('/allTareas/<int:id>', methods=['GET'])
def obtener_tareas(id):
    """
    Endpoint para obtener todas las tareas de comanda y de inventario de un estudiante específico.
    """
    try:
        # Consultar las tareas de comanda asociadas al estudiante
        queryComanda = """
            SELECT tc.screen, tc.fecha, tc.url 
            FROM TAREA_COMANDAS tc
            WHERE tc.alumno_id = %s
        """
        tareas_comandas = db.fetch_query(queryComanda, (id,))

        # Consultar las tareas de inventario asociadas al estudiante
        queryTareaInventario = """
            SELECT ti.id AS tarea_inventario_id, ti.aula, ti.url_imagen,
                   ti.screen, ti.fecha_inicio AS fecha_inicio_inventario, 
                   ti.fecha_fin AS fecha_fin_inventario, ti.estado AS estado_inventario, 
                   ti.prioridad AS prioridad_inventario, ti.estudiante_id
            FROM TAREA_INVENTARIO ti
            WHERE ti.estudiante_id = %s
        """
        tareas_inventario = db.fetch_query(queryTareaInventario, (id,))

        # Combinar las tareas de comanda e inventario en una sola lista
        tareas_totales = []

        if tareas_comandas:
            for tarea in tareas_comandas: 
                screen, fecha, url = tarea
                tareas_totales.append({
                    "tipo": "comanda",
                    "tareas": {
                        "screen": screen,
                        "url_imagen": url
                    }
                })
        
        if tareas_inventario:
            for tarea in tareas_inventario:
                tarea_inventario_id, aula, url_imagen, screen, fecha_inicio_inventario, fecha_fin_inventario, estado_inventario, prioridad_inventario, estudiante_id = tarea
                tareas_totales.append({
                    "tipo": "inventario",
                    "tareas": {
                        "url_imagen": url_imagen,
                        "screen": screen,
                    }
                })

        print(tareas_totales)
        # Verificar si se encontraron tareas
        if not tareas_totales:
            return jsonify({"message": "No se encontraron tareas para este estudiante."}), 200

        return jsonify({"tareas": tareas_totales}), 200

    except Exception as e:
        return jsonify({"error": f"Error al obtener las tareas: {str(e)}"}), 500

@tareasBP.route("/materiales/<int:id>", methods=['GET'])
def obtener_materiales(id):
    """
    Endpoint para obtener los materiales asociados a las tareas de inventario de un estudiante,
    junto con la información del profesor y el aula de la solicitud.
    """
    try:
        # Consulta para obtener los materiales asociados a las tareas de inventario del estudiante
        query = """
            SELECT t.aula,
                    p.nombre AS profesor_nombre, 
                    m.nombre_material, smd.cantidad_solicitada
            FROM 
                TAREA_INVENTARIO t 
            JOIN SOLICITUD_MATERIAL sm ON sm.id =  t.solicitud_id
            JOIN USUARIO p ON p.id = sm.profesor_id
            JOIN SOLICITUD_MATERIAL_DETALLE smd ON smd.solicitud_id = sm.id
            JOIN MATERIALES_ALMACEN m ON m.id_material = smd.id_material
            WHERE 
                t.estudiante_id = %s
        """
        
        # Realizar la consulta para obtener los datos
        materiales_estudiante = db.fetch_query(query, (id,))
        
        # Verificar si no hay materiales asociados a este estudiante
        if not materiales_estudiante:
            return jsonify({"message": "No hay materiales asociados a las tareas de este estudiante."}), 404
        
        # Organizar los resultados en un formato estructurado
        materiales_dict = []
        for material in materiales_estudiante:
            # Organizar los materiales en el formato deseado
            materiales_dict.append({
                "aula": material['aula'],
                "profesor": material['profesor_nombre'],
                "material": [{
                    "nombre": material['nombre_material'],
                    "cantidad": material['cantidad_solicitada']
                }]
            })
        # Retornar los resultados en formato JSON
        return jsonify({
            "materiales": materiales_dict
        }), 200

    except Exception as e:
        return jsonify({"error": f"Error al obtener los materiales: {str(e)}"}), 500

    
def obtener_materiales(id):
    """
    Endpoint para obtener los materiales asociados a las tareas de inventario de un estudiante,
    junto con la información del profesor y el aula de la solicitud.
    """
    try:
        # Consulta para obtener los materiales asociados a las tareas de inventario del estudiante
        query = """
            SELECT t.aula,
                    p.nombre AS profesor_nombre, 
                    m.nombre_material, smd.cantidad_solicitada
            FROM 
                TAREA_INVENTARIO t 
            JOIN SOLICITUD_MATERIAL sm ON sm.id =  t.solicitud_id
            JOIN USUARIO p ON p.id = sm.profesor_id
            JOIN SOLICITUD_MATERIAL_DETALLE smd ON smd.solicitud_id = sm.id
            JOIN MATERIALES_ALMACEN m ON m.id_material = smd.id_material
            WHERE 
                estudiante_id = %s
        """
        
        # Realizar la consulta para obtener los datos
        materiales_estudiante = db.fetch_query(query, (id,))
        
        # Verificar si no hay materiales asociados a este estudiante
        if not materiales_estudiante:
            return jsonify({"message": "No hay materiales asociados a las tareas de este estudiante."}), 404
        
        # Organizar los resultados en un formato estructurado
        materiales_dict = []
        for material in materiales_estudiante:
            aula, profesor_nombre, nombre_materila, cantidad_solicitada = material
            materiales_dict.append({
                "aula": aula,
                "profesor": profesor_nombre,
                "material": [{
                    "nombre": nombre_materila,
                    "cantidad": cantidad_solicitada
                }]
            })
        
        print(materiales_dict)
        # Retornar los resultados en formato JSON
        return jsonify({
            "materiales": materiales_dict
        }), 200

    except Exception as e:
        return jsonify({"error": f"Error al obtener los materiales: {str(e)}"}), 500