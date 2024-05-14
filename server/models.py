from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, Date, Text, DateTime
from sqlalchemy.sql import func

db = SQLAlchemy()

class Run(db.Model):
    __tablename__ = 'runs'
    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    distance = Column(Float, nullable=False)
    duration = Column(Integer, nullable=False)  # Duration in seconds
    avg_pace = Column(Float)  # Calculated from distance/duration
    notes = Column(Text)

class Shoe(db.Model):
    __tablename__ = 'shoes'
    id = Column(Integer, primary_key=True)
    brand = Column(String(50), nullable=False)
    model = Column(String(100), nullable=False)
    mileage = Column(Float, default=0)

class Route(db.Model):
    __tablename__ = 'routes'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    distance = Column(Float, nullable=False)
    city = Column(String(100))

class Goal(db.Model):
    __tablename__ = 'goals'
    id = Column(Integer, primary_key=True)
    distance = Column(Float)
    duration = Column(Integer)  # In seconds
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    description = Column(Text)