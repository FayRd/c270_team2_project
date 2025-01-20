const express = require('express');
const router = express.Router();

const getRecipeList = require('../services/getRecipeList');

router.get('/', async (req, res) => {
    const recipeList = await getRecipeList();
    res.render('index', { recipeList });
});

module.exports = router;