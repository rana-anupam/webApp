const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pages = new Schema({}, { strict: false });

const Pages = mongoose.model('pages', pages);

module.exports = Pages;
