from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Example data structure for weekly runs and goals
weekly_data = [
    {
        "week_id": 1,
        "runs": {
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
            "Sunday": []
        },
        "goals": {
            "Monday": {"target_distance": 5, "target_time": "30:00"},
            "Tuesday": {"target_distance": 10, "target_time": "60:00"},
            # Add other 
        }
    }
]

@app.route('/api/weekly_data', methods=['GET'])
def get_weekly_data():
    return jsonify(weekly_data)

@app.route('/api/weekly_data', methods=['POST'])
def add_weekly_goal():
    new_weekly_goal = request.json
    new_weekly_goal['week_id'] = len(weekly_data) + 1
    weekly_data.append(new_weekly_goal)
    return jsonify(new_weekly_goal), 201

@app.route('/api/weekly_data/<int:week_id>/<day>/run', methods=['POST'])
def add_run_to_day(week_id, day):
    run = request.json
    for week in weekly_data:
        if week['week_id'] == week_id:
            week['runs'][day].append(run)
            return jsonify(run), 201
    return jsonify({"error": "Week not found"}), 404

@app.route('/api/weekly_data/<int:week_id>', methods=['DELETE'])
def delete_weekly_data(week_id):
    global weekly_data
    weekly_data = [week for week in weekly_data if week['week_id'] != week_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
