import requests

# Dirección del servidor (ajusta según tu configuración)
ip_address = 'localhost'
port = 5000

# Función para insertar un estudiante
def insertar_estudiante(nombre, apellido, nombre_usuario, contraseña, color_fondo, tamaño_letra, rol):
    url = f'http://{ip_address}:{port}/estudiantes'
    data = {
        'nombre': nombre,
        'apellido': apellido,
        'nombre_usuario': nombre_usuario,
        'contraseña': contraseña,
        'color_fondo': color_fondo,
        'tamaño_letra': tamaño_letra,
        'rol': rol
    }

    try:
        resp = requests.post(url, json=data)
        if resp.status_code == 201:
            print("Estudiante creado correctamente:", resp.json())
            return True
        else:
            print("Error al crear el estudiante:", resp.text)
            return False
    except Exception as e:
        print(f"Error en la solicitud al servidor: {str(e)}")
        return False

# Función para subir una imagen al servidor
def subir_imagen(nombre_usuario):
    # Descargar una foto aleatoria desde la API de randomuser.me
    foto_url = 'https://randomuser.me/api/portraits/men/1.jpg'
    foto_response = requests.get(foto_url)

    if foto_response.status_code != 200:
        print("Error al descargar la foto.")
        return None

    # Subir la imagen al servidor usando tu endpoint /imagenes
    foto_nombre = f"{nombre_usuario}.jpg"
    files = {
        'foto': (foto_nombre, foto_response.content, 'image/jpg')
    }

    try:
        resp = requests.post(f'http://{ip_address}:{port}/imagenes', files=files)
        if resp.status_code == 200:
            data = resp.json()
            print(f"Imagen subida correctamente: {data['url']}")
            return data['url']
        else:
            print("Error al subir la imagen:", resp.text)
            return None
    except Exception as e:
        print(f"Error en la solicitud al servidor: {str(e)}")
        return None

# Ejecución del script
if __name__ == '__main__':
    # Definir los datos del usuario de prueba
    nombre = "John"
    apellido = "Doe"
    nombre_usuario = "johndoe"
    contraseña = "password123"
    color_fondo = "#FFFFFF"
    tamaño_letra = "14px"
    rol = "ESTUDIANTE"

    # Paso 1: Insertar estudiante
    estudiante_creado = insertar_estudiante(nombre, apellido, nombre_usuario, contraseña, color_fondo, tamaño_letra, rol)

    # Paso 2: Si se creó el estudiante correctamente, subir la foto
    if estudiante_creado:
        foto_url = subir_imagen(nombre_usuario)
        if foto_url:
            print(f"Foto subida y asociada al usuario {nombre_usuario}: {foto_url}")
        else:
            print("Error al subir la foto.")
