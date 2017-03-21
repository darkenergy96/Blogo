'use strict';
const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blogo");
var store = new MongoDBStore(
      {
        uri: 'mongodb://localhost:27017/blogo',
        collection: 'login-sessions'
      });
const routes = require("./routes/routes");
var setUpPassport = require("./setupassport");
var app = express();
app.set("port",process.env.PORT || 3000);

app.set("views",path.join(__dirname, "views"));
app.set("view engine","pug");
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(session({
    secret:"You know what its called Bentuition!",
    store:store,
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
setUpPassport();

app.use(routes);


//mongoose events

mongoose.connection.on('connected', function () {
 console.log('Mongoose connected');
});
mongoose.connection.on('error',function (err) {
 console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
 console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
 mongoose.connection.close(function () {
 console.log('Mongoose disconnected through app termination');
 process.exit(0);
 });
});

app.listen(app.get("port"),function(){
    console.log("App running on port " + app.get("port"));
})