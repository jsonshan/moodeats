function Categories() {
  const categories = [
    {
      category: "herbsandspices",
      foods: [
        "Basil",
        "Cilantro",
        "Cinnamon",
        "Mint",
        "Rosemary",
        "Saffron",
        "Thyme",
      ],
      description:
        "Herbs and spices are known to have mood-boosting properties. They can help reduce stress and anxiety, improve mood, and enhance cognitive function. Incorporating herbs and spices into your meals can help you feel more relaxed and happy.",
    },

    {
      category: "fruits",
      foods: [
        "Apples",
        "Bananas",
        "Berries",
        "Grapes",
        "Oranges",
        "Pineapple",
        "Watermelon",
      ],
      description:
        "Fruits are a great source of essential vitamins, minerals, and antioxidants that can help improve your mood and overall well-being. They are also a good source of natural sugars that can provide a quick energy boost and help regulate blood sugar levels.",
    },

    {
      category: "vegetables",
      foods: [
        "Broccoli",
        "Carrots",
        "Kale",
        "Spinach",
        "Sweet Potatoes",
        "Tomatoes",
        "Zucchini",
      ],
      description:
        "Vegetables are packed with essential nutrients that can help improve your mood and mental health. They are rich in fiber, vitamins, and minerals that can help reduce inflammation, boost energy levels, and support brain function.",
    },

    {
      category: "nutsandseeds",
      foods: [
        "Almonds",
        "Chia Seeds",
        "Flaxseeds",
        "Pumpkin Seeds",
        "Sunflower Seeds",
        "Walnuts",
      ],
      description:
        "Nuts and seeds are a good source of healthy fats, protein, and fiber that can help improve your mood and reduce stress. They are also rich in antioxidants and other nutrients that can support brain health and cognitive function.",
    },

    {
      category: "fishandseafood",
      foods: ["Salmon", "Sardines", "Shrimp", "Tuna"],
      description:
        "Fish and seafood are rich in omega-3 fatty acids, which are essential for brain health and mood regulation. They can help reduce inflammation, improve cognitive function, and support mental well-being. Incorporating fish and seafood into your diet can help boost your mood and overall health.",
    },

    {
      category: "dairy",
      foods: ["Cheese", "Greek Yogurt", "Milk"],
      description:
        "Dairy products are a good source of calcium, protein, and other essential nutrients that can help improve your mood and overall well-being. They are also rich in probiotics that can support gut health and boost your immune system. Including dairy products in your diet can help you feel more energized and happy.",
    },

    {
      category: "grains",
      foods: ["Brown Rice", "Oats", "Quinoa", "Whole Wheat Bread"],
      description:
        "Whole grains are a good source of fiber, vitamins, and minerals that can help improve your mood and mental health. They are also rich in complex carbohydrates that can provide a steady source of energy and help regulate blood sugar levels. Incorporating whole grains into your diet can help you feel more satisfied and balanced.",
    },
  ];
  // function handleClick() {
  //   const location = document.querySelector(".location-input").value;
  //   const mood = document.querySelector(".mood-input").value;
  //   const slider = document.querySelector(".slider").value;
  //   console.log(location);
  //   console.log(mood);
  //   console.log(slider);
  // }

  return (
    <div className="container">
      <div className="categories">
        {categories.map((category, index) => (
          <div key={index} className="category">
            {category.category}
            <div className="dropdown">
              {category.foods.map((food, foodIndex) => (
                <div key={foodIndex} className="dropdown-item">
                  {food}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
