const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../models/auth');
const getRecipeList = require('../services/getRecipeList');
const searchRecipe = require('../services/searchRecipe');

router.get('/', isAuthenticated, async (req, res) => {
    const recipeList = await getRecipeList();
    res.render('index', { recipeList });
});

router.post('/search', isAuthenticated, async (req, res) => {
    const query = req.body.query;
    const recipe = await searchRecipe(query);
    if (recipe === null) {
        res.send('No matching recipe found.')
    } else {
        res.redirect(`/${recipe.idMeal}`)
    }
})

module.exports = router;