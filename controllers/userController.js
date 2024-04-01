const passport = require('passport');

exports.login_get = (req, res) => {
    res.render('login', { title: 'Login' });
}

exports.login_post = (req, res, next) => {
    // res.redirect("/dashboard");
    res.status(200);
}

exports.logout = (req, res, next) => {
    req.logout((err)=>{
        if(err){return next(err)};
    });
    res.redirect('/users/login');
}