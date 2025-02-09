import React, { useState, useEffect } from "react";
import MoodButton from "./MoodButton";
import MoodSlider from "./MoodSlider";
import Modal from "./Modal";

function Info({ onBusinessesUpdate }) {
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [businesses, setBusinesses] = useState([]);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategorySubmit = async () => {
    try {
      // Send selected categories to Flask backend
      const response = await fetch("http://localhost:5000/fetch-businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories: selectedCategories }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Businesses received from Flask:", data);
        setBusinesses(data); // Set the businesses to display
        setError(null); // Reset any previous errors
        onBusinessesUpdate(data);
      } else {
        setError("Failed to fetch businesses");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriesBtn = document.querySelector(".submit-button");
    categoriesBtn.classList.remove("not-visible");
    const infoBtn = document.querySelector(".show-categories-button");
    infoBtn.classList.remove("not-visible");

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
      <div className="form-container">
        <div className="title">How are you feeling today?</div>
        <MoodSlider />

        {/* Error handling */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="mood-form">
          <div>Where are you located?</div>
          <input
            className="input location-input"
            type="text"
            placeholder="enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div>Describe your mood</div>
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
              {foods[index]?.map((food, idx) => {
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
        <button
          type="button"
          onClick={handleOpenModal}
          className="show-categories-button not-visible"
        >
          Show Selected Categories
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedCategories={selectedCategories}
          categories={categories}
          descriptions={descriptions}
        />
        <button
          onClick={handleCategorySubmit}
          className="submit-button button not-visible"
        >
          find meals near you
        </button>
      </div>

      {/* Display the businesses */}
      <div className="businesses">
        {businesses.length > 0 ? (
          businesses.map((business, index) => (
            <div key={index} className="business">
              <h3>{business.name}</h3>
              <p>{business.address}</p>
              <p>Latitude: {business.latitude}</p>
              <p>Longitude: {business.longitude}</p>
              <img src={business.img} alt={business.name} />
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Info;
