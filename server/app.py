from flask import Flask, jsonify, request  # Import Flask and tools for JSON response and handling requests
from flask_cors import CORS  # Import CORS to handle cross-origin resource sharing
from flask_bcrypt import Bcrypt  # Import Bcrypt for hashing passwords
from flask_sqlalchemy import SQLAlchemy  # Import SQLAlchemy for database interactions
from config import Config  # Import Config class to load configuration settings
from flask_jwt_extended import JWTManager  # Import JWTManager for handling JWT authentication

# Create a Flask app instance
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the app
# `supports_credentials=True` allows cookies and credentials to be passed in cross-origin requests
CORS(app, supports_credentials=True)

# Initialize Bcrypt for hashing and verifying passwords
bcrypt = Bcrypt(app)

# Load configuration settings from the Config class (likely in a separate config.py file)
app.config.from_object(Config)

# Initialize JWTManager to handle JWT (JSON Web Token) authentication
jwt = JWTManager(app)

# Initialize SQLAlchemy for database interactions
db = SQLAlchemy(app)

# Import routes from a separate file, likely containing the API routes/endpoints for the app
import routes

# Start the Flask application in debug mode (this makes it easier to catch errors during development)
if __name__ == "__main__":
    app.run(debug=True)
