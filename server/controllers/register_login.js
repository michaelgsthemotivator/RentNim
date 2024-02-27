const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { verifyPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { generateOTP } = require("../helpers/generateOTP");

const googleLogin = async (req, res, next) => {
  try {
    if (!req.headers.google_token) throw { name: "NoGoogleToken" };
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: req.headers.google_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const [user, created] = await User.findOrCreate({
      where: {
        email: ticket.getPayload().email,
      },
      defaults: {
        email: ticket.getPayload().email,
        password: generateOTP(),
        // pakai generateOTP
      },
    });
    console.log(user, created, "googlelogin");

    const access_token = generateToken({
      id: user.id,
      email: user.email,
    });
    console.log(access_token, "aku accessToken");
    if (created) {
      // buat access_token apapun yang terjadi
      res.status(201).json({ access_token });
    } else {
      res.status(200).json({ access_token });
    }
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userToCreate = await User.create({ email, password });
    res.status(201).json({
      id: userToCreate.id,
      email: userToCreate.email,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { name: "Required" };
    }

    const userWhoLogin = await User.findOne({
      where: { email },
    });

    if (userWhoLogin) {
      const isPasswordValid = verifyPassword(password, userWhoLogin.password);

      if (isPasswordValid) {
        const payload = {
          id: userWhoLogin.id,
          email: userWhoLogin.email,
        };

        const access_token = generateToken(payload);

        res.status(200).json({ access_token });
      } else {
        throw { name: "wrong_auth" };
      }
    } else {
      throw { name: "wrong_auth" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, googleLogin };
