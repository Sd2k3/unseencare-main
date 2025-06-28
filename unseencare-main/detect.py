import cv2
import torch
from ultralytics import YOLO

# Check for GPU availability and use CUDA if available
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Load a larger YOLOv8 model for better accuracy
model = YOLO("yolov8x.pt").to(device)  # Use 'yolov8x.pt' for best accuracy

# Open the webcam
cap = cv2.VideoCapture(0)  # 0 for default webcam

# Set higher resolution for better accuracy
FRAME_WIDTH = 1280
FRAME_HEIGHT = 1280
cap.set(3, FRAME_WIDTH)  # Set width
cap.set(4, FRAME_HEIGHT)  # Set height

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Resize frame for efficient processing
    resized_frame = cv2.resize(frame, (FRAME_WIDTH, FRAME_HEIGHT))

    # Perform Object Detection with adjusted confidence and IOU thresholds
    results = model(resized_frame, conf=0.5, iou=0.4, device=device)  # Optimized inference

    # Process detections
    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates
            conf = round(float(box.conf[0]), 2)  # Confidence score
            cls = int(box.cls[0])  # Class index

            if conf > 0.5:  # Show only high-confidence detections
                label = f"{model.names[cls]} {conf}"
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    # Display the output frame
    cv2.imshow("Improved Object Detection", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()