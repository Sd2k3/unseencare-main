from twilio.rest import Client
import requests
import webbrowser
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Twilio credentials (replace with your own)


load_dotenv()

# Twilio credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = "+19208126026"
RECIPIENT_PHONE_NUMBER = ""

# Email credentials
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_RECIPIENT = os.getenv("EMAIL_RECIPIENT")

# SOS message
SOS_MESSAGE = "Hiii it's me Swarajit, just trying out the SOS feature...YOOOO"

# Function to get GPS coordinates using an alternative IP-based service
def get_gps_coordinates():
    try:
        # Use an IP-based location service (e.g., ipinfo.io)
        response = requests.get('https://ipinfo.io')
        if response.status_code == 200:
            data = response.json()
            location = data.get('loc', '').split(',')
            if len(location) == 2:
                latitude, longitude = float(location[0]), float(location[1])
                return latitude, longitude
        return None, None
    except Exception as e:
        print(f"Failed to get GPS coordinates: {e}")
        return None, None

# Function to generate Google Maps link
def generate_google_maps_link(latitude, longitude):
    if latitude and longitude:
        return f"https://www.google.com/maps?q={latitude},{longitude}&z=15"  # Zoom level 15
    else:
        return None

# Function to send SMS using Twilio
def send_sms(latitude=None, longitude=None, manual_location=None):
    try:
        # Prepare the SOS message
        if latitude and longitude:
            gps_location = f"Latitude: {latitude}, Longitude: {longitude}"
            google_maps_link = generate_google_maps_link(latitude, longitude)
            full_message = f"{SOS_MESSAGE}\nMy location: {gps_location}\nGoogle Maps: {google_maps_link}"
        elif manual_location:
            full_message = f"{SOS_MESSAGE}\nMy location: {manual_location}"
        else:
            full_message = f"{SOS_MESSAGE}\nMy location: Location not available"

        # Send SMS
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=full_message,
            from_=TWILIO_PHONE_NUMBER,
            to=RECIPIENT_PHONE_NUMBER
        )
        print(f"SMS sent: {message.sid}")
        return {"status": "success", "message": "SMS alert sent successfully!"}
    except Exception as e:
        print(f"Failed to send SMS: {e}")
        return {"status": "error", "message": f"Failed to send SMS alert: {str(e)}"}

# Function to send email
def send_email(latitude=None, longitude=None, manual_location=None):
    try:
        # Prepare the email content
        subject = "SOS Alert!"
        if latitude and longitude:
            gps_location = f"Latitude: {latitude}, Longitude: {longitude}"
            google_maps_link = generate_google_maps_link(latitude, longitude)
            body = f"{SOS_MESSAGE}\nMy location: {gps_location}\nGoogle Maps: {google_maps_link}"
        elif manual_location:
            body = f"{SOS_MESSAGE}\nMy location: {manual_location}"
        else:
            body = f"{SOS_MESSAGE}\nMy location: Location not available"

        # Create the email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_SENDER
        msg['To'] = EMAIL_RECIPIENT
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Connect to Gmail's SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECIPIENT, msg.as_string())

        print("Email sent successfully!")
        return {"status": "success", "message": "Email alert sent successfully!"}
    except Exception as e:
        print(f"Failed to send email: {e}")
        return {"status": "error", "message": f"Failed to send email alert: {str(e)}"}

# Function to handle SOS button click
def sos_button_click():
    # Try to fetch GPS coordinates
    latitude, longitude = get_gps_coordinates()

    if latitude and longitude:
        # If GPS coordinates are available, send the SMS and email with location
        sms_result = send_sms(latitude, longitude)
        email_result = send_email(latitude, longitude)

        # Open Google Maps in the default browser
        google_maps_link = generate_google_maps_link(latitude, longitude)
        if google_maps_link:
            webbrowser.open(google_maps_link)  # Open the link in the browser
        else:
            print("Failed to generate Google Maps link.")
        return sms_result, email_result
    else:
        # If GPS coordinates are not available, ask the user for manual location input
        manual_location = input("Unable to fetch your location. Please enter your location manually (e.g., address or landmark): ")
        if manual_location:
            sms_result = send_sms(manual_location=manual_location)
            email_result = send_email(manual_location=manual_location)
        else:
            # If the user cancels manual input, send the alert without location
            sms_result = send_sms()
            email_result = send_email()
        return sms_result, email_result

if __name__ == "__main__":
    sos_button_click()