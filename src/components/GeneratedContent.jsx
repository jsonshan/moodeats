import React, { useState } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import "../temp.css";
import CheckedImage from "../assets/checked.png";
import Location from "../assets/location.png";

function GeneratedContent() {
  const [generating, setGenerating] = useState(true);
  const [foods, setFoods] = useState(["Coffee Tea", "Acai Bowls", "Bakeries"]);
  const [businesses, setBusinesses] = useState(["Pizza Hut, 555 2nd Ave, New York, NY 10016"]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // Variables to store user input
  const [locationInput, setLocationInput] = useState("");
  const [moodInput, setMoodInput] = useState("");

  // Access the API key from environment variables
  const apiKey = "AIzaSyDllrY5vO25tKoneqAQM07yBSqmt0yERkw";  // No need for dotenv anymore

  const [selectedLocation, setSelectedLocation] = useState(null);
  // Function to send POST request to Flask backend
  const postReq = async () => {
    const url = 'http://localhost:5000/set-location-mood'; // Flask endpoint
    const info = {
      mood: moodInput,       // Get mood from the input
      location: locationInput    // Get location from the input
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      setStatus(response.status);

      if (response.ok) {
        const responseData = await response.json();
        setFoods(responseData.foods || []);  // Assuming the response contains 'foods'
        setBusinesses(responseData.businesses || []);  // Assuming the response contains 'businesses'
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
      }
    } catch (err) {
      setError(`Network Error: ${err.message}`);
      setStatus(null);
    }
  };

  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = {
    lat: 40.7128, // New York Latitude
    lng: -74.0060 // New York Longitude
  };

  const locations = [
    { lat: 40.7369861926197, lng: -73.9903117696943, name: "Union Square Greenmarket" },
    { lat: 40.7399861926197, lng: -73.9803117696943, name: "Place 2" }, 
  ];
  const userLocation = { lat: 40.7372861926197, lng: -73.9903117696943 }; // User's Entered Location

  return (
    <div className="container">
      <p className="subtitle">generating your personalized experience</p>
      
      {generating ? (
        <div>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              className="google-map-container"
              onLoad={(map) => {
                const bounds = new window.google.maps.LatLngBounds();
                locations.forEach((location) => bounds.extend(location));
                bounds.extend(userLocation);
                map.fitBounds(bounds); // Execute fitBounds function
              }}
            >
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  position={location}
                  label={location.name}
                  onClick={() => setSelectedLocation(location)}
                />
              ))}

              {selectedLocation && (
                <InfoWindow
                  position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div>
                    <img style={{height: '75px', width: 'auto'}} src={Location}/>
                    <h3>{selectedLocation.name}</h3>
                    <p><a href={`https://www.google.com/maps?q=${encodeURIComponent(selectedLocation.name)}`}>Click Here </a></p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      ) : (
        <div>
          <div className="subheading">foods</div>
          <div className="food-container">
            {foods.map((food, index) => {
              return (
                <div className="items" key={index}>
                  <img className="check-image" src={CheckedImage} alt="checked" />
                  <p>{food}</p>
                </div>
              );
            })}
          </div>
          <div className="subheading">businesses</div>
          <div className="business-container">
            {businesses.map((business, index) => {
              return (
                <div className="business-items" key={index}>
                  <p>{business}</p>
                </div>
              );
            })}
          </div>
          <div>
            <button className="find-map-btn">find on map</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratedContent;
