from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)

CORS(app, supports_credentials = True)

bcrypt = Bcrypt(app)

app.config.from_object(Config)


db = SQLAlchemy(app)

import routes



if __name__ == "__main__":
    app.run(debug=True)
