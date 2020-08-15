var express = require("express");
var router = express.Router();
var {
  user_model
} = require("../models/user");
router.get("/register", async function (req, res, next) {
  res.render("users/register");
});

router.post("/register", async function (req, res, next) {
  let user = await user_model.findOne({
    email: req.body.email
  });
  if (user) return res.redirect("/users/register");
  user = new user_model(req.body);
  await user.save();
  res.redirect("/users/login");
});

router.get("/login", async function (req, res, next) {
  res.render("users/login");
});

router.post("/login", async function (req, res, next) {
  let user = await user_model.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    return res.redirect("/users/login");
  } else {
    req.session.user = user;
    return res.redirect("/products");
  }
});
router.get("/logout", async function (req, res, next) {
  req.session.user = null;
  res.redirect("/users/login");
});

module.exports = router;