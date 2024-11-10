import mysql.connector
from mysql.connector import Error

class DatabaseController:
    def __init__(self):
        """Inicializa la conexión a la base de datos"""
        try:
            self.connection = mysql.connector.connect(
                host='localhost',
                port=3307,
                user='user',  # El usuario definido en docker-compose
                password='password',  # La contraseña definida en docker-compose
                database='dgp'  # La base de datos definida en docker-compose
            )
            if self.connection.is_connected():
                print("Conexión exitosa a la base de datos")
        except Error as e:
            print(f"Error al conectar a la base de datos: {e}")
            self.connection = None

    def execute_query(self, query, params=None):
        """
        Ejecuta una consulta SQL (INSERT, UPDATE, DELETE)
        Retorna True si la consulta fue exitosa, de lo contrario False.
        """
        if not self.connection or not self.connection.is_connected():
            print("No hay conexión activa a la base de datos.")
            return False
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                self.connection.commit()
            return True
        except Error as e:
            print(f"Error al ejecutar la consulta: {e}")
            return False

    def fetch_query(self, query, params=None):
        """
        Ejecuta una consulta SELECT y devuelve los resultados.
        """
        if not self.connection or not self.connection.is_connected():
            print("No hay conexión activa a la base de datos.")
            return None
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                results = cursor.fetchall()
            return results
        except Error as e:
            print(f"Error al ejecutar la consulta: {e}")
            return None

    def close_connection(self):
        """Cierra la conexión a la base de datos"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Conexión cerrada")
        else:
            print("La conexión ya estaba cerrada o no existe.")
