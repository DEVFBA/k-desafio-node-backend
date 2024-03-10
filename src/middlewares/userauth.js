// const { findUserById } = require('../util/fileSystem')
//const Users = require('../models/model_users')
const jwt = require('jsonwebtoken')

// MIDDLEWARE

const validUser = async (req, res, next) => {

  try {

    const { authorization } = req.headers;
    const token = authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    const date = Math.floor(new Date().getTime() / 1000);

    if (decoded.exp < date) {

      res.status(401).send({ 
        message: 'Session expired',
        data: null 
      });

    } else {
      
      req.user = decoded;

      next();
      
    }

  } catch (error) {

    res.status(401).send('Login is required');

  }
}

module.exports = {
  validUser
}
