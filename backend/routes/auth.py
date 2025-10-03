from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from utils import db
from models.user import User

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    # check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # create new user
    user = User(email=email)
    user.set_password(password)  # assumes bcrypt/werkzeug is used
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "msg": "User registered successfully",
        "user": {"id": user.id, "email": user.email}
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))

    resp = make_response(
        jsonify(user={"id": user.id, "email": user.email})
    )
    resp.set_cookie(
        "access_token_cookie",
        access_token,
        httponly=True,
        samesite="Lax",
        secure=False,
        path="/"
    )
    return resp


@auth_bp.route("/me", methods=["GET"])
@jwt_required(locations=["cookies"])
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@auth_bp.route("/logout", methods=["POST"])
def logout():
    resp = make_response(jsonify({"msg": "Logged out"}))
    resp.delete_cookie(
        "access_token_cookie",
        path="/"
    )
    return resp