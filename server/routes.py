from app import app, db, bcrypt
from flask import jsonify, request


@app.route("/hello", methods = ["GET"])
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
    email = data.get("email")
    bio = data.get("bio")

    hashed_password = bcrypt.generate_password_hash(password)


    new_user = User(username=username, password=hashed_password, email=email, bio=bio)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_json()), 201
