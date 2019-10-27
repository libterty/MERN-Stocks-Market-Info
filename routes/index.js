const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const authorization = require('../middlewares/jwt');
const Stocks = require('../models/stock');

router.get('/stocks', authorization, async (req, res) => {
  try {
    res.status(200).send(await Stocks.find({ userId: req.user._id }));
  } catch (error) {
    res.status(404).send('Oops something went wrong');
  }
});

router.post('/stocks/newStock', authorization, async (req, res) => {
  try {
    console.log('req.user', req.user);
    const respond = await Stocks.findOne({
      name: req.body.name,
      userId: req.user._id
    });
    if (respond !== null) {
      return res
        .status(400)
        .json({ type: 'fail', message: 'Duplicate Stocks' });
    }
    const newStock = new Stocks({
      name: req.body.name,
      userId: req.user._id
    });
    await newStock.save();
    return res
      .status(201)
      .json({ type: 'success', message: `Success Create ${req.body.name}` });
  } catch (error) {
    res.status(400).json({ type: 'fail', message: `${error.message}` });
  }
});

router.delete('/stocks/:id/delete', authorization, async (req, res) => {
  try {
    const user = await Stocks.findOne({
      userId: req.user._id
    });
    if (user) {
      Stocks.findOne(
        {
          userId: user.userId,
          _id: new mongoose.mongo.ObjectID(user._id)
        },
        (err, stock) => {
          if (err) throw new Error(err);
          stock.remove(() => {
            res
              .status(204)
              .json({ type: 'success', message: 'delete success' });
          });
        }
      );
    }
  } catch (error) {
    return res.status(404).json({ type: 'fail', message: error.message });
  }
});

module.exports = router;
