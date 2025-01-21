const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../models/auth');

router.get('/reviews', isAuthenticated, (req, res) => {
    res.render('reviews');
});

module.exports = router;