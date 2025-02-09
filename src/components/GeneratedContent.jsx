/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import "../temp.css";
import CheckedImage from "../assets/checked.png";
import Location from "../assets/location.png";

function GeneratedContent({ businesses }) {
  const [generating, setGenerating] = useState(true);
  const [foods, setFoods] = useState(["Coffee Tea", "Acai Bowls", "Bakeries"]);
  const [locations, setLocations] = useState([
    {
      lat: 40.7369861926197,
      lng: -73.9903117696943,
      name: "Union Square Green",
    },
  ]); // Initial locations

  useEffect(() => {
    if (businesses && businesses.length > 0) {
      // Map the businesses into locations
      const updatedLocations = businesses.map((business) => ({
        lat: business.latitude,
        lng: business.longitude,
        name: business.name,
      }));

      setLocations(updatedLocations); // Update the locations state
    }
  }, [businesses]); // Trigger when businesses prop changes

  useEffect(() => {
    console.log("Updated locations:", locations); // Log updated locations to check
  }, [locations]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const apiKey = "AIzaSyDllrY5vO25tKoneqAQM07yBSqmt0yERkw"; // Remember to replace this with your actual API key

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 40.7128, // Default New York Latitude
    lng: -74.006, // Default New York Longitude
  };

  const userLocation = { lat: 40.7372861926197, lng: -73.9903117696943 }; // User's Entered Location

  return (
    <div className="container">
      <p className="subtitle">generating your personalized experience</p>

      {generating ? (
        <div className="temp2">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              onLoad={(map) => {
                const bounds = new window.google.maps.LatLngBounds();
                locations.forEach((location) => bounds.extend(location)); // Adjust bounds to locations
                bounds.extend(userLocation); // Also extend to the user location
                map.fitBounds(bounds); // Fit bounds based on locations
              }}
            >
              {/* Render markers only if locations are present */}
              {locations.length > 0 &&
                locations.map((location, index) => (
                  <Marker
                    key={index}
                    position={{ lat: location.lat, lng: location.lng }}
                    label={location.name}
                    onClick={() => setSelectedLocation(location)} // Set the selected location on marker click
                  />
                ))}

              {selectedLocation && (
                <InfoWindow
                  position={{
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                  }}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div>
                    <img
                      style={{ height: "75px", width: "auto" }}
                      src={Location}
                      alt="location icon"
                    />
                    <h3>{selectedLocation.name}</h3>
                    <p>
                      <a
                        href={`https://www.google.com/maps?q=${encodeURIComponent(
                          selectedLocation.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        click Here to view on Google Maps
                      </a>
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      ) : (
        <div>
          <div className="subheading">Foods</div>
          <div className="food-container">
            {foods.map((food, index) => (
              <div className="items" key={index}>
                <img className="check-image" src={CheckedImage} alt="checked" />
                <p>{food}</p>
              </div>
            ))}
          </div>
          <div className="subheading">Businesses</div>
          <div className="business-container">
            {businesses.map((business, index) => (
              <div className="business-items" key={index}>
                <p>{business.name}</p>
              </div>
            ))}
          </div>
          <div>
            <button className="find-map-btn">Find on Map</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratedContent;
