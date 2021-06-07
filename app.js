const express = require("express");
const path = require("path");
const rootDir = require("./helper/path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

//internal routes defined
const adminData = require("./router/index");
const firstinningsData = require("./router/firstinnings");
const secondinningsData = require("./router/secondinnings");
const resultsData = require("./router/results");
const historyData = require("./router/history");

// Passport Config
require("./config/passport")(passport);

//DB config
const db = require("./config/keys").MongoURI;

//connect to MongoCompass
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//set EJS engine
app.set("view engine", "ejs");
app.set("views", "views");

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

//expresssessions
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//to use public folders
app.use(express.static(path.join(__dirname, "./public")));

//routes
app.use("/", require("./router/welcome.js"));
app.use("/users", require("./router/user.js"));
app.use("/users", adminData.routes);
app.use("/users", firstinningsData.routes);
app.use("/users", secondinningsData.routes);
app.use("/users", resultsData.routes);
app.use("/users", historyData.routes);

app.use("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "notfound.html"));
});
app.listen(3000);
