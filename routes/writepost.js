const Blogpost = require('../models/blogpost');
const User = require('../models/user');
exports.get = function(req,res){
    res.render('writepost');
}
exports.post = function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    var visibility = req.body.visibility;
    if(visibility === 'public' || 'followers' || 'private'){
        User.findById(req.user.id,'blogposts',function(err,user){
            user.blogposts.push({
                createdBy:req.user.id,
                title:title,
                description:description,
                visibility:visibility,
                upvotes:0,
                downvotes:0
            });
            user.save(function(err,user){
                if(err){
                    console.log('error!!')
                }
                else{
                    console.log('blogpost saved');
                    res.send('Blopost saved!!');
                }
            });
        })
    }
    
}


//removed
// var newblogpost = new Blogpost({
//         createdBy:req.user.id,
//         title:title,
//         description:description,
//         visibility:visibility,
//         upvotes:0,
//         downvotes:0
//     });
//     newblogpost.save(function(err,blogpost){
//         if(err){
//             return res.send('Internal Error!!');
//         }
//         else{
//             User.findById(req.user.id,function(err,currentUser){
//                 if(err){
//                     return res.send('error!!');
//                 }
//                 else{
//                     console.log(currentUser);
//                     currentUser.blogposts.push(blogpost._id);
//                     currentUser.save(function(err,user){
//                     if(err){
//                         return res.send('Error!!');
//                     }
//                     else{
//                         res.send('Post saved successfully!!');
//                     }
//                 });
//                 }
//             });
//         }
//     });