const mongoose = require('mongoose');
const appConfig = require('../config');

const databaseConnect = (config = appConfig) => {
  return mongoose
    .connect(config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log('DB connecting'))
    .catch(err => console.log(err));
};

module.exports = databaseConnect;
