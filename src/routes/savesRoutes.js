const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../models/auth');

router.get('/saves', isAuthenticated, (req, res) => {
    res.render('saves');
});

module.exports = router;