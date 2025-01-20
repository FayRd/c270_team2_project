const express = require('express');
const router = express.Router();

const getRecipeById = require('../services/getRecipeById');
const parseInstructions = require('../services/parseInstructions');

router.get('/:id', async (req, res) => {
    const recipeId = req.params.id
    const recipe = await getRecipeById(recipeId);
    const instructions = parseInstructions(recipe);
    res.render('recipe', { recipe, instructions });
});

module.exports = router;