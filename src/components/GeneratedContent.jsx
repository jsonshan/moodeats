import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { useState } from 'react';
import "../temp.css"
import CheckedImage from "../assets/checked.png"
import Location from "../assets/location.png"
function GeneratedContent() {
  const [generating, setGenerating] = useState(true);
  const [foods, setFoods] = useState(["Coffee Tea", "Acai Bowls", "Bakeries"]);
  const [businesses, setBusinesses] = useState(["Pizza Hut, 555 2nd Ave, New York, NY 10016"])

  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const postReq = async () => {
    const url = 'localhost:5173';
    const info = {
      mood: "test1",
      location: "test2"
    };  

    try {
      const response = await fetch(recommendAnimeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendAnimeData),
      });

      setStatus(response.status);

      if (response.ok) {
        const responseData = await response.json();
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
    <div className='container'>
      <p className="subtitle">generating your personalized experience test</p>
      <div className="food">

      </div>
      {generating 
        ? 
          // <div className="is-generating-div">generating</div> 
          <button onClick={postReq}>Test</button>
          // <LoadScript googleMapsApiKey={googleMapsApiKey}>
          //   <GoogleMap
          //     mapContainerStyle={containerStyle}
          //     onLoad={(map) => {
          //       const bounds = new window.google.maps.LatLngBounds();
          //       locations.forEach((location) => bounds.extend(location));
          //       bounds.extend(userLocation);
          //       map.fitBounds(bounds);
          //     }}
          //   >
          //     {locations.map((location, index) => (
          //       <Marker key={index} position={location} label={location.name} />
          //     ))}

          //     <Marker  // Location Marker for User Location
          //       position={userLocation} 
          //       icon={{
          //         url: "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png", // Blue dot icon
          //         scaledSize: { width: 40, height: 40 } // Adjust size
          //       }} 
          //     />
          //   </GoogleMap>
          // </LoadScript>
        : 
        <div>
          <div className="subheading">foods</div>
          <div className="food-container">
            {foods.map((food, index) => {
              return (
                <div className="items">
                  <img className='check-image' src={CheckedImage}/>
                  <p>{food}</p>
                </div>
              )
            })}
          </div>
          <div className="subheading">businesses</div>
          <div className="business-container">
              {businesses.map((business, index) => {
                return (
                  <div className="business-items">

                  </div>
                )
              })}
          </div>
          <div>
            <button className="find-map-btn">find on map</button>
          </div>
        </div>
      }
    </div>
  )
}

export default GeneratedContent
