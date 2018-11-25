const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    socialId: String,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    profileUrl: String,
    email: String,
    thumbnail: String,
    platform: String,
    tempOrder:[],
    cart: [],
    orders: []
}, { usePushEach: true });

const User = mongoose.model('user', userSchema);

module.exports = User;
