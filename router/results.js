const path = require("path");
const express = require("express");
var cookieParser = require("cookie-parser");
const { forwardAuthenticated } = require("../config/auth");
const passport = require("passport");
const router = express.Router();
const Score = require("./../models/score");
const bodyParser = require("body-parser");
const { JSONCookie } = require("cookie-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

passport.session();
router.use(cookieParser());
router.use("/results", (req, res, next) => {
  const data = req.cookies.data;
  const user = req.user;
  AddData(data, user);
  res.render("results");
});

const AddData = (data, email1) => {
  const UserData = JSON.parse(data);
  const UserEmail = email1.email;
  const email = UserEmail;
  const team1 = UserData.team1;
  const team2 = UserData.team2;
  const overs = UserData.overs;
  const wickets = UserData.wickets;
  const toss = UserData.toss;
  const decided = UserData.decide;
  const target = UserData.target;
  const winner = UserData.winner;
  const balls_remaning = UserData.balls_remaning;
  const runs_remaning = UserData.runs_remaning;
  const wickets_remaning = UserData.wickets_remaning;

  // Score.findOne({ email: UserEmail }).then((scoreData) => {
  const newscoreData = {
    email,
    team1,
    team2,
    overs,
    wickets,
    toss,
    decided,
    target,
    winner,
    balls_remaning,
    runs_remaning,
    wickets_remaning,
  };
  new Score(newscoreData).save();
  // newscoreData.save();
  //   });
};

exports.routes = router;
