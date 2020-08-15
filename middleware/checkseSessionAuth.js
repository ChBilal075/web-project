function checkSessionAuth(req, res, next) {
    if (req.session.user) next();
    else return res.redirect("/users/login")
    res.locals.user = req.session.user;
    next();
}

module.exports = checkSessionAuth;