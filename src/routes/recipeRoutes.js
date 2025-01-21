const express = require('express');
const router = express.Router();

const getRecipeById = require('../services/getRecipeById');
const parseInstructions = require('../services/parseInstructions');
const getRecipeReviews = require('../services/getRecipeReviews');

let recipeObj = {};

router.get('/:id', async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await getRecipeById(recipeId);
    const instructions = parseInstructions(recipe);
    recipeObj.recipe = recipe;
    recipeObj.instructions = instructions
    res.render('recipe', { recipe, instructions });
});

router.get('/:id/reviews', async (req, res) => {
    const recipeId = req.params.id;
    if (Object.keys(recipeObj).length === 0) {
        const recipe = await getRecipeById(recipeId);
        const instructions = parseInstructions(recipe);
        recipeObj.recipe = recipe;
        recipeObj.instructions = instructions
    }

    const reviews =  await getRecipeReviews(res, recipeId);
    const recipe = recipeObj.recipe
    res.render('allReviews', { recipe, reviews });
});

module.exports = router;