const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const authConfig = require("./config/auth");
const UserRoutes = require("./routes/userRoutes");
const MovieRoutes = require("./routes/moviesRoutes");

authConfig(passport); // Configura Passport

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); //

//Configurar Sessão
app.use(
  session({
    secret: "MyMooviesIury",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 36000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  app.use(cors());
  next();
});

app.use("/user", UserRoutes);
app.use("/movie", MovieRoutes);

try {
  app.listen(port);
  console.log(`Server running on port ${port}`);
} catch (e) {
  console.error("Error starting server:" + e);
}
