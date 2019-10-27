const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorization = require('../middlewares/jwt');
const User = require('../models/user');

// Signin User
router.post('/signin', async (req, res) => {
  try {
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
      process.env.JWT_TOKEN,
      { expiresIn: '7d' },
      { algorithm: 'RS256' }
    );
    return res
      .header('x-access-token', token)
      .status(200)
      .json({ type: 'success', message: 'Login success' });
  } catch (error) {
    console.log(error);
  }
});

// Create User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(404)
        .json({ type: 'fail', message: 'Please complete all the form' });
    }

    if (password.length < 6) {
      return res
        .status(404)
        .json({ type: 'fail', message: 'Password too short' });
    }

    if (password.length > 16) {
      return res
        .status(404)
        .json({ type: 'fail', message: 'Password too long' });
    }

    if (password !== confirmPassword) {
      return res
        .status(404)
        .json({ type: 'fail', message: 'Make sure submit correct password' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ type: 'fail', message: 'Email already in use' });
    }
    const newUser = new User({
      name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.error(err);
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(async user => {
            const token = await jwt.sign(
              {
                _id: user._id
              },
              process.env.JWT_TOKEN,
              { expiresIn: '7d' },
              { algorithm: 'RS256' }
            );

            return res
              .header('x-access-token', token)
              .status(201)
              .json({ type: 'success', message: 'Create Success' });
          })
          .catch(err => console.log(err));
      });
    });
  } catch (error) {
    res.status(400).json({ type: 'fail', message: error.message });
  }
});

// logout User
router.get('/logout', authorization, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).json({ type: 'fail', message: 'Bad Request' });
    }
    return res
      .status(200)
      .json({ type: 'success', message: 'You have success logout' });
  } catch (error) {
    return res.status(400).json({ type: 'fail', message: error.message });
  }
});

module.exports = router;
