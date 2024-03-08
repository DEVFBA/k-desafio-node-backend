// const { findUserById } = require('../util/fileSystem')
const Users = require("../models/model_users");
const jwt = require("jsonwebtoken");

// MIDDLEWARE
const validUser = async (req, res, next) => {
  // const { userid } = req.headers
  // const user = await Users.findById(userid)
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1]; // se retiro la parte que dice Bearer en el header
  try {
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    console.log(decoded);
    const date = Math.floor(new Date().getTime() / 1000);
    console.log(date);
    if (decoded.exp < date) {
      res.status(401).send({ message: "session expired" });
    } else {
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).send("Login is required");
  }
};

module.exports = {
  validUser,
};
