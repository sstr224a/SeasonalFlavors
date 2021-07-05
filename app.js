// Full Documentation - https://www.turbo360.co/docs
const sqreen = require('sqreen');
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
var mustache = require('mustache');
var url = process.env.MONGODB_URI;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var flash=require("connect-flash");
//require('./auth-init.js');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const app = vertex.app() // initialize app
app.listen(process.env.PORT || 8080);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','mustache')
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

app.use(require('express-session')({
    secret: 'keyboard cat', resave :false, saveUninitialized : false
        }));
app.use(passport.initialize());
app.use(passport.session());
 
MongoClient.connect(url,{ useNewUrlParser: true })
    .then(client => {
     const db = client.db('scratch');
     const collection = db.collection('Contact_Info');
     const collection1 = db.collection('users')
     const collection2 = db.collection('search_values');
     const collection3 = db.collection('billinginfo');
     console.log("connected successfully")
     app.locals.collection = collection ;
    app.locals.collection1 = collection1;
    app.locals.collection2 = collection2;
    app.locals.collection3 = collection3;
}).catch(error=>console.log("couldn't connect"));

   
// import routes
const index = require('./routes/index')

 
// set routes
app.use('/', index)
 
 /*
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/login')
}

app.use('/userlogin.mustache/userform/*', ensureAuthenticated);
app.use('/shop-page.mustache/*', ensureAuthenticated);

*/
 

module.exports = app;