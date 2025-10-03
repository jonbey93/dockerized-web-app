from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://myuser:mypassword@db:3306/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)