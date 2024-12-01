import json

def test_post_estudiantes_datos_invalidos(app, client):
    response = client.post('/estudiantes', json={
        "nombre": "Ana",
    })
    assert response.status_code == 400
    assert json.loads(response.data) == {
        "error": "Faltan campos necesarios"
    }

def test_post_estudiantes_existe(app, client, mocker):
    # Simular que el usuario ya existe devolviendo 1
    mock_fetch = mocker.patch('db_controller.DatabaseController.fetch_query')
    mock_fetch.return_value = [(1,)]

    response = client.post('/estudiantes', json={
        "nombre": "Ana",
        "apellido": "Pérez",
        "nombre_usuario": "ana_perez",
        "contraseña": "123456",
        "rol": "ESTUDIANTE"
    })
    
    # Verificar que el código de estado sea 400 y el mensaje de error
    assert response.status_code == 400
    assert json.loads(response.data) == {
        "error": "El nombre de usuario ya está registrado"
    }

def test_post_estudiantes_datos_correctos(app, client, mocker):
    # Simular que no hay usuario con ese nombre de usuario
    mock_fetch = mocker.patch('db_controller.DatabaseController.fetch_query')
    mock_fetch.return_value = [(0,)]  # Simula que no hay usuario con el mismo nombre de usuario

    # Mockear la función de inserción en la base de datos
    mock_insert = mocker.patch('db_controller.DatabaseController.execute_query')
    mock_insert.return_value = None  # No devuelve nada, pero indica que se completó correctamente



    # Realizar la solicitud POST
    response = client.post('/estudiantes', json={
        "nombre": "Ana",
        "apellidos": "Pérez",
        "nombre_usuario": "ana_perez",
        "contraseña": "123456",
        "rol": "ESTUDIANTE", 
        "color_fondo": "#FF0000",
        "tamaño_letra": "14px",
    })
    assert len(response.json) > 0  # La lista debe contener al menos un estudiante

################################

def test_put_estudiantes_datos_invalido(app, client):
    response = client.put('/estudiantes/1', json={
    })
    assert response.status_code == 400
    assert json.loads(response.data) == {
        "error": "No hay datos válidos para actualizar"
    }

def test_put_estudiante_modifica_apellido(app, client, mocker):
    # Mockear la función de actualización en la base de datos
    mock_update = mocker.patch('db_controller.DatabaseController.execute_query')
    mock_update.return_value = None  # No devuelve nada, pero indica que se completó correctamente

    # Realizar la solicitud PUT
    response = client.put('/estudiantes/1', json={
        "apellido": "García"
    })
    assert response.status_code == 200

def test_put_estudiante_modifica_color_tema(app, client, mocker):
    # Mockear la función de actualización en la base de datos
    mock_update = mocker.patch('db_controller.DatabaseController.execute_query')
    mock_update.return_value = None  # No devuelve nada, pero indica que se completó correctamente

    # Realizar la solicitud PUT
    response = client.put('/estudiantes/1', json={
        "color_tema": "#FF0000"
    })
    assert response.status_code == 200

def test_put_estudiantes_modifica_contraseña(app, client, mocker):
    # Mockear la función de actualización en la base de datos
    mock_update = mocker.patch('db_controller.DatabaseController.execute_query')
    mock_update.return_value = None  # No devuelve nada, pero indica que se completó correctamente

    # Realizar la solicitud PUT
    response = client.put('/estudiantes/1', json={
        "contraseña": "123456"
    })
    assert response.status_code == 200

def test_put_estudiante_modifica_nombre_usuario(app, client, mocker):
    # Mockear la función de actualización en la base de datos
    mock_update = mocker.patch('db_controller.DatabaseController.execute_query')
    mock_update.return_value = None  # No devuelve nada, pero indica que se completó correctamente

    # Realizar la solicitud PUT
    response = client.put('/estudiantes/1', json={
        "nombre_usuario": "ana_garcia"
    })
    assert response.status_code == 200

def test_put_estudiante_datos_correctos(app, client, mocker):
    # Mockear la función de actualización en la base de datos
    mock_update = mocker.patch('db_controller.DatabaseController.execute_query')
    mock_update.return_value = None  # No devuelve nada, pero indica que se completó correctamente

    # Realizar la solicitud PUT
    response = client.put('/estudiantes/1', json={
        "apellido": "García",
        "color_tema": "#FF0000",
        "contraseña": "123456",
        "nombre_usuario": "ana_garcia"
    })
    assert response.status_code == 200
