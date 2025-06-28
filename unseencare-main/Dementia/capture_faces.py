import sys
import os
os.environ["ALBUMENTATIONS_DISABLE_VERSION_CHECK"] = "1"
import cv2
import face_recognition
import numpy as np
import pickle
import albumentations as A
from tqdm import tqdm
from google.cloud import storage
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QLabel, QPushButton, QLineEdit, QVBoxLayout, QHBoxLayout, QWidget, QProgressBar,
    QComboBox, QMessageBox, QFrame, QDialog, QFileDialog
)
from PyQt5.QtCore import Qt, QThread, pyqtSignal
from PyQt5.QtGui import QImage, QPixmap, QColor, QLinearGradient, QBrush, QFont
from PIL import Image, ImageOps
from threading import Thread
import io

# Constants
BUCKET_NAME = "neuronest-bucket"  # Replace with your bucket name
MODEL_PATH = "models/face_encodings.pkl"

if not os.path.exists("models"):
    os.makedirs("models")

# Initialize Google Cloud Storage client
storage_client = storage.Client.from_service_account_json("service-account-key.json")
bucket = storage_client.bucket(BUCKET_NAME)

def upload_to_cloud(image, destination_blob_name):
    """Uploads an image to Google Cloud Storage."""
    try:
        if image is None or not isinstance(image, np.ndarray):
            print("Error: Invalid image provided for upload.")
            return

        _, img_encoded = cv2.imencode(".jpg", image)
        if img_encoded is None:
            print("Error: Failed to encode image.")
            return

        img_bytes = io.BytesIO(img_encoded.tobytes())
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_file(img_bytes, content_type="image/jpeg")
        print(f"Image uploaded to {destination_blob_name}.")
    except Exception as e:
        print(f"Error uploading image: {e}")

def download_from_cloud(blob_name, destination_file_name):
    """Downloads a file from Google Cloud Storage."""
    blob = bucket.blob(blob_name)
    blob.download_to_filename(destination_file_name)
    print(f"File {blob_name} downloaded to {destination_file_name}.")

def adjust_brightness(image, target_brightness=128):
    """Adjust image brightness to a target level."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    current_brightness = gray.mean()
    ratio = target_brightness / current_brightness
    adjusted_image = cv2.convertScaleAbs(image, alpha=ratio, beta=0)
    return adjusted_image

def align_face(image, face_location):
    """Align face using facial landmarks."""
    top, right, bottom, left = face_location
    face_image = image[top:bottom, left:right]
    landmarks = face_recognition.face_landmarks(face_image)
    if not landmarks:
        return face_image
    landmarks = landmarks[0]
    nose_bridge = landmarks["nose_bridge"]
    dx = nose_bridge[-1][0] - nose_bridge[0][0]
    dy = nose_bridge[-1][1] - nose_bridge[0][1]
    angle = np.degrees(np.arctan2(dy, dx))
    aligned_image = Image.fromarray(face_image)
    aligned_image = ImageOps.exif_transpose(aligned_image.rotate(-angle))
    return np.array(aligned_image)

# Advanced Data Augmentation
augmenter = A.Compose([
    A.HorizontalFlip(p=0.5),
    A.Rotate(limit=20, p=0.5),
    A.GaussianBlur(blur_limit=(0, 1.0), p=0.5),
    A.GaussNoise(var_limit=(10.0, 50.0), p=0.5),
    A.RandomBrightnessContrast(p=0.5),
    A.CLAHE(p=0.5)
])

def augment_image(image):
    augmented = augmenter(image=image)
    return augmented["image"]

class CaptureThread(QThread):
    update_frame = pyqtSignal(QImage)
    update_progress = pyqtSignal(int)
    update_status = pyqtSignal(str)
    capture_complete = pyqtSignal()

    def __init__(self, person_name, person_details, camera_index):
        super().__init__()
        self.person_name = person_name
        self.person_details = person_details
        self.camera_index = camera_index
        self.running = True

    def run(self):
        cap = cv2.VideoCapture(self.camera_index, cv2.CAP_DSHOW)
        if not cap.isOpened():
            self.update_status.emit("Error: Could not open webcam.")
            return

        # Upload details to cloud
        details_blob_name = f"{self.person_name}/details.txt"
        details_content = f"Name: {self.person_name}\nDetails: {self.person_details}"
        blob = bucket.blob(details_blob_name)
        blob.upload_from_string(details_content)

        count = 0
        total_faces = 100
        face_detection_interval = 5
        frame_count = 0

        while self.running and count < total_faces:
            ret, frame = cap.read()
            if not ret:
                self.update_status.emit("Error: Failed to capture image.")
                break

            frame = adjust_brightness(frame)

            if frame_count % face_detection_interval == 0:
                face_locations = face_recognition.face_locations(frame)
                if face_locations:
                    for top, right, bottom, left in face_locations:
                        aligned_face = align_face(frame, (top, right, bottom, left))
                        Thread(target=upload_to_cloud, args=(aligned_face, f"{self.person_name}/{count + 1}.jpg"), daemon=True).start()
                        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                        count += 1
                        self.update_progress.emit(count)
                        self.update_status.emit(f"Faces Captured: {count}/{total_faces} | Status: Face Detected")

            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            h, w, ch = frame.shape
            bytes_per_line = ch * w
            q_img = QImage(frame.data, w, h, bytes_per_line, QImage.Format_RGB888)
            self.update_frame.emit(q_img)

            frame_count += 1
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()
        self.update_status.emit(f"Faces Captured: {count}/{total_faces} | Status: Completed")
        self.capture_complete.emit()

    def stop(self):
        self.running = False

class RecognitionSourceDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Select Recognition Source")
        self.setGeometry(200, 200, 300, 150)
        self.setStyleSheet("background-color: #2E3440; color: #ECEFF4;")

        layout = QVBoxLayout()

        label = QLabel("Choose the source for face recognition:")
        label.setStyleSheet("font-size: 16px; color: #FFFFFF;")
        layout.addWidget(label)

        self.webcam_button = QPushButton("Webcam")
        self.webcam_button.setStyleSheet("""
            font-size: 14px; padding: 10px; border-radius: 5px;
            background-color: #4CAF50; color: #FFFFFF;
        """)
        self.webcam_button.clicked.connect(self.use_webcam)
        layout.addWidget(self.webcam_button)

        self.phonecam_button = QPushButton("Phone Camera")
        self.phonecam_button.setStyleSheet("""
            font-size: 14px; padding: 10px; border-radius: 5px;
            background-color: #2196F3; color: #FFFFFF;
        """)
        self.phonecam_button.clicked.connect(self.use_phonecam)
        layout.addWidget(self.phonecam_button)

        self.upload_button = QPushButton("Upload Image")
        self.upload_button.setStyleSheet("""
            font-size: 14px; padding: 10px; border-radius: 5px;
            background-color: #E91E63; color: #FFFFFF;
        """)
        self.upload_button.clicked.connect(self.upload_image)
        layout.addWidget(self.upload_button)

        self.setLayout(layout)

    def use_webcam(self):
        self.selected_source = "webcam"
        self.accept()

    def use_phonecam(self):
        self.selected_source = "phonecam"
        self.accept()

    def upload_image(self):
        self.selected_source = "upload"
        self.accept()

class FaceCaptureApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Face Capture Application")
        self.setGeometry(100, 100, 1200, 800)
        self.setStyleSheet("background-color: #2E3440; color: #ECEFF4;")

        # Central Widget
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # Gradient Background
        gradient = QLinearGradient(0, 0, 0, self.height())
        gradient.setColorAt(0, QColor("#6A1B9A"))  # Purple
        gradient.setColorAt(1, QColor("#E91E63"))  # Pink
        central_widget.setAutoFillBackground(True)
        palette = central_widget.palette()
        palette.setBrush(self.backgroundRole(), QBrush(gradient))
        central_widget.setPalette(palette)

        # Title
        title_label = QLabel("Face Capture Application")
        title_label.setStyleSheet("font-size: 32px; font-weight: bold; color: #FFFFFF;")
        title_label.setAlignment(Qt.AlignCenter)
        layout.addWidget(title_label)

        # Input Fields
        input_frame = QFrame()
        input_frame.setStyleSheet("background-color: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 20px;")
        input_layout = QVBoxLayout(input_frame)

        self.name_entry = QLineEdit()
        self.name_entry.setPlaceholderText("Enter Name")
        self.name_entry.setStyleSheet("font-size: 16px; padding: 12px; border-radius: 10px; background-color: rgba(255, 255, 255, 0.2); color: #FFFFFF;")
        input_layout.addWidget(QLabel("Name:"))
        input_layout.addWidget(self.name_entry)

        self.details_entry = QLineEdit()
        self.details_entry.setPlaceholderText("Enter Details")
        self.details_entry.setStyleSheet("font-size: 16px; padding: 12px; border-radius: 10px; background-color: rgba(255, 255, 255, 0.2); color: #FFFFFF;")
        input_layout.addWidget(QLabel("Details:"))
        input_layout.addWidget(self.details_entry)

        self.camera_combo = QComboBox()
        self.camera_combo.addItems(["0", "1"])
        self.camera_combo.setStyleSheet("font-size: 16px; padding: 12px; border-radius: 10px; background-color: rgba(255, 255, 255, 0.2); color: #FFFFFF;")
        input_layout.addWidget(QLabel("Camera:"))
        input_layout.addWidget(self.camera_combo)

        layout.addWidget(input_frame)

        # Start Capture Button
        self.start_button = QPushButton("Start Capture")
        self.start_button.setStyleSheet("""
            font-size: 18px; font-weight: bold; padding: 15px; border-radius: 10px;
            background-color: #E91E63; color: #FFFFFF;
            border: 2px solid #6A1B9A;
        """)
        self.start_button.clicked.connect(self.start_capture)
        layout.addWidget(self.start_button)

        # Train Model Button
        self.train_button = QPushButton("Train Model")
        self.train_button.setStyleSheet("""
            font-size: 18px; font-weight: bold; padding: 15px; border-radius: 10px;
            background-color: #4CAF50; color: #FFFFFF;
            border: 2px solid #388E3C;
        """)
        self.train_button.clicked.connect(self.train_model)
        layout.addWidget(self.train_button)

        # Start Recognition Button
        self.recognition_button = QPushButton("Start Recognition")
        self.recognition_button.setStyleSheet("""
            font-size: 18px; font-weight: bold; padding: 15px; border-radius: 10px;
            background-color: #2196F3; color: #FFFFFF;
            border: 2px solid #1976D2;
        """)
        self.recognition_button.clicked.connect(self.start_recognition)
        layout.addWidget(self.recognition_button)

        # List Trained Persons Button
        self.list_persons_button = QPushButton("List Trained Persons")
        self.list_persons_button.setStyleSheet("""
            font-size: 18px; font-weight: bold; padding: 15px; border-radius: 10px;
            background-color: #FF9800; color: #FFFFFF;
            border: 2px solid #F57C00;
        """)
        self.list_persons_button.clicked.connect(self.list_trained_persons)
        layout.addWidget(self.list_persons_button)

        # Progress Bar
        self.progress_bar = QProgressBar()
        self.progress_bar.setMaximum(50)
        self.progress_bar.setStyleSheet("""
            font-size: 16px; padding: 10px; border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.2); color: #FFFFFF;
            text-align: center;
        """)
        layout.addWidget(self.progress_bar)

        # Status Label
        self.status_label = QLabel("Faces Captured: 0/50 | Status: Idle")
        self.status_label.setStyleSheet("font-size: 16px; color: #FFFFFF;")
        layout.addWidget(self.status_label)

        # Camera Frame
        self.camera_frame = QLabel()
        self.camera_frame.setStyleSheet("background-color: rgba(255, 255, 255, 0.1); border-radius: 15px;")
        self.camera_frame.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.camera_frame)

    def start_capture(self):
        name = self.name_entry.text().strip()
        details = self.details_entry.text().strip()
        camera_index = int(self.camera_combo.currentText())
        if name and details:
            self.progress_bar.setValue(0)
            self.capture_thread = CaptureThread(name, details, camera_index)
            self.capture_thread.update_frame.connect(self.update_camera_frame)
            self.capture_thread.update_progress.connect(self.progress_bar.setValue)
            self.capture_thread.update_status.connect(self.status_label.setText)
            self.capture_thread.capture_complete.connect(self.capture_complete)
            self.capture_thread.start()
            self.start_button.setEnabled(False)
        else:
            QMessageBox.warning(self, "Input Error", "Please enter both name and details.")

    def update_camera_frame(self, q_img):
        self.camera_frame.setPixmap(QPixmap.fromImage(q_img))

    def capture_complete(self):
        self.start_button.setEnabled(True)
        QMessageBox.information(self, "Success", "Faces captured and saved successfully!")

    def train_model(self):
        known_face_encodings = []
        known_face_names = []

        # List all persons in the bucket
        blobs = bucket.list_blobs(prefix="")
        persons = set()
        for blob in blobs:
            if "/" in blob.name:
                persons.add(blob.name.split("/")[0])

        total_images = sum([len(list(bucket.list_blobs(prefix=f"{person}/"))) for person in persons])
        progress_bar = tqdm(total=total_images, desc="Training Model", unit="image")

        for person_name in persons:
            blobs = bucket.list_blobs(prefix=f"{person_name}/")
            for blob in blobs:
                if blob.name.endswith((".jpg", ".png")):
                    # Download image from cloud
                    local_path = os.path.join("temp", blob.name)
                    os.makedirs(os.path.dirname(local_path), exist_ok=True)
                    blob.download_to_filename(local_path)

                    # Process image
                    image = face_recognition.load_image_file(local_path)
                    augmented_image = augment_image(image)
                    face_encodings = face_recognition.face_encodings(augmented_image, num_jitters=10)

                    for encoding in face_encodings:
                        known_face_encodings.append(encoding)
                        known_face_names.append(person_name)

                    progress_bar.update(1)
                    os.remove(local_path)  # Clean up

        progress_bar.close()

        if not known_face_encodings:
            print("Error: No faces found for training.")
            return

        # Save model locally
        with open(MODEL_PATH, "wb") as f:
            pickle.dump((known_face_encodings, known_face_names), f)

        # Upload model to cloud
        upload_to_cloud(MODEL_PATH, "face_encodings.pkl")

        print(f"Model trained and saved to {MODEL_PATH}!")
        print(f"Total faces encoded: {len(known_face_encodings)}")
        QMessageBox.information(self, "Success", "Model trained and saved successfully!")

    def start_recognition(self):
        dialog = RecognitionSourceDialog(self)
        if dialog.exec_() == QDialog.Accepted:
            if dialog.selected_source == "webcam":
                self.start_webcam_recognition()
            elif dialog.selected_source == "phonecam":
                self.start_phonecam_recognition()
            elif dialog.selected_source == "upload":
                self.start_upload_recognition()

    def start_webcam_recognition(self):
        # Download the model from cloud
        if not os.path.exists(MODEL_PATH):
            download_from_cloud("face_encodings.pkl", MODEL_PATH)

        # Load face encodings
        with open(MODEL_PATH, "rb") as f:
            known_face_encodings, known_face_names = pickle.load(f)

        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            QMessageBox.showerror(self, "Error", "Could not open webcam.")
            return

        show_popup = False
        recognized_name = None

        while True:
            ret, frame = cap.read()
            if not ret:
                QMessageBox.showerror(self, "Error", "Failed to capture image.")
                break

            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
            rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            recognized_name = None
            for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"
                confidence = "Unknown"

                if True in matches:
                    first_match_index = matches.index(True)
                    name = known_face_names[first_match_index]
                    face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                    confidence = f"Confidence: {1 - face_distances[first_match_index]:.2f}"
                    recognized_name = name
                    show_popup = True  # Enable popup when a person is recognized

                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                cv2.putText(frame, f"{name} ({confidence})", (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

            # Show popup if a person is recognized
            if show_popup and recognized_name:
                frame = show_details_popup(frame, recognized_name)

            cv2.imshow("Face Recognition - Press Q to Quit", frame)

            # Handle key presses
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):  # Quit
                break
            elif key == ord('c'):  # Close popup
                show_popup = False

        cap.release()
        cv2.destroyAllWindows()

    def start_phonecam_recognition(self):
        QMessageBox.information(self, "Info", "Phone camera recognition is not implemented yet.")

    def start_upload_recognition(self):
        file_name, _ = QFileDialog.getOpenFileName(self, "Open Image", "", "Image Files (*.png *.jpg *.jpeg *.bmp)")
        if file_name:
            # Download the model from cloud
            if not os.path.exists(MODEL_PATH):
                download_from_cloud("face_encodings.pkl", MODEL_PATH)

            # Load face encodings
            with open(MODEL_PATH, "rb") as f:
                known_face_encodings, known_face_names = pickle.load(f)

            image = face_recognition.load_image_file(file_name)
            face_locations = face_recognition.face_locations(image)
            face_encodings = face_recognition.face_encodings(image, face_locations)

            for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"
                confidence = "Unknown"

                if True in matches:
                    first_match_index = matches.index(True)
                    name = known_face_names[first_match_index]
                    face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                    confidence = f"Confidence: {1 - face_distances[first_match_index]:.2f}"

                cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 2)
                cv2.putText(image, f"{name} ({confidence})", (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            cv2.imshow("Uploaded Image Recognition", image)
            cv2.waitKey(0)
            cv2.destroyAllWindows()

    def list_trained_persons(self):
        """List all persons who have trained the model."""
        persons = list_persons_in_bucket()
        if not persons:
            QMessageBox.information(self, "Trained Persons", "No persons have been trained yet.")
            return

        details = "Trained Persons:\n\n"
        for person in persons:
            details += f"{person}\n"
            details += load_person_details(person) + "\n\n"

        QMessageBox.information(self, "Trained Persons", details)

    def closeEvent(self, event):
        if hasattr(self, 'capture_thread'):
            self.capture_thread.stop()
        event.accept()

def show_details_popup(frame, person_name):
    details = load_person_details(person_name)
    # Create a black overlay
    overlay = frame.copy()
    cv2.rectangle(overlay, (0, 0), (frame.shape[1], frame.shape[0]), (0, 0, 0), -1)
    cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)

    # Display the details on the frame
    y = 50
    for line in details.split("\n"):
        cv2.putText(frame, line, (50, y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        y += 40

    # Add a close button
    cv2.putText(frame, "Press 'C' to Close", (50, y + 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
    return frame

def load_person_details(person_name):
    """Load person details from cloud."""
    try:
        blob_name = f"{person_name}/details.txt"
        blob = bucket.blob(blob_name)
        if blob.exists():
            return blob.download_as_text()
        return "No details found."
    except Exception as e:
        print(f"Error loading person details: {e}")
        return "Error loading details."

def list_persons_in_bucket():
    """List all persons in the bucket."""
    blobs = bucket.list_blobs(prefix="")
    persons = set()
    for blob in blobs:
        if "/" in blob.name:
            persons.add(blob.name.split("/")[0])
    return list(persons)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = FaceCaptureApp()
    window.show()
    sys.exit(app.exec_())