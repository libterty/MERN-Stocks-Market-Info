const jwt = require('jsonwebtoken');
const config = require('../config');

const authorization = async (req, res, next) => {
  const token = await req.header('x-access-token');
  console.log(token);
  // check users if it's signin or invalid
  if (!token) {
    return res.status(401).send('You must sign in first');
  }
  try {
    /** verify the token from user.model */
    const userInfo = jwt.verify(token, process.env.JWT_TOKEN);
    // console.log('userInfo', userInfo);
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(400).send('Your token is invalid');
  }
};

module.exports = authorization;
