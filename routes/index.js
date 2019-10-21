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

module.exports = router;
