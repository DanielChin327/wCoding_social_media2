from app import db

class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(255), nullable=True)

    def to_json(self):
        return {
            "user_id":self.user_id,
            "username": self.username,
            "bio": self.bio,
        }
