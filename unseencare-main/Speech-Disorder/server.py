from flask import Flask, jsonify, request
from flask_cors import CORS
from speechRecognition.speech import Karen
import threading
import logging
import time

app = Flask(__name__)
CORS(app)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class KarenSystem:
    def __init__(self):
        self.karen = None
        self.is_active = False
        self.status_message = "Ready"
        self.listening_thread = None
        self.should_listen = False

    def get_status(self):
        status_info = {
            "active": self.is_active,
            "message": self.status_message,
            "current_animal": None,
            "camera_active": False,
            "karen_status": "Not initialized"
        }
        
        if self.karen:
            status_info.update({
                "current_animal": getattr(self.karen, 'current_animal', None),
                "camera_active": getattr(self.karen, 'camera_active', False),
                "karen_status": getattr(self.karen, 'status', 'Unknown'),
                "last_heard": getattr(self.karen, 'last_heard', ''),
                "listening": getattr(self.karen, 'listening', False)
            })
        
        return status_info

    def continuous_listening(self):
        """Continuous listening loop for voice commands"""
        print("[SERVER]: Starting continuous listening...")
        while self.should_listen and self.karen:
            try:
                # Listen for voice command
                command = self.karen.listen_once()
                if command:
                    print(f"[SERVER]: Heard voice command: {command}")
                    # Process the command
                    response = self.karen.process_command(command)
                    print(f"[SERVER]: Karen responded: {response}")
                else:
                    time.sleep(0.5)  # Short pause if no command heard
            except Exception as e:
                print(f"[SERVER]: Listening error: {e}")
                time.sleep(1)
        print("[SERVER]: Stopped continuous listening")

    def start_karen(self):
        try:
            if self.is_active:
                return {"status": "error", "message": "Already running"}
        
            print("[SERVER]: Starting Karen with camera and voice recognition...")
            self.karen = Karen()
        
            # Give Karen time to initialize
            time.sleep(2)
        
            # Start continuous listening in background
            self.should_listen = True
            self.listening_thread = threading.Thread(target=self.continuous_listening, daemon=True)
            self.listening_thread.start()
        
            self.is_active = True
            self.status_message = "Active - listening for voice commands"
        
            return {
                "status": "success",
                "message": "Karen started with camera and voice recognition",
                "active": True,
                "camera_active": getattr(self.karen, 'camera_active', False)
            }
        
        except Exception as e:
            error_msg = f"Start error: {str(e)}"
            print(f"[ERROR]: {error_msg}")
            return {
                "status": "error",
                "message": error_msg,
                "active": False
            }

    def stop_karen(self):
        try:
            if not self.is_active:
                return {"status": "error", "message": "Not running"}
            
            print("[SERVER]: Stopping Karen...")
            
            # Stop listening
            self.should_listen = False
            
            if self.karen:
                self.karen.stop_interaction()
            
            self.is_active = False
            self.status_message = "Stopped"
            
            return {
                "status": "success",
                "message": "Karen stopped",
                "active": False
            }
            
        except Exception as e:
            error_msg = f"Stop error: {str(e)}"
            print(f"[ERROR]: {error_msg}")
            return {
                "status": "error",
                "message": error_msg,
                "active": False
            }

    def process_command(self, command):
        try:
            if not self.karen:
                print("[SERVER]: No Karen instance available")
                return "Karen system not initialized"
        
            if not self.is_active:
                print("[SERVER]: Karen system not active")
                return "Karen system not active"
        
            print(f"[SERVER]: Processing API command: {command}")
            response = self.karen.process_command(command)
            print(f"[SERVER]: API Response: {response}")
        
            return response
        
        except Exception as e:
            error_msg = f"Command error: {str(e)}"
            print(f"[ERROR]: {error_msg}")
            return error_msg

# Initialize system
karen_system = KarenSystem()

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify(karen_system.get_status())

@app.route('/api/start', methods=['POST'])
def start():
    return jsonify(karen_system.start_karen())

@app.route('/api/stop', methods=['POST'])
def stop():
    return jsonify(karen_system.stop_karen())

@app.route('/api/command', methods=['POST'])
def command():
    try:
        data = request.get_json()
        command_text = data.get('command', '') if data else ''
        
        if not command_text:
            return jsonify({
                'status': 'error',
                'message': 'No command provided'
            }), 400
        
        response = karen_system.process_command(command_text)
        
        return jsonify({
            'status': 'success',
            'response': response,
            'command': command_text,
            'karen_status': karen_system.get_status()
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({
        "status": "success",
        "message": "Server working",
        "time": time.time()
    })

if __name__ == '__main__':
    print("[SERVER]: Starting Flask server on port 5000...")
    print("[SERVER]: Karen will listen for voice commands when started")
    print("[SERVER]: Say 'show me rabbit' or similar commands")
<<<<<<< HEAD
    app.run(host='0.0.0.0', port=5000, debug=True)
=======
    app.run(host='0.0.0.0', port=5000, debug=True)
>>>>>>> 6862d59e34a690b050f5a15188dc8a1745e7620e
