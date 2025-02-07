// Returns a list of reviews for a recipe
const connection = require('../models/db');

const getRecipeReviews = async (recipeId) => {
    const sql = `SELECT * FROM reviews INNER JOIN accounts ON reviews.account_id = accounts.id WHERE recipe_id = ?;`;
    const results = await new Promise((resolve, reject) => {
      connection.query(sql, [recipeId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  };

module.exports = getRecipeReviews;

