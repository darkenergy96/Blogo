const User = require('../models/user');
module.exports.get = function(req,res){
    User.findById(req.user.id,function(err,user){
        if(err){
            res.send('Internal  Error');
        }
        else{
            res.render('post',{user:user})
        }
    })
};
module.exports.post = function(req,res){
    var updatedProfile = {
        email:req.body.username,
        bio:req.body.bio,
        displayName:req.body.displayName
    }
    User.update({_id:req.user.id},{$set:updatedProfile},function(err,profile){
        if(err){
            req.flash('error','error updating profile');
            res.redirect('/post');
        }
        else{
            req.flash('info','profile updated successfully');
            res.redirect(`/user/${updatedProfile.username}`);
        }
    })
}