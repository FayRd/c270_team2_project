// Returns a list of recipes that were reviewed by a certain user
const getRecipeById = require('./getRecipeById');

const getRecipeListById = async (reviewList) => {
  let list = [];
  for (let i = 0; i < reviewList.length; i++) {
    const recipe = await getRecipeById(reviewList[i].recipe_id);
    console.log(recipe)
    list.push(recipe);
  }
  return list;
};

module.exports = getRecipeListById;

