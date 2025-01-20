// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Startup session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Define paths
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./src/routes/homeRoutes'));
app.use('/', require('./src/routes/savesRoutes'));
app.use('/', require('./src/routes/reviewsRoutes'));
app.use('/', require('./src/routes/recipeRoutes'));


// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. Access at http://localhost:${PORT}`);
});