const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const stock = require('../stock');
const stockItem = require('./seed').results;
const User = require('../user');
const user = require('./user.json');
const config = require('../../config');

mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    // for (let i = 0; i < stockItem.length; i++) {
    //   stock.create({
    //     name: stockItem[i].name
    //   });
    // }
    user.forEach(user => {
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return console.log(err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(users => {
              for (let i = user.stocks[0] - 1; i < user.stocks[1]; i++) {
                stock.create({
                  name: stockItem[i].name,
                  userId: users._id
                });
              }
            })
            .catch(err => console.log(err));
        });
      });
    });
  })
  .catch(err => console.log(err));
