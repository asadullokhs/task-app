const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();

const mainRouter = require("./src/router/mainRouter");
const authRouter = require("./src/router/authRouter");
const dashboardRouter = require("./src/router/dashboardRouter");
const mainCtrl = require("./src/controller/mainCtrl");

const app = express();
const PORT = process.env.PORT || 4002;

app.use(
  expressSession({
    secret: "ota_maxf1y",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(methodOverride("_method"));

app.use(express.static("public"));

app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// routes
app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/", dashboardRouter);

app.all("*", mainCtrl.error);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server responded at ${PORT} port...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
