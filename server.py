# app.py
from flask import Flask, jsonify
import mysql.connector
import os

app = Flask(__name__)

# Configuración de la base de datos
DB_HOST = "localhost"
DB_USER = "dgp"
DB_PASSWORD = "dgp"
DB_NAME = "dgp"

# Versión esperada
EXPECTED_VERSION = '3.1'

@app.route('/tables', methods=['GET'])
def get_tables():
    try:
        # Conectar a la base de datos MySQL
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        cursor = conn.cursor()

        # Ejecutar la consulta para obtener las tablas
        cursor.execute("SHOW TABLES")
        tables = [table[0] for table in cursor.fetchall()]

        # Cerrar la conexión
        cursor.close()
        conn.close()

        # Retornar las tablas en formato JSON con la versión
        return jsonify({"version": EXPECTED_VERSION, "tables": tables})

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
