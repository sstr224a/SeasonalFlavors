var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
//var users = require('./data/users.json')
var db = require('./app.js');
var bcrypt = require('bcrypt');

async function getUser (username) {
  return await req.app.locals.collection1.findOne({"mail":username});
 }

passport.use(new LocalStrategy({passReqToCallback: true},
  async function(req,username, password, done) {
     var user  = await getUser(username);
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



























































passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({"mail":req.body["email"] }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

