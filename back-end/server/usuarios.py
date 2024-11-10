from flask import Blueprint, jsonify, request
from db_controller import DatabaseController

# Crear el Blueprint
userBP = Blueprint('views', __name__)

# Instanciar el controlador de la base de datos
db_controller = DatabaseController()


@userBP.route('/estudiantes', methods=['GET'])
def estudiantes():
    query = "SELECT * FROM `USUARIO` WHERE rol = 'ESTUDIANTE'"
    if not query:
        return jsonify({"error": "Consulta no proporcionada"}), 400
    
    results = db_controller.fetch_query(query)
    
    if results:
        estudiantes = []
        for result in results:
            estudiante = {
                'id': result[0],  # id
                'nombre': result[1] if result[1] is not None else "No disponible",  # nombre
                'apellido': result[2] if result[2] is not None else "No disponible",  # apellidos
                'nombre_usuario': result[3] if result[3] is not None else "No disponible",  # nombre_usuario
                'contraseña': result[4] if result[4] is not None else "No disponible",  # contraseña
                'color_tema': result[5] if result[5] is not None else "#FFFFFF",  # color_fondo (valor por defecto si es NULL)
                'tamaño_letra': result[6] if result[6] is not None else "14px",  # tamaño_letra (valor por defecto si es NULL)
                'tipo_usuario': result[7],  # rol
                'supervisado_por': "null",
                'foto_perfil': "https://randomuser.me/api/portraits/men/1.jpg" 
            }
            estudiantes.append(estudiante)

        return jsonify(estudiantes)
    
    return jsonify({"error": "No se encontraron resultados"}), 404



@userBP.route('/profesores', methods=['GET'])
def profesores():
    query = "SELECT * FROM `USUARIO` WHERE rol = 'PROFESOR'"
    if not query:
        return jsonify({"error": "Consulta no proporcionada"}), 400
    
    results = db_controller.fetch_query(query)
    
    if results:
        estudiantes = []
        for result in results:
            estudiante = {
                'id': result[0],  # id
                'nombre': result[1] if result[1] is not None else "No disponible",  # nombre
                'apellido': result[2] if result[2] is not None else "No disponible",  # apellidos
                'nombre_usuario': result[3] if result[3] is not None else "No disponible",  # nombre_usuario
                'contraseña': result[4] if result[4] is not None else "No disponible",  # contraseña
                'color_tema': result[5] if result[5] is not None else "#FFFFFF",  # color_fondo (valor por defecto si es NULL)
                'tamaño_letra': result[6] if result[6] is not None else "14px",  # tamaño_letra (valor por defecto si es NULL)
                'tipo_usuario': result[7],  # rol
                'foto_perfil': "https://randomuser.me/api/portraits/men/1.jpg" 
            }
            estudiantes.append(estudiante)

        return jsonify(estudiantes)
    
    return jsonify({"error": "No se encontraron resultados"}), 404


@userBP.route('/admins', methods=['GET'])
def admins():
    query = "SELECT * FROM `USUARIO` WHERE rol = 'ADMINISTRADOR'"
    if not query:
        return jsonify({"error": "Consulta no proporcionada"}), 400
    
    results = db_controller.fetch_query(query)
    
    if results:
        estudiantes = []
        for result in results:
            estudiante = {
                'id': result[0],  # id
                'nombre': result[1] if result[1] is not None else "No disponible",  # nombre
                'apellido': result[2] if result[2] is not None else "No disponible",  # apellidos
                'nombre_usuario': result[3] if result[3] is not None else "No disponible",  # nombre_usuario
                'contraseña': result[4] if result[4] is not None else "No disponible",  # contraseña
                'color_tema': result[5] if result[5] is not None else "#FFFFFF",  # color_fondo (valor por defecto si es NULL)
                'tamaño_letra': result[6] if result[6] is not None else "14px",  # tamaño_letra (valor por defecto si es NULL)
                'tipo_usuario': result[7],  # rol
                'foto_perfil': "https://randomuser.me/api/portraits/men/1.jpg" 
            }
            estudiantes.append(estudiante)

        return jsonify(estudiantes)
    
    return jsonify({"error": "No se encontraron resultados"}), 404
