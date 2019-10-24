const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isSubscribe: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
