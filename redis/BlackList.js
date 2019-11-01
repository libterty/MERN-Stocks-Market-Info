const Redis = require('redis').createClient();

class BlackListToken {
  static addToList(token) {
    Redis.lpush('token', token);
    Redis.lrange('token', 0, -1, (err, data) => {
      console.log('err: ', err, ' data: ', data, ' data type: ', typeof data);
    });
  }
}

module.exports = BlackListToken;
