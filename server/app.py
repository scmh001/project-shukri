from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///runs.db'
db = SQLAlchemy(app)

class Run(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    distance = db.Column(db.Float, nullable=False)
    time = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

@app.route('/api/runs', methods=['GET'])
def get_runs():
    runs = Run.query.all()
    return jsonify([{'id': run.id, 'distance': run.distance, 'time': run.time, 'date': run.date} for run in runs])

@app.route('/api/runs', methods=['POST'])
def add_run():
    data = request.get_json()
    new_run = Run(distance=data['distance'], time=data['time'])
    db.session.add(new_run)
    db.session.commit()
    return jsonify({'id': new_run.id, 'distance': new_run.distance, 'time': new_run.time, 'date': new_run.date})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)