const path = require("path");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/secondinnings", (req, res, next) => {
  const data = req.body;
  res.render("secondinnings", { data: data });
});

exports.routes = router;
exports.data = this.data;
