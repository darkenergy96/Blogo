var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local").Strategy;


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

passport.use("login", new LocalStrategy(
    function(username, password, done) {
 User.findOne({ username: username }, function(err, user) {
 if (err) { return done(err); }
 if (!user) {
 return done(null, false,
 { message: "No user has that username!" });
 }
 User.findOne({password:password},function(err,pwd){
     if(err){return done(err);}
     if(!pwd){
         return done(null,false,{message:"Incorrect password!!"});
     }
     return done(null, pwd);;
 })
 });
}));