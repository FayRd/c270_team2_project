const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../models/auth');

const getRecipeById = require('../services/getRecipeById');
const parseInstructions = require('../services/parseInstructions');
const getRecipeReviews = require('../services/getRecipeReviews');
const sendReview = require('../services/sendReview');

let recipeObj = {};

router.get('/:id', isAuthenticated, async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await getRecipeById(recipeId);
    const instructions = parseInstructions(recipe);
    recipeObj.recipe = recipe;
    recipeObj.instructions = instructions;
    res.render('recipe', { recipe, instructions });
});

router.get('/:id/reviews', isAuthenticated, async (req, res) => {
    const recipeId = req.params.id;
    if (Object.keys(recipeObj).length === 0) {
        const recipe = await getRecipeById(recipeId);
        const instructions = parseInstructions(recipe);
        recipeObj.recipe = recipe;
        recipeObj.instructions = instructions;
    }

    const reviews = await getRecipeReviews(res, recipeId);
    const recipe = recipeObj.recipe;
    res.render('allReviews', { recipe, reviews });
});

router.post('/:id/submitReview', isAuthenticated, async (req, res) => {
    const recipeId = req.params.id;
    const accountId = req.session.userId;
    const contents = req.body.contents;
    console.log(`Parameters: ${accountId} | ${recipeId} | ${contents}`);
    sendReview(accountId, recipeId, contents);
    console.log(`Review sent by ${req.session.username}`);
    res.redirect(`/${recipeId}/reviews`);
});


module.exports = router;