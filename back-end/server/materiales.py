from flask import Blueprint, jsonify, request
from db_controller import DatabaseController

# Crear el Blueprint
materialesBP = Blueprint('materiales', __name__)
# Instanciar el controlador de la base de datos
db_controller = DatabaseController()

@materialesBP.route('/materiales', methods=['POST'])
def post_material():
    # Obtenemos los datos del cuerpo de la petición
    data = request.get_json()

    # Verificamos si los datos requeridos están presentes
    if not all(key in data for key in ['nombre_material', 'descripcion', 'categoria', 'cantidad', 'fecha_ingreso', 'estado', 'id_administrador']):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    # Preparar la consulta SQL para insertar un nuevo estudiante
    query = """
    INSERT INTO MATERIALES_ALMACEN (nombre_material, descripcion, categoria, cantidad, fecha_ingreso, estado, id_administrador)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    # Parametros a insertar en la base de datos
    params = (
        data['nombre_material'],
        data['descripcion'],
        data['categoria'],
        data['cantidad'],
        data['fecha_ingreso'],
        data['estado'],
        data['id_administrador']
    )

    # Ejecutar la consulta
    if db_controller.execute_query(query, params):
        return jsonify({"message": "Material creado correctamente."}), 201
    else:
        return jsonify({"error": "Error al crear el material."}), 400
    
def crear_solicitud_material():
    """ Maneja la creación de una solicitud de materiales. """
    try:
        # Parsear los datos del JSON recibido
        data = request.get_json()
        if not data:
            return jsonify({"error": "Datos no proporcionados"}), 400

        fecha_entrega = data.get("fecha_entrega")
        id_profesor = data.get("id_profesor")
        materiales = data.get("materiales")

        # Validar los campos principales
        if not fecha_entrega or not id_profesor or not materiales:
            return jsonify({"error": "Campos obligatorios faltantes"}), 400

        # Validar que la lista de materiales no esté vacía
        if not isinstance(materiales, list) or len(materiales) == 0:
            return jsonify({"error": "La lista de materiales está vacía"}), 400

        # Insertar cada material en la tabla SOLICITUD_MATERIAL
        for material in materiales:
            id_material = material.get("id")
            cantidad = material.get("cantidad")
            nombre_material = material.get("nombre")

            # Validar los campos de cada material
            if not id_material or not cantidad or not nombre_material:
                return jsonify({"error": "Información incompleta en los materiales"}), 400

            query = """
                INSERT INTO SOLICITUD_MATERIAL (profesor_id, cantidad, material, fecha_entrega)
                VALUES (%s, %s, %s, %s)
            """
            params = (id_profesor, cantidad, nombre_material, fecha_entrega)

            # Ejecutar la consulta para cada material
            if not db_controller.execute_query(query, params):
                return jsonify({"error": "Error al insertar material en la base de datos"}), 500

        return jsonify({"message": "Solicitud de materiales creada exitosamente"}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500
        
@materialesBP.route('/materiales', methods=['GET'])
def materiales():
    query = "SELECT * FROM MATERIALES_ALMACEN"
    results = db_controller.fetch_query(query)
    
    if results:
        materiales = []
        for result in results:
            material = {
                'id_material': result[0] if result[0] else -1,
                'nombre_material': result[1] if result[1] else "No disponible",
                'descripcion': result[2] if result[2] else "No disponible",
                'categoria': result[3] if result[3] else "No disponible",
                'cantidad': result[4] if result[4] else 0,
                'fecha_ingreso': result[5] if result[5] else "No disponible",
                'estado': result[6] if result[6] else "No disponible",
                'ultima_actualizacion': result[7] if result[7] else "No disponible",
                'id_administrador': result[8] if result[8] else -1,
            }
            materiales.append(material)

        return jsonify(materiales)
    
    return jsonify({"error": "No se encontraron resultados"}), 404


@materialesBP.route('/materiales/<int:id_material>', methods=['PUT'])
def modificar_material(id_material):
    # Obtener los datos enviados en la solicitud
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se enviaron datos para actualizar"}), 400

    # Crear la consulta dinámica para actualizar solo los campos enviados
    campos_actualizar = []
    valores = []

    if 'nombre_material' in data:
        campos_actualizar.append("nombre_material = %s")
        valores.append(data['nombre_material'])

    if 'descripcion' in data:
        campos_actualizar.append("descripcion = %s")
        valores.append(data['descripcion'])

    if 'categoria' in data:
        campos_actualizar.append("categoria = %s")
        valores.append(data['categoria'])

    if 'cantidad' in data:
        if not isinstance(data['cantidad'], int) or data['cantidad'] < 0:
            return jsonify({"error": "La cantidad debe ser un número entero no negativo"}), 400
        campos_actualizar.append("cantidad = %s")
        valores.append(data['cantidad'])

    if 'estado' in data:
        if data['estado'] not in ['Disponible', 'Agotado', 'Dañado']:
            return jsonify({"error": "Estado inválido"}), 400
        campos_actualizar.append("estado = %s")
        valores.append(data['estado'])

    # Verificar si hay campos para actualizar
    if not campos_actualizar:
        return jsonify({"error": "No se proporcionaron campos válidos para actualizar"}), 400

    # Añadir el ID del material al final de los valores
    valores.append(id_material)

    # Crear la consulta dinámica
    query = f"UPDATE MATERIALES_ALMACEN SET {', '.join(campos_actualizar)} WHERE id_material = %s"

    try:
        if db_controller.execute_query(query, valores):
            return jsonify({"message": "Material actualizado correctamente."}), 200
        else:
            return jsonify({"error": "Material no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": f"Error al actualizar el material: {str(e)}"}), 500



@materialesBP.route('/materiales/<int:id_material>', methods=['DELETE'])
def eliminar_material(id_material):
    # Crear la consulta SQL para eliminar el material
    query = "DELETE FROM MATERIALES_ALMACEN WHERE id_material = %s"
    valores = (id_material,)

    # Ejecutar la consulta
    if db_controller.execute_query(query, valores):
        return jsonify({"message": "Material eliminado correctamente."}), 200
    else:
        return jsonify({"error": "No se pudo eliminar el material. Puede que no exista."}), 404