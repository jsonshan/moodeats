import React, { useState } from "react";
import MoodButton from "./MoodButton";
import MoodSlider from "./MoodSlider";

function MoodForm() {
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [error, setError] = useState(null);

  const handleCategoryClick = (e) => {
    const category = e.target.getAttribute("data-category");
    console.log(category);
    const index = selectedCategories.indexOf(category);

    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
      e.target.classList.remove("unselected");
      e.target.classList.add("selected");
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
      e.target.classList.remove("selected");
      e.target.classList.add("unselected");
    }
  };

  const handleCategorySubmit = (e) => {
    console.log(selectedCategories);
  };

  // Function to handle form submission and fetch data from Flask
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both location and mood are provided
    if (!location || !mood) {
      setError("Location and Mood are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/set-location-mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, mood }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data received from Flask:", data);
        setCategories(data.categories);
        setFoods(data.foods);
        setDescriptions(data.descriptions);
        setError(null); // Reset any previous errors
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="mood-container temp">
      <div>
        <div className="title">how are you feeling today?</div>
        <MoodSlider />

        {/* Error handling */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Form to input location and mood */}
        <form onSubmit={handleSubmit} className="mood-form">
          <div>where are you located?</div>
          <input
            className="input location-input"
            type="text"
            placeholder="enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div>describe your mood</div>
          <input
            className="input mood-input"
            type="text"
            placeholder="begin typing here"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />

          {/* Using a custom MoodButton that triggers the form submit */}
          <MoodButton />
        </form>
      </div>

      {/* Display categories, foods, and descriptions if available */}
      <div className="categories">
        {categories.map((category, index) => (
          <div
            key={index}
            data-category={category}
            onClick={handleCategoryClick}
            className="category unselected"
          >
            {category}
            <div className="dropdown">
              {foods[index].map((food, idx) => {
                return (
                  <div
                    onClick={handleCategoryClick}
                    key={idx}
                    className="dropdown-item"
                  >
                    {food}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button onClick={handleCategorySubmit} className="button submit">
          find meals near you
        </button>
      </div>
    </div>
  );
}

export default MoodForm;
