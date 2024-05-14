from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models
from models import Run, Shoe, Route, Goal

# Routes
@app.route('/')
def index():
    return 'Flask app is running!'

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()  # Drop existing tables (optional)
        db.create_all()  # Create tables
        app.run(debug=True, port=8080)