from flask import Flask

app = Flask(__name__)

# Simple test route
@app.route("/")
def home():
    return {"message": "Flask server is running!"}

if __name__ == "__main__":
    # Run on 0.0.0.0 so Docker container is accessible from host
    app.run(host="0.0.0.0", port=5000, debug=True)