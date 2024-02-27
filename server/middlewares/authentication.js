const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt.js");

async function authenticate(req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw { name: "JsonWebTokenError" };
    }
    const access_token = req.headers.authorization.split(" ")[1];

    const payload = verifyToken(access_token);

    const userToFind = await User.findByPk(payload.id);

    if (!userToFind) {
      throw { name: "wrong_auth" };
    }

    req.userToFind = {
      id: userToFind.id,
      email: userToFind.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;
