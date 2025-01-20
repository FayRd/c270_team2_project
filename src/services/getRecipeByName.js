// Returns a recipe by name
const getRecipe = async (query) => {
    const api_url = `www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const res = await fetch(api_url).json();
    return res;
};

module.exports = getRecipe;