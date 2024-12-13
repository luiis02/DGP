from flask import Blueprint, jsonify, request
from db_controller import DatabaseController

# Crear el Blueprint
userBP = Blueprint('views', __name__)

# Instanciar el controlador de la base de datos
db_controller = DatabaseController()

# Función para obtener la foto de perfil desde la tabla MULTIMEDIA
def obtener_foto_perfil(nombre_usuario):
    try:
        query = "SELECT id FROM MULTIMEDIA WHERE username = %s AND tipo = 'FOTO' LIMIT 1"
        result = db_controller.fetch_query(query, (nombre_usuario,))
        if result and result[0]:
            return f"http://{request.host}/visualiza/{result[0][0]}"
        else:
            return "https://st3.depositphotos.com/3538469/15750/i/450/depositphotos_157501024-stock-photo-business-man-icon.jpg"
    except Exception as e:
        print(f"Error al obtener la foto de perfil: {str(e)}")
        return "https://st3.depositphotos.com/3538469/15750/i/450/depositphotos_157501024-stock-photo-business-man-icon.jpg"


def obtener_usuarios_por_rol(rol):
    """Función común para obtener usuarios por rol"""
    query = "SELECT * FROM USUARIO WHERE rol = %s"
    results = db_controller.fetch_query(query, (rol,))
    
    usuarios = []  # Inicializamos una lista vacía para los usuarios

    if results:
        for result in results:
            nombre_usuario = result[3] if result[3] else "No disponible"
            foto_perfil = obtener_foto_perfil(nombre_usuario)

            usuario = {
                'id': result[0],
                'nombre': result[1] if result[1] else "No disponible",
                'apellido': result[2] if result[2] else "No disponible",
                'nombre_usuario': nombre_usuario,
                'contraseña': result[4] if result[4] else "No disponible",
                'color_tema': result[5] if result[5] else "#FFFFFF",
                'tamaño_letra': result[6] if result[6] else "14px",
                'tipo_usuario': result[7],
                'foto_perfil': foto_perfil
            }
            usuarios.append(usuario)
    return usuarios


@userBP.route('/estudiantes', methods=['GET'])
def estudiantes():
    """Obtener lista de estudiantes"""
    estudiantes = obtener_usuarios_por_rol('ESTUDIANTE')
    return jsonify(estudiantes)  # Siempre retornamos la lista (vacía si no hay usuarios)


@userBP.route('/profesores', methods=['GET'])
def profesores():
    """Obtener lista de profesores"""
    profesores = obtener_usuarios_por_rol('PROFESOR')
    return jsonify(profesores)  # Siempre retornamos la lista (vacía si no hay profesores)
@userBP.route('/profesores', methods=['POST'])
def create_profesor():
    """Crear un nuevo profesor"""
    data = request.get_json()
    
    # Verifica que todos los campos necesarios estén presentes
    required_fields = ['nombre', 'apellido', 'nombre_usuario', 'contraseña', 'tipo_usuario']
    if not all(field in data for field in required_fields):
        missing_fields = [field for field in required_fields if field not in data]
        return jsonify({"error": f"Faltan los siguientes campos: {', '.join(missing_fields)}"}), 400
    
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    nombre_usuario = data.get('nombre_usuario')
    contraseña = data.get('contraseña')
    tipo_usuario = data.get('tipo_usuario')
    color_tema = data.get('color_tema', '#FFFFFF')
    tamaño_letra = data.get('tamaño_letra', '14px')
    
    # Consultar si ya existe un usuario con el mismo nombre de usuario
    query_check = "SELECT COUNT(*) FROM USUARIO WHERE nombre_usuario = %s"
    result = db_controller.fetch_query(query_check, (nombre_usuario,))
    if result and result[0][0] > 0:
        return jsonify({"error": "El nombre de usuario ya está registrado"}), 400
    
    # Insertar los datos del profesor en la base de datos
    query_insert = """
        INSERT INTO USUARIO (nombre, apellidos, nombre_usuario, contraseña, rol, color_fondo, tamaño_letra)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    
    try:
        db_controller.execute_query(query_insert, (nombre, apellido, nombre_usuario, contraseña, tipo_usuario, color_tema, tamaño_letra))
        # Después de insertar, obtener la lista completa de profesores
        profesores = obtener_usuarios_por_rol("PROFESOR")
        return jsonify(profesores), 201  # Devolver la lista de profesores
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Construir la consulta para insertar los datos del nuevo profesor
@userBP.route('/profesores/<int:id>', methods=['PUT'])
def update_profesor(id):
    """Actualizar la contraseña de un profesor"""
    data = request.get_json()
    # Verifica que el campo contraseña esté presente
    if 'contraseña' not in data:
        return jsonify({"error": "No hay datos válidos para actualizar"}), 400
    
    print(data['contraseña'])
    # Construir la consulta para actualizar la contraseña
    update_query = "UPDATE USUARIO SET contraseña = %s WHERE id = %s"
    values = (data['contraseña'], id)
    
    try:
        db_controller.execute_query(update_query, values)
        return jsonify({"success": "Contraseña actualizada exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@userBP.route('/admins', methods=['GET'])
def admins():
    """Obtener lista de administradores"""
    admins = obtener_usuarios_por_rol('ADMINISTRADOR')
    return jsonify(admins)  # Siempre retornamos la lista (vacía si no hay administradores)


@userBP.route("/estudiantes/<int:id>", methods=["DELETE"])
def delete_estudiante(id):
    """Eliminar un estudiante"""
    query = "DELETE FROM USUARIO WHERE id = %s"
    try:
        db_controller.execute_query(query, (id,))
        return jsonify({"success": "Estudiante eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@userBP.route("/estudiantes/<int:id>", methods=["PUT"])
def put_estudiante(id):
    """Actualizar los datos de un estudiante"""
    data = request.get_json()

    # Verifica que al menos uno de los campos sea válido para actualizar
    if not any([data.get(key) for key in ['apellidos', 'color_fondo', 'contraseña', 'foto_perfil', 'id', 'nombre', 'nombre_usuario', 'supervisado_por', 'tamaño_letra', 'tipo_usuario']]):
        return jsonify({"error": "No hay datos válidos para actualizar"}), 400
    
    # Construir la consulta dinámica para actualizar solo los campos necesarios
    campos_a_actualizar = []
    valores = []
    if data.get('apellidos'): 
        campos_a_actualizar.append("apellidos = %s")
        valores.append(data['apellidos'])
    if data.get('color_fondo'):
        campos_a_actualizar.append("color_fondo = %s")
        valores.append(data['color_fondo'])
    if data.get('contraseña'):
        campos_a_actualizar.append("contraseña = %s")
        valores.append(data['contraseña'])
    if data.get('nombre'):
        campos_a_actualizar.append("nombre = %s")
        valores.append(data['nombre'])
    if data.get('tamaño_letra'):
        campos_a_actualizar.append("tamaño_letra = %s")
        valores.append(data['tamaño_letra'])
    if data.get('nombre_usuario'): 
        campos_a_actualizar.append("nombre_usuario = %s")
        valores.append(data['nombre_usuario'])
    if data.get('rol'): 
        campos_a_actualizar.append("rol = %s")
        valores.append(data['rol'])
    
    # Siempre actualizamos la última actualización
    #ultima_actualizacion = "NOW()"
    #valores.append(ultima_actualizacion)
    #campos_a_actualizar.append("ultima_actualizacion = %s")
    
    # Agregar el id al final 
    valores.append(id)

    # Crear la consulta 
    query = f"""
        UPDATE USUARIO
        SET {', '.join(campos_a_actualizar)}
        WHERE id = %s
    """

    try:
        db_controller.execute_query(query, valores)
        return jsonify({"success": "Estudiante actualizado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@userBP.route("/estudiantes", methods=["POST"])
def post_estudiante():
    """Crear un nuevo estudiante y devolver la lista completa de estudiantes"""
    data = request.get_json()

    # Verifica que los campos esenciales estén presentes
    required_fields = ['nombre', 'apellido', 'nombre_usuario', 'contraseña', 'rol']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Faltan campos necesarios"}), 400

    # Asignar valores de los campos recibidos
    nombre = data.get('nombre')
    apellidos = data.get('apellido')
    nombre_usuario = data.get('nombre_usuario')
    contraseña = data.get('contraseña')
    rol = data.get('rol', 'ESTUDIANTE')  # Rol predeterminado es ESTUDIANTE
    color_fondo = data.get('color_fondo', '#F8F8F8')  # Valor predeterminado para color_fondo
    tamaño_letra = data.get('tamaño_letra', '14px')  # Valor predeterminado para tamaño_letra


    # Consultar si ya existe un usuario con el mismo nombre de usuario
    query_check = "SELECT COUNT(*) FROM USUARIO WHERE nombre_usuario = %s"
    result = db_controller.fetch_query(query_check, (nombre_usuario,))
    if result and result[0][0] > 0:
        return jsonify({"error": "El nombre de usuario ya está registrado"}), 400

    # Insertar los datos del estudiante en la base de datos
    query_insert = """
        INSERT INTO USUARIO (nombre, apellidos, nombre_usuario, contraseña, rol, color_fondo, tamaño_letra)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    try:
        db_controller.execute_query(query_insert, (nombre, apellidos, nombre_usuario, contraseña, rol, color_fondo, tamaño_letra))
        
        # Después de insertar, obtener la lista completa de estudiantes
        estudiantes = obtener_usuarios_por_rol("ESTUDIANTE")
        
        return jsonify(estudiantes), 201  # Devolver la lista de estudiantes
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@userBP.route('/estudiantes/conTareas', methods=['GET'])
def estudiantesConTareas():
    """Obtener lista de estudiantes con tareas pendientes únicamente"""
    estudiantes = obtener_usuarios_por_rol('ESTUDIANTE')  # Obtener todos los estudiantes
    estudiantes_con_tareas = []

    for estudiante in estudiantes:
        # Contar las tareas pendientes para cada estudiante
        query = f"""
            SELECT COUNT(*) 
            FROM TAREA 
            WHERE estado = 'PENDIENTE' AND id_estudiante = {estudiante['id']}
        """
        result = db_controller.fetch_query(query)
        tareas_pendientes = result[0][0] if result and result[0] else 0
        
        if tareas_pendientes > 0:
            estudiante['tareas_pendientes'] = tareas_pendientes
            estudiantes_con_tareas.append(estudiante)
    
    print("estudiantes con tareas pendientes", estudiantes_con_tareas)  # Log para depuración

    return jsonify(estudiantes_con_tareas)  # Retornar solo estudiantes con tareas pendientes
