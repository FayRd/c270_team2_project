// Returns a list of 6 random recipes
const fetch = require('node-fetch');

const getRecipeList = async () => {
    let list = [];
    const api_url = `https://www.themealdb.com/api/json/v1/1/random.php`;
    for (let i = 0; i < 6; i++) {
        const res = await fetch(api_url);
        const data = await res.json();
        list.push(data.meals[0]);
    }
    return list;
};

module.exports = getRecipeList;

