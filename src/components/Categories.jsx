import { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
    "breakfast",
    "lunch",
    "dinner",
    "dessert",

    "coffee",
    "tea",
    "snack",
  ]);

  function updateCategories() {
    setCategories(["breakfast", "lunch", "dinner", "dessert"]);
    console.log(categories);
  }

  return (
    <>
      <div className="categories">
        {categories.map((category) => (
          <div key={category}>{category}</div>
        ))}
      </div>
      <button onClick={updateCategories}>click</button>
    </>
  );
}

export default Categories;
