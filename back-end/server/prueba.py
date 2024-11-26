import requests

# Función para hacer una solicitud POST a /peticion
def crear_peticion():
    url = "http://127.0.0.1:5000/peticion"
    data = {
        "profesor_id": 1,
        "alumno_id": 45,
        "material": "Marcadores de colores",
        "fecha_entrega": "2024-11-30"
    }
    response = requests.post(url, json=data)
    
    # Imprime el código de estado y la respuesta
    print("POST /peticion")
    print(f"Estado: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    return response

# Función para hacer una solicitud DELETE a /peticion/<id>
def eliminar_peticion(peticion_id):
    url = f"http://127.0.0.1:5000/peticion/{peticion_id}"
    response = requests.delete(url)
    
    # Imprime el código de estado y la respuesta
    print(f"DELETE /peticion/{peticion_id}")
    print(f"Estado: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    return response

# Función para hacer una solicitud PUT a /peticion/<int:peticion_id>
def actualizar_peticion(peticion_id):
    url = f"http://127.0.0.1:5000/peticion/{peticion_id}"
    data = {
        "material": "Laptop",
        "fecha_entrega": "2024-12-01"
    }
    response = requests.put(url, json=data)
    
    # Imprime el código de estado y la respuesta
    print(f"PUT /peticion/{peticion_id}")
    print(f"Estado: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    return response

# Función para hacer una solicitud GET a /peticiones
def obtener_peticiones():
    url = "http://127.0.0.1:5000/peticiones"
    response = requests.get(url)
    
    # Imprime el código de estado y la respuesta
    print("GET /peticiones")
    print(f"Estado: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    return response

# Función para hacer una solicitud POST a /crear_tarea/<int:solicitud_id>
def crear_tarea(solicitud_id, descripcion=None, fecha_limite=None):
    url = f"http://127.0.0.1:5000/crear_tarea/{solicitud_id}"
    
    # Datos de entrada, si no se pasan valores se usa el cuerpo vacío {}
    data = {}
    if descripcion and fecha_limite:
        data = {
            "descripcion": descripcion,
            "fecha_limite": fecha_limite
        }
    
    response = requests.post(url, json=data)
    
    # Imprime el código de estado y la respuesta
    print(f"POST /crear_tarea/{solicitud_id}")
    print(f"Estado: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    return response

# Función para hacer una solicitud POST a /tarea_pedido_material
def crear_tarea_pedido_material():
    url = "http://127.0.0.1:5000/tarea_pedido_material"
    
    # Datos de entrada
    data = {
        "descripcion": "Pedido de material para el laboratorio",
        "fecha_inicio": "2024-11-23",
        "fecha_entrega": "2024-12-01",
        "estado": "Pendiente",
        "prioridad": "Alta",
        "estudiantes": [1, 2]  # IDs de los estudiantes asignados
    }
    
    # Realiza la solicitud POST
    response = requests.post(url, json=data)
    
    # Imprime el código de estado y la respuesta
    print("POST /tarea_pedido_material")
    print(f"Estado: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    
    return response

# Función para hacer una solicitud POST a /comanda
def crear_comanda():
    url = "http://127.0.0.1:5000/comanda"
    
    # Datos de entrada
    data = {
        "descripcion": "Comanda",
        "fecha_inicio": "2024-11-23",
        "fecha_entrega": "2024-12-01",
        "estudiantes": [1,2]
    }
    
    # Realiza la solicitud POST
    response = requests.post(url, json=data)
    
    # Imprime el código de estado y la respuesta
    print("POST /comanda")
    print(f"Estado: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    
    return response

def update_comanda():
    # URL de la API
    url = 'http://127.0.0.1:5000/comanda/4'

    # Datos de la tarea a actualizar
    data = {
    "descripcion": "Nueva descripción de la tarea",
    "fecha_inicio": "2024-12-01",
    "fecha_entrega": "2024-12-05",
    }

    # Hacer la solicitud PUT
    response = requests.put(url, json=data)

    # Verificar el resultado
    if response.status_code == 200:
        print("Tarea actualizada con éxito")
    else:
        print(f"Error al actualizar tarea: {response.status_code}")
        print(response.text)

def asignar_tarea():
    # URL del servidor donde se ejecuta la aplicación Flask
    url = 'http://localhost:5000/asignar_estudiante/1/2'  # Asumiendo tarea_id = 1 y estudiante_id = 123

    # Realizar la solicitud POST
    response = requests.post(url)

    # Verificar la respuesta
    if response.status_code == 201:
        print("Estudiante asignado exitosamente.")
    elif response.status_code == 500:
        print("Error al asignar el estudiante.")
    else:
        print(f"Error inesperado: {response.status_code}")

def cambiar_estado():
    # URL de la API
    url = 'http://127.0.0.1:5000/cambiar_estado/4'  # Reemplaza '4' con el ID de la tarea que deseas actualizar

    # Datos que se van a enviar en el cuerpo de la solicitud (estado de la tarea)
    data = {
        "estado": "Completada"
    }

    # Hacer la solicitud POST
    response = requests.post(url, json=data)

    # Verificar la respuesta
    if response.status_code == 200:
        print("Estado cambiado exitosamente")
        print(response.json())  # Mostrar el mensaje del servidor
    else:
        print("Error al cambiar el estado")
        print(response.json())  # Mostrar el mensaje de error

def ver_tareas_estudiante():
    url = "http://localhost:5000/ver_tareas/2"  # Reemplaza "1" por el ID del estudiante que deseas consultar

    # Realizar el request POST
    response = requests.post(url)

    # Verificar la respuesta
    if response.status_code == 200:
        print("Tareas pendientes:", response.json())
    else:
        print(f"Error: {response.status_code}, {response.json()}")

def ver_estado_tarea():
    # Establecer la URL del endpoint
    tarea_id = 1  # Reemplaza "1" por el ID de la tarea que deseas consultar
    url = f"http://localhost:5000/ver_estado_tarea/{tarea_id}"

    # Realizar el request GET
    response = requests.get(url)

    # Verificar la respuesta
    if response.status_code == 200:
        print("Estado de la tarea:", response.json())
    else:
        print(f"Error: {response.status_code}, {response.json()}")

def ver_historial():
    # URL del endpoint
    url = "http://127.0.0.1:5000/alumno/historial"

    # Parámetros de la consulta
    params = {
        "id_alumno": 1  
    }

    # Realizar la solicitud GET
    response = requests.get(url, params=params)

    # Manejar la respuesta
    if response.status_code == 200:
        print("Historial del alumno obtenido con éxito:")
        print(response.json())  # Mostrar el historial formateado en JSON
    elif response.status_code == 404:
        print("No se encontraron tareas para el alumno especificado")
        print(response.json())
    elif response.status_code == 400:
        print("Error: Falta el parámetro 'id_alumno'")
        print(response.json())
    else:
        print(f"Error inesperado: {response.status_code}")
        print(response.json())
        
ver_historial()