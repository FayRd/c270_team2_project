// Returns a recipe by id
const fetch = require('node-fetch');

const getRecipeById = async (recipeId) => {
    const api_url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const res = await fetch(api_url);
    const data = await res.json();
    return data.meals[0];
};

module.exports = getRecipeById;