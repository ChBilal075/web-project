const mongoose = require("mongoose");
const joi = require("@hapi/joi");


const productSchema = mongoose.Schema({
    id: String,
    name: String,
    price: Number,

});

function validateProduct(data) {
    const schema = joi.object({
        id: joi.string().required(),
        name: joi.string().min(3).max(20).required(),
        price: joi.number().min(0).required()
    });
    return schema.validate(data)
}

const productModel = mongoose.model("products", productSchema);

module.exports.product_model = productModel;
module.exports.validate = validateProduct;