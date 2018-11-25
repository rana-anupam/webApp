const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    text: String,
    time: String,
    userId: String
});

const Message = mongoose.model('message', userSchema);

module.exports = Message;
