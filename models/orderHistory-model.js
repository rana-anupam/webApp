const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderHistory = new Schema({
    orderNo: Number,
    orderTime: String,
    orderSummary : [],
    paymentSummary : [],
    rentalPayments : [],
    status: String
});

const OrderHistory = mongoose.model('orderHistory', orderHistory);

module.exports = OrderHistory;
