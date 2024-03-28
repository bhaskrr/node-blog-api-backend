exports.authenticate = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('login', { title : "Login", message : "Session expired! Please log in" });
}