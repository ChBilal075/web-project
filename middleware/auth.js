var jwt = require("jsonwebtoken");
var {
    user_model
} = require("../models/user");
const {
    use
} = require("../routes/api/users");

async function auth(req, res, next) {
    let token = req.header("x-auth-token");
    if (!token) return res.status(400).send("Token not Found");
    try {
        let user = jwt.verify(token, "someprivatekey");
        console.log(user.id);
        user = await user_model.findById(user.id);
        req.user = user;
        console.log(req.user);

    } catch (error) {
        return res.status(401).send("Invalid Token..Tempered");
    }
    next();
}

module.exports = auth;