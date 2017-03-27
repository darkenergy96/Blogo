'use strict';
const User = require('../models/user');
module.exports = function(req,res){
    var otherUserId = req.params.otherUserId;
    User.findById(otherUserId,function(err,otherUser){
        if(err){
            res.send('internal error');
        }
        else{
            for(let i = 0;i<otherUser.followers.length;i++){
            if(otherUser.followers[i] == req.user.id){
                return res.send('Already following user!!');
            }
        }
            User.findById(req.user.id,function(err,currentUser){
                if(err){
                    res.send('Internal server error');
                }
                else{
                    otherUser.followers.push(req.user.id);
                    currentUser.following.push(otherUserId);
                    // console.log(user.followers);
                    // console.log(currentuser.following);
                    otherUser.save(function(err){
                        if(err){
                            res.send('error updating!!');
                        }
                        else{
                            currentUser.save(function(err){
                                if(err){
                                    res.send('error updating!!');
                                }
                                else{
                                    res.send('following now!!');
                                }
                            });
                        }
                    })
                    
                }
            });
        }

    })
}