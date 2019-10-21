const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockApiSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('stockApiModel', stockApiSchema);
