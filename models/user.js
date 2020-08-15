const mongoose = require("mongoose");
const joi = require("@hapi/joi");


const userschema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
});

function validateUser(data) {
    const schema = joi.object({
        name: joi.string().min(3).max(15).required(),
        email: joi.string().email().min(3).max(10).required(),
        password: joi.string().min(3).max(10).required()
    });
    return schema.validate(data)
}

function validateUserLogin(data) {
    const schema = joi.object({
        email: joi.string().email().min(3).max(10).required(),
        password: joi.string().min(3).max(10).required()
    });
    return schema.validate(data)
}

const userModel = mongoose.model("users", userschema);

module.exports.user_model = userModel;
module.exports.validate = validateUser;
module.exports.validatelogin = validateUserLogin;