from app.models.user import User
from app import db
from app.utils.logging_helper import log_action

class UserService:
    @staticmethod
    def register_user(name, email, password, role='customer'):
        if User.query.filter_by(email=email).first():
            return None, "Email already exists"
        
        user = User(name=name, email=email, role=role)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        log_action(user.id, f"REGISTER: User {user.email} registered as {role}", user.id)
        return user, None

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_all_users(page=1, per_page=20):
        return User.query.paginate(page=page, per_page=per_page)
