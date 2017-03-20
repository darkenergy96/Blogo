const User = require('../models/user');
module.exports.get = function(req,res){
    res.render('signup');
}
module.exports.post = function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username:username},function(err,user){
        if(err){
            return next(err);
        }
        if(user){
            req.flash('error','User already exists!!');
            return res.redirect('signup');
        }
        console.log('ok');
        var newUser = new User({
            username:username,
            password:password
        });
        newUser.save(next);
    });
}