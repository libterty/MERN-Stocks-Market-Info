const prodConfig = {
  database: 'mongodb://127.0.0.1/stocksapi',
  secrets: {
    JWT_TOKEN: process.env.JWT_TOKEN
  }
};

module.exports = prodConfig;
