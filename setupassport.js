'use strict';
var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// var apiKeys = require('./api_keys');

module.exports = function() {
 passport.serializeUser(function(user, done) {
 done(null, user._id);
 });
 passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user) {
 done(err, user);
 });
 });
};
//local
passport.use("login", new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    // passReqToCallback:true
},
    function(email, password, done) {
 User.findOne({ email: email }, function(err, user) {
 if (err) { return done(err); }
 if (!user) {
 return done(null, false,
 { message: "No user has that username!" });
 }
 user.checkPassword(password, function(err, isMatch) {
 if (err) { return done(err); }
 if (isMatch) {
 return done(null, user);
 } else {
 return done(null, false,
 { message: "Invalid password." });
 }
 });
 });
}));
//google oauth2
passport.use(new GoogleStrategy({
    clientID:     'apiKeys.google.clientID',
    clientSecret: 'apiKeys.google.clientSecret',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      //use process.nextTick() to handle asynchronously
    process.nextTick(function(){
        var email = profile.emails[0].value;
        User.findOne({email:email},function(err,user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null,user);
            }
            else{
                var newuser = new User({
                    email:email,
                    displayName:profile.displayName,
                    googleId:profile.id,
                    password:""
                });
                newuser.save(function(err,newuser){
                    if(err){
                        throw err;
                    }
                    return done(null,newuser);

                });
            }
        });
    });
  }
));