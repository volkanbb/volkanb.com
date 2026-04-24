import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()
migrate = Migrate()

def create_app():
    app = Flask(__name__, static_folder='static', template_folder='templates')
    
    # Load Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

        # Initialize Extensions
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app)
    CORS(app)

    # JWT Extra Config
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return {"msg": f"Invalid token: {error}"}, 422

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return {"msg": "No token provided"}, 401

    with app.app_context():
        # Import models
        from .models.user import User
        from .models.business import Business
        from .models.service import Service
        from .models.timeslot import TimeSlot
        from .models.reservation import Reservation
        from .models.log import Log

        # Register Blueprints
        from .routes.auth_routes import auth_bp
        from .routes.customer_routes import customer_bp
        from .routes.admin_routes import admin_bp

        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(customer_bp, url_prefix='/api/customer')
        app.register_blueprint(admin_bp, url_prefix='/api/admin')

        @app.route('/')
        def index():
            return app.send_static_file('index.html')



    return app
