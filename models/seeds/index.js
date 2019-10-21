const mongoose = require('mongoose');
const stock = require('../stock');
const stockItem = require('./seed').results;

mongoose
  .connect('mongodb://127.0.0.1/stocksapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    for (let i = 0; i < stockItem.length; i++) {
      stock.create({
        name: stockItem[i].name
      });
    }
  })
  .catch(err => console.log(err));
