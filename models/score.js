const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  overs: {
    type: Number,
    required: true,
  },
  wickets: {
    type: Number,
    required: true,
  },
  toss: {
    type: String,
    required: true,
  },
  decided: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  winner: {
    type: Number,
    required: true,
  },
  balls_remaning: {
    type: String,
    required: true,
  },
  runs_remaning: {
    type: Number,
    required: true,
  },
  wickets_remaning: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Score = mongoose.model("Score", ScoreSchema);
module.exports = Score;
