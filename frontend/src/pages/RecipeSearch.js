import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "f246e785ef72404a838da26c63c4b731"; // ✅ Your API key

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            ingredients: ingredients,
            number: 10,
            apiKey: API_KEY,
          },
        }
      );

      if (response.data.length > 0) {
        setRecipes(response.data);
        setError("");
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch (err) {
      setRecipes([]);
      setError("Failed to fetch recipes.");
    }
  };

  return (
    <div className="RS-body">
      <div className="rs-content">
        <h2>Recipe Search</h2>
        <form onSubmit={handleSubmit} className="rs-form">
          <label htmlFor="ingredients">Enter Ingredients:</label>
          <div className="btn-input">
            <input
              type="text"
              id="ingredients"
              placeholder="e.g. chicken, tomato"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
            <button type="submit">Search</button>
          </div>
        </form>
        {recipes.length > 0 ? (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div className="recipe-column" key={recipe.id}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <h3>{recipe.title}</h3>
                <a
                  href={`https://spoonacular.com/recipes/${recipe.title
                    .toLowerCase()
                    .replace(/ /g, "-")}-${recipe.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="recipe-link"
                >
                  View Recipe
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div>{error}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeSearch;
