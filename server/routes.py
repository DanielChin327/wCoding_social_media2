from app import app, db, bcrypt
from flask import jsonify, request
from models import User
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    unset_access_cookies,
)


@app.route("/", methods = ["GET"])
def hello():
    return "Hello People"


@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    user_exists = (
        User.query.filter_by(username=data.get("username")).first() is not None
    )

    if user_exists:
        return jsonify({"Failed to create account": "username already exists"}), 409

    username = data.get("username")
    password = data.get("password")
    bio = data.get("bio")

    hashed_password = bcrypt.generate_password_hash(password)


    new_user = User(username=username, password=hashed_password, bio=bio)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_json()), 201


@app.route("/login", methods= ["POST"])
def login_user():
    username = request.json.get("username")
    password = request.json.get("password")

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "Invalid Username"}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid Password"}), 401

    return jsonify(user.to_json()), 200


@app.route("/token", methods=["POST"])
def create_token():
    data = request.get_json()
    print(data)

    username = request.json.get("username")

    user = User.query.filter_by(username=username).first()

    print(user)

    if user is None:
        return jsonify({"error": "Invalid username"}), 401

    if not bcrypt.check_password_hash(user.password, data.get("password")):
        return jsonify({"error": "Invalid password"}), 401

    access_token = create_access_token(identity=user.user_id)
    print(access_token)

    return jsonify({"access_token": access_token}), 200
