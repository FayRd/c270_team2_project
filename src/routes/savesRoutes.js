const express = require('express');
const router = express.Router();

router.get('/saves', (req, res) => {
    res.render('saves');
});

module.exports = router;