const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
  const token = await req.header('x-access-token');
  console.log(token);
  // check users if it's signin or invalid
  if (!token) {
    return res
      .status(401)
      .json({ type: 'fail', message: 'You must sign in first' });
  }
  try {
    const userInfo = jwt.verify(token, process.env.JWT_TOKEN);
    console.log('userInfo', userInfo);
    console.log('in try req', req);
    if (userInfo.blacklist) {
      return res
        .status(400)
        .json({ type: 'fail', message: 'Your token is invalid' });
    }
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(400).json({ type: 'fail', message: 'Your token is invalid' });
  }
};

module.exports = authorization;
