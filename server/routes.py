from app import app, db, bcrypt  # Import the Flask app, database, and bcrypt from main app file
from flask import jsonify, request, session  # Import functions to handle JSON responses, requests, and session
from models import User  # Import User model (assumes this is where user data is stored in the database)
from flask_jwt_extended import (  # Import JWT functions for managing tokens
    create_access_token,  # Function to create a new JWT access token
    jwt_required,  # Decorator to protect routes and require a valid JWT
    unset_jwt_cookies,  # Function to remove JWT cookies (used during logout)
)

# A basic test route for verifying that the server is running
@app.route("/", methods=["GET"])
def hello():
    return "Hello People"

# Route to create a JWT access token (used during login)
@app.route("/token", methods=["POST"])
def create_token():
    data = request.get_json()  # Extract JSON data from the incoming request
    print(data)  # Log the incoming data for debugging purposes

    username = request.json.get("username")  # Get the username from the JSON request body

    user = User.query.filter_by(username=username).first()  # Query the database for the user with the given username
    print(user)  # Log the user object (or None if not found) for debugging

    if user is None:
        return jsonify({"error": "Invalid username"}), 401  # If no user found, return an error response

    if not bcrypt.check_password_hash(user.password, data.get("password")):
        return jsonify({"error": "Invalid password"}), 401  # If password doesn't match, return an error response

    access_token = create_access_token(identity=user.user_id)  # Create a new JWT token with the user's ID
    print(access_token)  # Log the created token for debugging

    return jsonify({"access_token": access_token}), 200  # Return the token to the client with a 200 OK response

# Protected route that requires a valid JWT to access (simulates returning a profile)
@app.route("/profile", methods=["GET"])
@jwt_required()  # This decorator ensures the route is only accessible with a valid JWT
def my_profile():
    response_body = {"name": "Logged in user", "email": "loggedInUser@gmail.com"}  # Mocked profile response
    return jsonify(response_body), 200  # Return the profile data with a 200 OK status

# Route for logging out (removes JWT token from the user's cookies)
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "Successfully logged out"})  # Create a success message
    print(response)  # Log the response for debugging
    unset_jwt_cookies(response)  # Remove the JWT cookies from the response to "log out" the user
    return response, 200  # Return the response with a 200 OK status

# Route for handling user login
@app.route("/login", methods=["POST"])
def login_user():
    username = request.json.get("username")  # Get the username from the request body
    password = request.json.get("password")  # Get the password from the request body

    user = User.query.filter_by(username=username).first()  # Query the database for the user

    if user is None:
        return jsonify({"error": "Invalid username"}), 401  # Return error if user doesn't exist

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid password"}), 401  # Return error if password is incorrect

    return jsonify(user.to_json()), 200  # Return user data (converted to JSON) with a 200 OK status

# Route to register a new user
@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()  # Get the request data as JSON

    # Check if the user already exists by querying the database
    user_exists = User.query.filter_by(username=data.get("email")).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409  # Return 409 Conflict if the user already exists

    # Extract user details from the request data
    username = data.get("username")
    password = data.get("password")
    bio = data.get("bio")

    hashed_password = bcrypt.generate_password_hash(password)  # Hash the user's password

    # Create a new user instance with the provided data and hashed password
    user = User(username=username, password=hashed_password, bio=bio)

    # Add the new user to the database
    db.session.add(user)
    db.session.commit()  # Commit the transaction to save the user

    return jsonify(user.to_json())  # Return the newly created user as JSON

# Route to update user details
@app.route("/users", methods=["PUT"])
def update_user():
    data = request.get_json()  # Get the request data as JSON
    user_id = data.get("user_id")  # Extract the user ID from the data

    user = User.query.get(user_id)  # Query the database to get the user by ID

    # Update the user's details with the new data
    user.username = data.get("username")
    user.password = data.get("password")
    user.email = data.get("email")
    user.bio = data.get("bio")

    db.session.commit()  # Commit the changes to the database
    return jsonify(user.to_json())  # Return the updated user data as JSON

# Route to delete a user
@app.route("/users", methods=["DELETE"])
def delete_user():
    data = request.get_json()  # Get the request data as JSON
    user_id = data.get("user_id")  # Extract the user ID from the data

    user = User.query.get(user_id)  # Query the database to get the user by ID

    db.session.delete(user)  # Delete the user from the database
    db.session.commit()  # Commit the changes to save the deletion

    return jsonify(user.to_json())  # Return the deleted user data as JSON

# Route to get all users from the database
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()  # Query the database to get all users
    return jsonify([user.to_json() for user in users])  # Return all users as a JSON list
