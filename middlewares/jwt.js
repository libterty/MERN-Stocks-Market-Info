const jwt = require('jsonwebtoken');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const Redis = require('redis').createClient(REDIS_URL);

const authorization = async (req, res, next) => {
  const token = await req.header('x-access-token');

  // check users if it's signin or invalid
  if (!token) {
    return res
      .status(401)
      .json({ type: 'fail', message: 'You must sign in first' });
  }

  // check if token is in BlackList
  Redis.lrange('auth', 0, -1, (err, data) => {
    if (err) console.log(err);
    if (data.indexOf(token) !== -1) {
      return res
        .status(400)
        .json({ type: 'fail', message: 'Your token is invalid' });
    }

    try {
      // all success sign userInfo
      const userInfo = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = userInfo;
      next();
    } catch (error) {
      res.status(400).json({ type: 'fail', message: 'Your token is invalid' });
    }
  });
};

module.exports = authorization;
