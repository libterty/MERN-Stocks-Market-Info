const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
  const token = await req.header('x-access-token');
  // check users if it's signin or invalid
  if (!token) {
    return res
      .status(401)
      .json({ type: 'fail', message: 'You must sign in first' });
  }
  try {
    /** verify the token from user.model */
    const userInfo = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(400).json({ type: 'fail', message: 'Your token is invalid' });
  }
};

module.exports = authorization;
