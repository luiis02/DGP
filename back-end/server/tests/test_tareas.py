# Pruebas para asignar estudiante
def test_post_asignar_estudiante_exito(client, mock_db):
    mock_db.execute_query.return_value = True
    response = client.post('/asignar_estudiante/1/1')
    assert response.status_code == 201
    assert response.json == {"message": "Estudiante asignado a la tarea exitosamente"}

def test_post_asignar_estudiante_error(client, mock_db):
    mock_db.execute_query.return_value = False
    response = client.post('/asignar_estudiante/1/1')
    assert response.status_code == 500
    assert response.json == {"message": "Error al asignar el estudiante a la tarea"}

# Pruebas para cambiar el estado de la tarea
def test_post_marcar_tarea_como_finalizada_exito(client, mock_db):
    mock_db.execute_query.return_value = True
    response = client.post('/cambiar_estado/1', json={"estado": "Finalizada"})
    assert response.status_code == 200
    assert response.json == {"message": "Estado cambiado"}

def test_post_marcar_tarea_como_finalizada_error(client, mock_db):
    mock_db.execute_query.return_value = False
    response = client.post('/cambiar_estado/1', json={"estado": "Finalizada"})
    assert response.status_code == 500
    assert response.json == {"message": "Error al marcar la tarea como finalizada"}

def test_post_marcar_tarea_como_finalizada_sin_estado(client):
    response = client.post('/cambiar_estado/1', json={})
    assert response.status_code == 500

# Pruebas para ver tareas pendientes
def test_get_ver_tareas_pendientes_exito(client, mock_db):
    mock_db.fetch_query.return_value = [(1, "Tarea 1", "Pendiente")]
    response = client.get('/ver_tareas/1')
    assert response.status_code == 200
    assert response.json == {"tareas_pendientes": [{"id_tarea": 1, "descripcion": "Tarea 1", "estado": "Pendiente"}]}

def test_ver_tareas_pendientes_vacia(client, mock_db):
    mock_db.fetch_query.return_value = []
    response = client.get('/ver_tareas/1')
    assert response.status_code == 200
    assert response.json == {"message": "No tienes tareas pendientes."}

# Pruebas para ver el estado de una tarea
def test_get_ver_estado_tarea_exito(client, mock_db):
    mock_db.fetch_query.return_value = [("Pendiente",)]
    response = client.get('/ver_estado_tarea/1')
    assert response.status_code == 200
    assert response.json == [{"id_tarea": 1, "estado": "Pendiente"}]

def test_get_ver_estado_tarea_error(client, mock_db):
    mock_db.fetch_query.side_effect = Exception("Error en la base de datos")
    response = client.get('/ver_estado_tarea/1')
    assert response.status_code == 500
    assert "Error al obtener las tareas" in response.json['message']
