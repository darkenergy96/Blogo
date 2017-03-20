const User = require('../models/user');
module.exports = function(req,res){
    var username = req.params.username;
    User.findOne({username:username},function(err,user){
        if(err){
            res.send('error getting user');

        }
        else{
            res.send(user);
        }
    })
    
}