const express = require("express");
const router = express.Router();
const Score = require("./../models/score");
const passport = require("passport");

passport.session();
router.use("/history", (req, res, next) => {
  const userEmail = req.user.email;
  Score.find({ email: userEmail }).then((result) => {
    if (result) {
      res.render("history", { results: result });
    }
  });
});

exports.routes = router;
