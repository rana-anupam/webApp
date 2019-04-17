const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalPaymentSchema = new Schema({
    socialId: String,
    customer_name: String,
    customer_email: String,
    areOrdersClubbed: Boolean,
    paymentForOrders: [],
    payment_amount: Number,
    phoneNo: Number,
    startDate: {},
    endDate: {},
    singleOrderAmount: {},
    desription: String,
    sendEmail:Boolean,
    sendSMS:Boolean,
    desription: String,
    internalNotes: String,
    issuedBy: String,
    status: String,
    issue_dateTime: String,
    transactionId: String,
    timestamp: String
}, { usePushEach: true });

const RentalPayment = mongoose.model('rentalPayment', rentalPaymentSchema);

module.exports = RentalPayment;