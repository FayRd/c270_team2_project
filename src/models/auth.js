// Middleware function to check user authentication status
const isAuthenticated = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        if (req.originalUrl === '/' || req.originalUrl === '/register') {
            next();
        } else {
            res.redirect('/');
        }
    }
};

module.exports = { isAuthenticated };
