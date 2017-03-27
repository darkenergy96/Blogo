const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Blogpost = require('../models/blogpost');
const passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var writepostRoute = require('./writepost');
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
router.get('/user/:id',require('./userProfile'))
router.get('/signout',function(req,res){
    req.logout();
    res.redirect('/signin');
});
// router.get('/post',require('./post').get);
// router.post('/post',require('./post').post);

router.get('/auth/google',
  passport.authenticate('google', { scope: 
  	[ 'https://www.googleapis.com/auth/plus.login',
  	, 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));
 
router.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/signin'
}));
//feed
router.get('/feed',require('./feed'));
router.get('/users',require('./users'));
//write a post
router.get('/writepost',writepostRoute.get);
router.post('/writepost',writepostRoute.post);
//follow user
router.put('/follow/:otherUserId',require('./followUser'));
router.use(function(req,res){
    res.send('404 error!');
});

module.exports = router;