import React, { useState } from 'react';

function CategoryFoodDescription() {
  const [location, setLocation] = useState('');
  const [mood, setMood] = useState('');
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle form submission and fetch data from Flask
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both location and mood are provided
    if (!location || !mood) {
      setError('Location and Mood are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/set-location-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, mood }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data received from Flask:", data);
        setCategories(data.categories);
        setFoods(data.foods);
        setDescriptions(data.descriptions);
        setError(null);  // Reset any previous errors
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div className="category-food-description-container">
      <h2>Enter Location and Mood</h2>

      {/* Error handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form to input location and mood */}
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </label>

        <label>
          Mood:
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Enter mood"
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {/* Display the categories, foods, and descriptions if available */}
      {categories.length > 0 && (
        <div className="category-food-description-list">
          <h3>Categories and Suggested Foods</h3>
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <h4>{category}</h4>
              <p>Foods: {foods[index].join(', ')}</p>
              <p>Description: {descriptions[index]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryFoodDescription;
