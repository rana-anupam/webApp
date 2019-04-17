const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var moment = require('moment');
var path = require('path');
var multipart = require('connect-multiparty');
var sha512 = require('js-sha512');
const CircularJSON = require('circular-json');
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const fs = require('fs');


var multipartMiddelware = multipart();

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const cartRoutes = require('./routes/cart-routes');
const payuRoutes = require('./routes/payu-routes');
const passportSetup = require('./config/passport-setup');
const OrderHistory = require('./models/orderHistory-model');
const HocketHomeQuery = require('./models/hocketHomeQuery-model');

const Message = require('./models/message-model');

const keys = require('./config/keys');

var port = process.env.PORT || 80;
const app = express();

app.use(bodyParser.json());
app.use(multipartMiddelware);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/public', express.static(__dirname+'/public'));
app.use('/app', express.static(__dirname+'/app'));
app.use('/node_modules', express.static(__dirname+'/node_modules'));
app.use('/zohoverify', express.static(__dirname+'/zohoverify'));

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.Promise = require('bluebird');
mongoose.connection.openUri('mongodb://anupam:anupam1@ds121118.mlab.com:21118/hocket_user', () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api/cart', cartRoutes);
app.use('/payu', payuRoutes);


// Schemas for products and pages
const Pages = require('./models/pages-model');
const Products = require('./models/products-model');

// create home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/app/index.html'));
    //res.render('home', { user: req.user });
});

app.get('/data/pages', (req, res) => {

    Pages.findById("5bf17667e7179a56e2121eac", function(err,jsonObj){
      var pages =  JSON.parse(JSON.stringify(jsonObj));
      res.send(pages);
      // console.log(pages.multiplyingFactor);
    });
});

app.get('/data/products', (req, res) => {
    Products.findById("5bf16467e7179a56e2121a8b", function(err,jsonObj){
      var products =  JSON.parse(JSON.stringify(jsonObj));
      //console.log(products.products.appliances.WMT01);
      res.send(products);
    });
});

// create home route
app.post('/hocket_home/query', (req, res) => {
    console.log(req.body);
    hocketHomeQuery= new HocketHomeQuery();
    hocketHomeQuery.query.push(req.body);
    hocketHomeQuery.save();
    res.send("Ok");
});

// Messages from Contact Us Page
app.post('/api/contact/message', (req, res) => {
  var time = moment().add({hours:5,minutes:30}).format('MMMM Do YYYY , h:mm:ss a');
  var userId;

  if(!req.user){
    userId = null;
  }else{
    userId = req.user._id
  }

  messageJSON = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    text: req.body.text,
    time: time,
    userId: userId
  };
  message= new Message(messageJSON);
  message.save();
  res.status(200).send('OK');
});


app.listen(port, () => {
    console.log('Server is running on port', port);
});
