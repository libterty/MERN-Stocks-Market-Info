const express = require('express');

const router = express.Router();

const stocks = require('../models/stock');

router.get('/stocks', async (req, res) => {
  try {
    res.status(200).send(await stocks.find({}));
  } catch (error) {
    console.log(error);
  }
});

router.post('/stocks/newStock', async (req, res) => {
  try {
    const newStock = new stocks({
      name: req.body.name
    });
    res.status(201).send(await newStock.save());
  } catch (error) {
    console.log(error);
  }
});

router.delete('/stocks/:id/delete', async (req, res) => {
  try {
    await stocks.deleteOne({ _id: req.params.id });
    res.status(201).redirect('/');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
