from flask import Flask, jsonify, request
from flask_cors import CORS
from db_controller import DatabaseController
from usuarios import userBP
from imagenes import imagenesBP
from materiales import materialesBP
from peticiones import peticionesBP
from comanda import comandaBP
from tareas import tareasBP
from profesor import profesorBP
app = Flask(__name__)
CORS(app)
app.register_blueprint(userBP)
app.register_blueprint(imagenesBP)
app.register_blueprint(materialesBP)
app.register_blueprint(peticionesBP)
app.register_blueprint(comandaBP)
app.register_blueprint(tareasBP)
app.register_blueprint(profesorBP)

# Instanciar el controlador de la base de datos
db_controller = DatabaseController()

@app.route('/select', methods=['GET'])
def select_query():
    """Endpoint para ejecutar consultas SELECT"""
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Consulta no proporcionada"}), 400
    results = db_controller.fetch_query(query)
    if results:
        return jsonify(results)
    return jsonify({"error": "No se encontraron resultados"}), 404

@app.route('/execute', methods=['POST'])
def execute_query():
    """Endpoint para ejecutar consultas INSERT, UPDATE, DELETE"""
    data = request.json
    query = data.get('query')
    params = data.get('params', [])
    if not query:
        return jsonify({"error": "Consulta no proporcionada"}), 400
    success = db_controller.execute_query(query, params)
    if success:
        return jsonify({"status": "Operación exitosa"}), 200
    return jsonify({"error": "Falló la operación"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Verificar el estado del servicio"""
    return jsonify({"status": "running"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
