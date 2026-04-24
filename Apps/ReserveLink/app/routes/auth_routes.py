from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from app.services.user_service import UserService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'customer')

    if not name or not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    user, error = UserService.register_user(name, email, password, role)
    if error:
        return jsonify({"msg": error}), 400

    return jsonify({"msg": "User registered successfully", "user": user.to_dict()}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = UserService.get_user_by_email(email)
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})
    return jsonify(access_token=access_token, user=user.to_dict()), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.to_dict()) if user else (jsonify({"msg": "User not found"}), 404)
