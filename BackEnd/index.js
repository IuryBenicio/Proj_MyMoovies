const express = require("express");
const app = express();
const UserRoutes = require("../BackEnd/routes/userRoutes");
const cors = require("cors");
const port = 8000;
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const authConfig = require("./config/auth");

authConfig(passport); // Configura Passport

app.use(express.json()); // To parse JSON request bodies

//Configurar Sessão
app.use(
  session({
    secret: "MyMooviesIury",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  app.use(cors());
  next();
});

app.use("/user", UserRoutes);

try {
  app.listen(port);
  console.log(`Server running on port ${port}`);
} catch (e) {
  console.error("Error starting server:" + e);
}
