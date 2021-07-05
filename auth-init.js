var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
require('./app.js');
var bcrypt = require('bcrypt');
 

passport.use(new LocalStrategy({passReqToCallback: false},
  async function(username, password, done) {
     console.log(username)
     console.log(password)
     var user  = await req.app.locals.collection1.findOne({"mail":username});
     if(!user) return done(null,false);
      bcrypt.compare(password, user.password).then(result=>{
        if (result == true) return done(null, user);
        else return done(null, false)})
     }
));

passport.serializeUser(function(user, done) {
 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
 
  done(null, user);
});























































