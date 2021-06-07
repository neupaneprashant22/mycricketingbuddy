const path = require("path");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const Indexdata = [];
router.get("/index", (req, res, next) => {
  res.render("index");
});

exports.routes = router;
exports.data = Indexdata;
