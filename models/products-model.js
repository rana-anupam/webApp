const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const products = new Schema({}, { strict: false });

const Products = mongoose.model('products', products);

module.exports = Products;
