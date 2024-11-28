# DOC: https://flask.palletsprojects.com/en/stable/testing/

import pytest
from server.app import app as flask_app

@pytest.fixture
def app():
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def mock_db(mocker):
    # Crea un mock de la clase `DatabaseController`
    mock_db_controller = mocker.patch('db_controller.DatabaseController')
    
    # Configura las funciones mockeadas como `fetch_query` y `execute_query`
    mock_db_controller.return_value.fetch_query.return_value = [(0,)]  # Retorna un resultado vacío (sin usuarios)
    mock_db_controller.return_value.execute_query.return_value = None  # No devuelve nada en la ejecución de la consulta
    
    return mock_db_controller