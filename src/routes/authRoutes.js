const express = require('express');
const router = express.Router();
const connection = require('../models/db');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.post('/loginAccount', (req, res) => {
    const { login_username, login_password } = req.body;
    const sql = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
    connection.query(sql, [login_username, login_password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.render('login', { error: "Database error. Please try again." });
        } else {
            if (results.length > 0) {
                // User Authenticated
                req.session.username = login_username;
                req.session.loggedIn = true;
                res.redirect('/');
            } else {
                // Invalid 
                res.render('login', { error: "Invalid username or password. Please try again." });
            }
        }
    });
});

router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('register');
    }
});

router.post('/registerAccount', (req, res) => {
    const { register_username, register_password } = req.body;
    const sql = 'INSERT INTO accounts (username, password) VALUES (?, ?)';
    connection.query(sql, [register_username, register_password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry error (username already exists)
                console.error('Username already exists:', register_username);
                return res.render('register', { error: "Username already exists. Please choose another username." });
            } else {
                // Handle other database errors
                console.error('Error saving data to MySQL:', err);
                return res.render('register', { error: "Database error. Please try again." });
            }
        } else {
            console.log('User registered successfully.');
            req.session.username = register_username;
            req.session.loggedIn = true;
            res.redirect('/');
        }
    });
});

router.get('/logout',(req,res)=>{
    req.session.destroy( err =>{
        if(err){
            console.err("Error destroying the session: ",err);
        }
        res.redirect('/login');
    });
})

module.exports = router;