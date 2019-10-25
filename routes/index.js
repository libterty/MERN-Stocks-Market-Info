const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const authorization = require('../middlewares/jwt');
const Stocks = require('../models/stock');

// router.param('id', authorization, function(req, res, next, id) {
//   const query = Stocks.findOne({ _id: id, userId: req.user._id });
//   console.log('query mid', query);
//   query.exec((err, id) => {
//     if (err) return next(err);
//     if (!id) return next(new Error("Can't find id."));

//     req.id = id;
//     console.log('req.id', req.id);
//     return next();
//   });
// });

router.get('/stocks', authorization, async (req, res) => {
  // console.log('req.headers',req.headers['x-access-token']);
  // console.log('req.user', req.user)
  try {
    res.status(200).send(await Stocks.find({ userId: req.user._id }));
  } catch (error) {
    console.log(error);
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

router.delete('/stocks/:id/', authorization, async (req, res) => {
  try {
    const user = await Stocks.findOne({
      userId: req.user._id
    });
    console.log('user', user);
    // res.status(200).redirect('/');
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
