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
    # Obtener los datos del cuerpo de la solicitud
    data = request.json

    # Asegúrate de validar los datos antes de usarlos
    nombre_material = data.get('nombre_material')
    descripcion = data.get('descripcion')
    categoria = data.get('categoria')
    cantidad = data.get('cantidad')
    estado = data.get('estado')
    ultima_actualizacion = data.get('ultima_actualizacion')

    # Verifica que al menos uno de los campos sea válido para actualizar
    if not any([nombre_material, descripcion, categoria, cantidad, estado]):
        return jsonify({"error": "No hay datos válidos para actualizar"}), 400

    # Construir la consulta dinámica para actualizar solo los campos necesarios
    campos_a_actualizar = []
    valores = []

    if nombre_material:
        campos_a_actualizar.append("nombre_material = %s")
        valores.append(nombre_material)
    if descripcion:
        campos_a_actualizar.append("descripcion = %s")
        valores.append(descripcion)
    if categoria:
        campos_a_actualizar.append("categoria = %s")
        valores.append(categoria)
    if cantidad:
        campos_a_actualizar.append("cantidad = %s")
        valores.append(cantidad)
    if estado:
        campos_a_actualizar.append("estado = %s")
        valores.append(estado)

    # Siempre actualizamos la última actualización, si es necesario
    if not ultima_actualizacion:
        ultima_actualizacion = "NOW()"  # SQL para la fecha y hora actuales
    else:
        valores.append(ultima_actualizacion)
        campos_a_actualizar.append("ultima_actualizacion = %s")

    # Agregar el ID del material al final de los valores
    valores.append(id_material)

    # Crear la consulta dinámica
    query = f"""
        UPDATE MATERIALES_ALMACEN
        SET {', '.join(campos_a_actualizar)}
        WHERE id_material = %s
    """

    # Ejecutar la consulta
    try:
        db_controller.execute_query(query, tuple(valores))
        return jsonify({"success": "Material actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@materialesBP.route('/materiales/<int:id_material>', methods=['DELETE'])
def eliminar_material(id_material):
    # Construir la consulta para eliminar el material
    query = "DELETE FROM MATERIALES_ALMACEN WHERE id_material = %s"

    try:
        # Ejecutar la consulta con el ID proporcionado
        result = db_controller.execute_query(query, (id_material,))
        
        # Verificar si se eliminó algún registro
        if result.rowcount > 0:
            return jsonify({"success": "Material eliminado exitosamente"}), 200
        else:
            return jsonify({"error": "No se encontró el material con el ID proporcionado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500