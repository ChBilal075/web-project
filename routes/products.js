var express = require("express");
var router = express.Router();
var {
  product_model
} = require("../models/product_model");
var mongoose = require("mongoose");
var checkSessionAuth = require("../middleware/checkseSessionAuth");
var validateProduct = require("../middleware/validateProducts");
var adminAuth = require("../middleware/adminAuth");


router.get("/", async function (req, res, next) {
  console.log(req.session.user);
  let products = await product_model.find();
  res.render("products/list", {
    title: "Products in DB",
    products,
  });
});


router.get("/add", checkSessionAuth, adminAuth, function (req, res, next) {
  res.render("products/add");
});
router.post("/add", validateProduct, async function (
  req,
  res,
  next
) {
  console.log(req.body);
  let product = new product_model(req.body);
  await product.save();
  res.redirect("/products");
});
router.get("/delete/:id", adminAuth, async function (req, res, next) {
  await product_model.findByIdAndDelete(req.params.id);

  res.redirect("/products");
});
router.get("/update/:id", async function (req, res, next) {
  let product = await product_model.findById(req.params.id);
  res.render("products/update", {
    product,
  });
});
router.post("/update/:id", adminAuth, async function (req, res, next) {
  let product = await product_model.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;

  await product.save();
  res.redirect("/products");
});
router.get("/cart/:id", async function (req, res, next) {
  let product = await product_model.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);


  res.redirect("/products");
});

module.exports = router;