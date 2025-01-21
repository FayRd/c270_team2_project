// Returns a list of recipes that were reviewed by a certain user
const getRecipeById = require('./getRecipeById');

const getRecipeListByList = async (list) => {
  let resList = [];
  for (let i = 0; i < list.length; i++) {
    const recipe = await getRecipeById(list[i].recipe_id);
    resList.push(recipe);
  }
  return resList;
};

module.exports = getRecipeListByList;

