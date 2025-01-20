// Returns a list of reviews for a recipe
const connection = require('../models/db');

const getRecipeReviews = async (res, recipeId) => {
    const sql = `SELECT * FROM reviews WHERE recipe_id = ?`;
    connection.query(sql, [recipeId], (err, results) => {
        if (err) {
            console.error(`Database query error: ${err.message}`);
            return res.status(500).send(`Error Retrieving reviews!`);
        }
        return results;
    });
};

module.exports = getRecipeReviews;

