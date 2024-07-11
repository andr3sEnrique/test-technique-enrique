const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  rating: Number,
  warrantly_years: Number,
  available: Boolean,
});

module.exports = mongoose.model('Product', productoSchema);
