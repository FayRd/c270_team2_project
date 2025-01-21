// Returns a list of reviews for a recipe
const connection = require('../models/db');

const sendReview = async (accountId, recipeId, contents) => {
  const sql = `INSERT INTO reviews (account_id, recipe_id, date_created, contents) VALUES (?, ?, ?, ?)`;
  const now = new Date();
  const results = await new Promise((resolve, reject) => {
    connection.query(sql, [accountId, recipeId, now, contents], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return results;
};

module.exports = sendReview;

