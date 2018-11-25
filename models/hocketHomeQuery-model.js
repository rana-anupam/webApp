const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hocketHomeQuery = new Schema({
    query: []
});

const HocketHomeQuery = mongoose.model('hocketHomeQuery', hocketHomeQuery);

module.exports = HocketHomeQuery;
