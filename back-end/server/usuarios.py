from flask import Blueprint, jsonify, request
from db_controller import DatabaseController

# Crear el Blueprint
userBP = Blueprint('views', __name__)

# Instanciar el controlador de la base de datos
db_controller = DatabaseController()


# Función para obtener la foto de perfil desde la tabla MULTIMEDIA
def obtener_foto_perfil(nombre_usuario):
    try:
        query = "SELECT id FROM `MULTIMEDIA` WHERE username = %s AND tipo = 'FOTO' LIMIT 1"
        result = db_controller.fetch_query(query, (nombre_usuario,))
        if result and result[0]:
            return f"http://{request.host}/visualiza/{result[0][0]}"
        else:
            return "https://randomuser.me/api/portraits/men/1.jpg"
    except Exception as e:
        print(f"Error al obtener la foto de perfil: {str(e)}")
        return "https://randomuser.me/api/portraits/men/1.jpg"


@userBP.route('/estudiantes', methods=['GET'])
def estudiantes():
    query = "SELECT * FROM `USUARIO` WHERE rol = 'ESTUDIANTE'"
    results = db_controller.fetch_query(query)
    
    if results:
        estudiantes = []
        for result in results:
            nombre_usuario = result[3] if result[3] else "No disponible"
            foto_perfil = obtener_foto_perfil(nombre_usuario)
            
            estudiante = {
                'id': result[0],
                'nombre': result[1] if result[1] else "No disponible",
                'apellido': result[2] if result[2] else "No disponible",
                'nombre_usuario': nombre_usuario,
                'contraseña': result[4] if result[4] else "No disponible",
                'color_tema': result[5] if result[5] else "#FFFFFF",
                'tamaño_letra': result[6] if result[6] else "14px",
                'tipo_usuario': result[7],
                'supervisado_por': "null",
                'foto_perfil': foto_perfil
            }
            estudiantes.append(estudiante)

        return jsonify(estudiantes)
    
    return jsonify({"error": "No se encontraron resultados"}), 404


@userBP.route('/profesores', methods=['GET'])
def profesores():
    query = "SELECT * FROM `USUARIO` WHERE rol = 'PROFESOR'"
    results = db_controller.fetch_query(query)
    
    if results:
        profesores = []
        for result in results:
            nombre_usuario = result[3] if result[3] else "No disponible"
            foto_perfil = obtener_foto_perfil(nombre_usuario)

            profesor = {
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
            profesores.append(profesor)

        return jsonify(profesores)
    
    return jsonify({"error": "No se encontraron resultados"}), 404


@userBP.route('/admins', methods=['GET'])
def admins():
    query = "SELECT * FROM `USUARIO` WHERE rol = 'ADMINISTRADOR'"
    results = db_controller.fetch_query(query)
    
    if results:
        admins = []
        for result in results:
            nombre_usuario = result[3] if result[3] else "No disponible"
            foto_perfil = obtener_foto_perfil(nombre_usuario)

            admin = {
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
            admins.append(admin)

        return jsonify(admins)
    
    return jsonify({"error": "No se encontraron resultados"}), 404

@userBP.route('/estudiantes', methods=['POST'])
def post_estudiante():
    # Obtenemos los datos del cuerpo de la petición
    data = request.get_json()

    # Verificamos si los datos requeridos están presentes
    if not all(key in data for key in ['nombre', 'apellido', 'nombre_usuario', 'contraseña', 'color_fondo', 'tamaño_letra', 'rol']):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    # Preparar la consulta SQL para insertar un nuevo estudiante
    query = """
    INSERT INTO USUARIO (nombre, apellidos, nombre_usuario, contraseña, color_fondo, tamaño_letra, rol)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    # Parametros a insertar en la base de datos
    params = (
        data['nombre'],
        data['apellido'],
        data['nombre_usuario'],
        data['contraseña'],
        data['color_fondo'],
        data['tamaño_letra'],
        data['rol']
    )

    # Ejecutar la consulta
    if db_controller.execute_query(query, params):
        return jsonify({"message": "Estudiante creado correctamente."}), 201
    else:
        return jsonify({"error": "Error al crear el estudiante."}), 400
