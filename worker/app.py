from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import generate_text
from google import genai
import os
import re
import ast


app = Flask(__name__)


# Enable CORS for all routes
CORS(app)


@app.route("/set-location-mood", methods=["POST"])
def set_location_mood_and_get_data():
    try:
        data = request.json
        print(f"Received data: {data}")  # Debugging statement to print received data

        location = data.get("location")
        mood = data.get("mood")

        print(
            f"Extracted location: {location}"
        )  # Debugging statement to print extracted location
        print(f"Extracted mood: {mood}")  # Debugging statement to print extracted mood

        if not location or not mood:
            print("Location or mood not provided")
            return jsonify({"error": "Location or mood not provided"}), 400

        # Call the generate_text function to get categories, foods, and descriptions
        categories_, foods_, descriptions_ = generate_text(mood)
        print(foods_)
        # Return the data along with the location and mood
        response = {
            "location": location,
            "mood": mood,
            "categories": categories_,
            "foods": foods_,
            "descriptions": descriptions_,
        }
        print(jsonify(response))
        return jsonify(response)

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
