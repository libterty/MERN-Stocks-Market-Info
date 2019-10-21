const mongoose = require('mongoose');

const databaseConnect = () => {
  return mongoose
    .connect('mongodb://127.0.0.1/stocksapi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log('DB connecting'))
    .catch(err => console.log(err));
};

module.exports = databaseConnect;
