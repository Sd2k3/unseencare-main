
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(_name_)
CORS(app)  # Enable CORS to allow requests from React

# In-memory storage for queries (use a database in production)
queries = []

# Contact Us Form Submission
@app.route('/submit', methods=['POST'])
def submit_query():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'error': 'Missing fields'}), 400

    queries.append({
        'name': name,
        'email': email,
        'message': message
    })

    return jsonify({'message': 'Query submitted successfully!'}), 200

# Fetch Contact Us Queries
@app.route('/queries', methods=['GET'])
def get_queries():
    return jsonify(queries), 200

# Trigger SOS Alert
@app.route('/trigger-sos', methods=['POST'])
def trigger_sos():
    try:
        result = subprocess.run(['python', 'sos.py'], check=True, capture_output=True, text=True)
        print("Output from sos.py:", result.stdout)
        return jsonify({"status": "success", "message": "SOS alert triggered successfully!"}), 200
    except subprocess.CalledProcessError as e:
        print("Error in sos.py:", e.stderr)
        return jsonify({"status": "error", "message": str(e.stderr)}), 500

# Train Face Recognition Model
@app.route('/train', methods=['POST'])
def trigger_train():
    try:
        result = subprocess.run(['python', 'capture_faces.py', '--train'], check=True, capture_output=True, text=True)
        print("Output from capture_faces.py:", result.stdout)
        return jsonify({"status": "success", "message": "Model training triggered successfully!"}), 200
    except subprocess.CalledProcessError as e:
        print("Error in capture_faces.py:", e.stderr)
        return jsonify({"status": "error", "message": str(e.stderr)}), 500

# Start Object Detection
@app.route('/detect', methods=['POST'])
def trigger_detect():
    try:
        result = subprocess.run(['python', 'detect.py'], check=True, capture_output=True, text=True)
        print("Output from detect.py:", result.stdout)
        return jsonify({"status": "success", "message": "Object detection started successfully!"}), 200
    except subprocess.CalledProcessError as e:
        print("Error in detect.py:", e.stderr)
        return jsonify({"status": "error", "message": str(e.stderr)}), 500

if _name_ == '_main_':
    app.run(debug=True)