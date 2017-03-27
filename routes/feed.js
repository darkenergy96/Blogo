'use strict';
const User = require('../models/user');
const Blogpost = require('../models/blogpost');
module.exports = function(req,res){
    User.findById(req.user.id,'following').populate({
        path:'following',
        // match:{blogposts:{$in:['public']}},
        select:'_id blogposts'
    }).exec(function(err,results){
        var following = results.following;
        // console.log(following);
        var filtered = [];
        var element;

        
            process.nextTick(function(){
              for(let i = 0;i < following.length;i++){
                for(let j=0; j < following[i].blogposts.length;j++){
                    element = following[i].blogposts[j];
                    if(element.visibility == 'followers' || 'public'){
                        filtered.push(element);
                    }
                    if(i == following.length-1 && j == following[i].blogposts.length-1){
                        res.json(filtered);
                    }
                }}
            });
            
        
        // res.json(filtered);
        // res.json(results.following);
    });
}

// User.findById(req.user.id).select('following').populate('following','_id email blogposts').exec(function(err,result){
//         res.json(result);
// });