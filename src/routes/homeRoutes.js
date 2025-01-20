const express = require('express');
const router = express.Router();

const getRecipeList = require('../services/getRecipeList');
const searchRecipe = require('../services/searchRecipe');

router.get('/', async (req, res) => {
    const recipeList = await getRecipeList();
    res.render('index', { recipeList });
});

router.post('/search', async (req, res) => {
    const query = req.body.query;
    const recipe = await searchRecipe(query);
    if (recipe === null) {
        res.send('No matching recipe found.')
    } else {
        res.redirect(`/${recipe.idMeal}`)
    }
})

module.exports = router;