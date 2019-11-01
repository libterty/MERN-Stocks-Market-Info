const redis = require('redis');

const connectRedis = url => {
  const client = redis.createClient(url);

  client.on('connect', () => console.log('Redis client connected'));
  client.on('error', err => console.log(`Sometihing went wrong ${err}`));
};

module.exports = connectRedis;
