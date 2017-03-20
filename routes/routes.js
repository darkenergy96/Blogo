const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
const isAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    else{
        next();
    }
};
router.use(function(req, res, next) {
 res.locals.currentUser = req.user;
 res.locals.errors = req.flash("error");
 res.locals.infos = req.flash("info");
 if(req.user){
      User.findById({_id:req.user.id},function(err,user){
    if(err){
        console.error(err);
    }
    else{
        user.lastActive = Date.now();
        user.save(function(err,user){
            if(err){
                console.error(err);
            }
        });
    }
 });
 }
 next();
});
router.get('/',require('./home'));
router.get('/signin',isAuthenticated,require('./signin').get);
router.post('/signin',passport.authenticate('login',{
    successRedirect:'/',
    failureRedirect:'/signin',
    failureFlash:true
}));
router.get('/signup',isAuthenticated,require('./signup').get);
router.post('/signup',require('./signup').post,passport.authenticate('login',{
    successRedirect:'/',
    failureRedirect:'signup',
    failureFlash:true
}));
router.get('/user/:username',require('./userProfile'))
router.get('/signout',function(req,res){
    req.logout();
    res.redirect('/signin');
});
router.get('/post',require('./post').get);
router.post('/post',require('./post').post);
router.use(function(req,res){
    res.send('404 error!');
});


module.exports = router;