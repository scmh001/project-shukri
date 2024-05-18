from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

runs = [
    {"id": 1, "distance": 5, "time": "30:00"},
    {"id": 2, "distance": 10, "time": "60:00"}
]

@app.route('/api/runs', methods=['GET'])
def get_runs():
    return jsonify(runs)

@app.route('/api/runs', methods=['POST'])
def add_run():
    new_run = request.json
    new_run['id'] = len(runs) + 1
    runs.append(new_run)
    return jsonify(new_run), 201

@app.route('/api/runs/<int:run_id>', methods=['DELETE'])
def delete_run(run_id):
    global runs
    runs = [run for run in runs if run['id'] != run_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)