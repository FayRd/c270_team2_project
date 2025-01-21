// Returns a list of reviews for a recipe
const connection = require('../models/db');

const saveRecipe = async (accountId, recipeId) => {
  const sql = `INSERT INTO saves (account_id, recipe_id) VALUES (?, ?)`;
  const results = await new Promise((resolve, reject) => {
    connection.query(sql, [accountId, recipeId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return results;
};

module.exports = saveRecipe;

