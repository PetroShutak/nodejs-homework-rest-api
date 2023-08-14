const express = require("express");
const router = express.Router();
const { register, login } = require("../../controllers/api/authControllers");

router.post("/register", (req, res, next) => {
  register(req, res, next);
  console.log("register work");
});

router.post("/login", (req, res, next) => {
  login(req, res, next);
  console.log("login work");
});

module.exports = router;
