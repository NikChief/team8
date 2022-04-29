require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cookieSession = require("cookie-session");
const cors = require('cors');
const passportSetup = require("./passport");
const passport = require("passport");

const PORT = process.env.PORT || 3000;
const app = express();
// const Router = require('./router/router');
const authRoute = require("./router/auth");

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// app.use('/api', Router);
app.use("/auth", authRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server start at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
