import time
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from utils import db, jwt
from routes.auth import auth_bp

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://myuser:mypassword@db:3306/mydb'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "super-secret"  # use env var
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_SECURE"] = False  # True in prod (HTTPS only)
    app.config["JWT_COOKIE_SAMESITE"] = "Lax"
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False  # can enable later

    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    db.init_app(app)
    jwt.init_app(app)
    
    app.register_blueprint(auth_bp, url_prefix="/auth")

    @app.route("/")
    def home():
        return {"message": "Flask server is running!"}

    @app.route("/db-test")
    def db_test():
        try:
            result = db.session.execute(text("SELECT 1")).scalar()
            if result == 1:
                return jsonify({"status": "success", "message": "Database connection OK"})
            else:
                return jsonify({"status": "error", "message": "Unexpected result from DB"}), 500
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
    
    return app

if __name__ == "__main__":
    app = create_app()
    for i in range(10):
        try:
            with app.app_context():
                db.create_all()
            print("Database connected!")
            break
        except OperationalError as e:
            print(f"Database not ready, retrying ({i+1}/10)...")
            time.sleep(2)
    else:
        print("Could not connect to database. Exiting.")
        exit(1)

    app.run(host="0.0.0.0", port=5000, debug=True)