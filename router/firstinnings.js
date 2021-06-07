const path = require("path");
const express = require("express");
const router = express.Router();

router.use("/firstinnings", (req, res, next) => {
  const data = req.body;
  res.render("firstinnings", { data });
});

exports.routes = router;
exports.data = this.data;
