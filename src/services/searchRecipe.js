// Returns the most relevant match
const fetch = require('node-fetch');

const searchRecipe = async (query) => {
    console.log(query);
    const api_url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const res = await fetch(api_url);
    const data = await res.json();
    if (data.meals === null) {
        return null;
    }
    return data.meals[0];
};

module.exports = searchRecipe;

