from main import app, db  # Assuming your app and db instances are in app.py
from models import Run, Shoe, Route, Goal  # Import your SQLAlchemy models


def seed_runs():
    run1 = Run(date='2023-05-01', distance=5.2, duration=2100, notes='Morning run')
    run2 = Run(date='2023-05-03', distance=3.7, duration=1800, notes='Evening run')
    db.session.add_all([run1, run2])

def seed_shoes():
    shoe1 = Shoe(brand='Nike', model='Air Zoom Pegasus', mileage=120.5)
    shoe2 = Shoe(brand='Adidas', model='Ultraboost', mileage=80.2)
    db.session.add_all([shoe1, shoe2])

def seed_routes():
    route1 = Route(name='Park Loop', distance=6.5, city='New York')
    route2 = Route(name='Riverside Trail', distance=10.2, city='Chicago')
    db.session.add_all([route1, route2])

def seed_goals():
    goal1 = Goal(distance=50.0, duration=18000, start_date='2023-06-01', end_date='2023-06-30', description='Monthly mileage goal')
    goal2 = Goal(distance=None, duration=7200, start_date='2023-07-01', end_date='2023-07-31', description='Monthly duration goal')
    db.session.add_all([goal1, goal2])
    
    