'use strict';
const User = require('../models/user');
const Blogpost = require('../models/blogpost');
module.exports = function(req,res){
    User.findById(req.user.id,'following').populate({
        path:'following',
        match:{'blogposts.visibility':['followers','public']},
        select:'blogposts'
    }).exec(function(err,results){    
        res.json(results);
    });
}

// User.findById(req.user.id).select('following').populate('following','_id email blogposts').exec(function(err,result){
//         res.json(result);
// });