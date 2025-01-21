const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../models/auth');

const saveRecipe = require('../services/saveRecipe');
const getRecipeBySaves = require('../services/getRecipeBySaves');
const getRecipeListBySaves = require('../services/getRecipeListByList');


router.get('/saves', isAuthenticated, async (req, res) => {
    const accountId = req.session.userId;
    const savedRecipes = await getRecipeBySaves(accountId);
    console.log(savedRecipes)
    const recipesBySaves =  await getRecipeListBySaves(savedRecipes);
    console.log(recipesBySaves)
    res.render('saves', { recipesBySaves });
});

router.post('/:id/save', isAuthenticated, async (req, res) => {
    const recipeId = req.params.id;
    const accountId = req.session.userId;
    saveRecipe(accountId, recipeId);
    console.log(`${req.session.userId} saved recipe ID: ${recipeId}`);
    res.redirect('/saves');

});

module.exports = router;