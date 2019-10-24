const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const authorization = require('../middlewares/jwt');
const User = require('../models/user');

// Signin User
router.post('/signin', async (req, res) => {
  try {
    console.log('req.body', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('Invalid password or email');
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res.status(400).send('Invalid password or email');
    }
    const token = await jwt.sign(
      {
        _id: user._id
      },
      process.env.JWT_TOKEN
    );
    return res
      .header('x-access-token', token)
      .status(200)
      .json({ type: 'success', message: 'Login success' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
