const User = require('../models/user');
module.exports = function(req,res){
    User.find({}).select('email').exec(function(err,users){
        if(err){
            res.send('Error getting Users!!');
        }
        else{
            res.status(200);
            res.render('users',{users:users});
        }
    })
}