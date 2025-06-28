
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React

# In-memory storage for queries (use a database in production)

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


if __name__ == '__main__':
    app.run(debug=True)