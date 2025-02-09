from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import generate_text
from google import genai
from yelp import get_businesses
from dotenv import load_dotenv
import os
import re
import ast

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

load_dotenv()
gemini_key = os.getenv("GEMINI_KEY")
yelp_key = os.getenv("YELP_API_KEY")
google_maps_key = os.getenv("GOOGLE_MAPS_KEY")

location = None

@app.route('/set-location-mood', methods=['POST'])
def set_location_mood_and_get_data():

    global location

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

        # Call the generate_text function to get categories, foods, and descriptions
        categories_, foods_, descriptions_ = generate_text(mood, gemini_key)
        print(foods_)
        # Return the data along with the location and mood
        response = {
            "location": location,
            "mood": mood,
            "categories": categories_,
            "foods": foods_,
            "descriptions": descriptions_
        }
        print(jsonify(response))
        return jsonify(response)

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500

@app.route('/fetch-businesses', methods=['POST'])
def fetch_businesses():
    try:
        # Get the data from the request
        data = request.json
        print(f"Received data: {data}")  # Debugging statement to print received data

        categories = data.get('categories')

        print(f"Categories: {categories}")  # Debugging statement to print extracted categories
        print(f"Location: {location}")  # Debugging statement to print extracted location

        # Check if categories and location are provided
        if not categories or not location:
            return jsonify({"error": "Both categories and location are required"}), 400

        # Here you would call your get_businesses function
        businesses = get_businesses(location, categories, yelp_key)

        return jsonify(businesses)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)


