// 'use strict';
// const mongoose = require('mongoose');
// var blogpostSchema = Schema({
//     createdBy:{type:Schema.Types.ObjectId,ref:'User'},
//     title:{type:String},
//     description:{type:String},
//     createdOn:{type:Date,default:Date.now()},
//     upvotes:{type:Number},
//     downvotes:{type:Number},
//     visibility:{type:String}//public,followers,private
// });

// var userNetworkSchema = mongoose.Schema({
//     _id:{type:Number,default:req.user.id},
//     followers:[userNetworkSchema],
//     following:[userNetworkSchema],
//     blogposts:[blogpostSchema]
// });
// var UserNetwork = mongoose.model('UserNetwork',userNetworkSchema);
// module.exports = UserNetwork;