from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQALCHEMY_ECHO = True
    # SQLALCHEMY_DATABASE_URI = "mariadb+pymysql://root:@localhost:3307/orm_database"
    SQLALCHEMY_DATABASE_URI = os.getenv("DEV_DATABASE")
    CORS_HEADERS = "Content-Type"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
