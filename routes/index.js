const express = require('express');

const router = express.Router();

const Stocks = require('../models/stock');

router.get('/stocks', async (req, res) => {
  try {
    res.status(200).send(await Stocks.find({}));
  } catch (error) {
    console.log(error);
  }
});

router.post('/stocks/newStock', async (req, res) => {
  try {
    const respond = await Stocks.findOne({ name: req.body.name });
    if (respond !== null) {
      return res
        .status(400)
        .json({ type: 'fail', message: 'Duplicate Stocks' });
    }
    const newStock = new Stocks({
      name: req.body.name
    });
    await newStock.save();
    return res
      .status(201)
      .json({ type: 'success', message: `Success Create ${req.body.name}` });
  } catch (error) {
    res.status(400).json({ type: 'fail', message: `${error.message}` });
  }
});

router.delete('/stocks/:id/delete', async (req, res) => {
  try {
    await Stocks.deleteOne({ _id: req.params.id });
    return res.status(202).redirect('/');
  } catch (error) {
    return res.status(404).redirect('/');
  }
});

module.exports = router;
