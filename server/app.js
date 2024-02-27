if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const {
  register,
  login,
  googleLogin,
} = require("./controllers/register_login");
const { animeDetail, getAnimes } = require("./controllers/anime_request.js");
const { generateToken, successPayment } = require("./controllers/payment");
const errorHandler = require("./middlewares/errorhandler.js");
const authenticate = require("./middlewares/authentication.js");
const { getUserRent, deleteRent } = require("./controllers/rent.js");

// whitelisting
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test simple Route
app.get("/", (req, res) => {
  res.json("sudah jalan");
});

// endpoint
// register login
app.post("/register", register);
app.post("/login", login);
app.post("/google_login", googleLogin);

// app.use(authenticate);

// animes
app.get("/animes", getAnimes);
app.get("/animes/detail/:id", animeDetail);

// payment
app.post("/payment/generate", generateToken);
app.patch("/payment/success", successPayment);

// rent
app.get("/rent", getUserRent);
app.delete("/rent/:id", deleteRent);

app.use(errorHandler);

// app.listen(PORT, () => console.log(`App listens to port ${PORT}`));

module.exports = app;
