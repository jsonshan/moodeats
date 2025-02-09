from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)


# Enable CORS for all routes
CORS(app)


# Initialize variables to store location and mood
location = ""
mood = ""


@app.route('/set-location-mood', methods=['POST'])
def set_location_mood():
    try:
        data = request.json
        print(f"Received data: {data}")  # Debugging statement to print received data


        location = data.get('location')
        mood = data.get('mood')


        print(f"Extracted location: {location}")  # Debugging statement to print extracted location
        print(f"Extracted mood: {mood}")  # Debugging statement to print extracted mood


        if not location or not mood:
            print("Location or mood not provided")
            return jsonify({"error": "Location or mood not provided"}), 400


        # Process the received data or perform further actions if necessary


        response = {
            "location": location,
            "mood": mood
        }
        return jsonify(response)
   
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)