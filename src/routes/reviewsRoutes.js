const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../models/auth');
const getRecipeByUser = require('../services/getReviewsByUser');
const getRecipeListByReview = require('../services/getRecipeListByList');

router.get('/reviews', isAuthenticated, async (req, res) => {
    const userReviews = await getRecipeByUser(res, req.session.userId);
    const recipeByReviews = await getRecipeListByReview(userReviews);
    res.render('reviews', { recipeByReviews });
});

module.exports = router;