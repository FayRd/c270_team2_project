// Returns a recipe by id
const getRecipeById = async (query) => {
    const api_url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`;
    const res = await fetch(api_url);
    const data = await res.json();
    return data.meals[0];
};

module.exports = getRecipeById;