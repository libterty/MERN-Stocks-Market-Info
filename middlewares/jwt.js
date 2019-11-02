const jwt = require('jsonwebtoken');
const Redis = require('redis').createClient();
// const { isBlackList } = require('../redis/BlackList');

const authorization = async (req, res, next) => {
  const token = await req.header('x-access-token');
  console.log(token);
  // check users if it's signin or invalid
  if (!token) {
    return res
      .status(401)
      .json({ type: 'fail', message: 'You must sign in first' });
  }

  Redis.lrange('auth', 0, -1, (err, data) => {
    if (err) console.log(err);
    console.log(data);
    if (data.indexOf(token) !== -1) {
      return res
        .status(400)
        .json({ type: 'fail', message: 'Your token is invalid' });
    }

    try {
      const userInfo = jwt.verify(token, process.env.JWT_TOKEN);
      if (userInfo.blacklist) {
        return res
          .status(400)
          .json({ type: 'fail', message: 'Your token is invalid' });
      }
      req.user = userInfo;
      console.log('success');
      next();
    } catch (error) {
      res.status(400).json({ type: 'fail', message: 'Your token is invalid' });
    }
  });
};

module.exports = authorization;
