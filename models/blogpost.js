const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogpostSchema = Schema({
    createdBy:{type:Schema.Types.ObjectId,ref:'User'},
    title:{type:String},
    description:{type:String},
    createdOn:{type:Date,default:Date.now()},
    upvotes:{type:Number},
    downvotes:{type:Number},
    visibility:{type:String}//public,followers,private
});
var Blogpost = mongoose.model('Blogpost',blogpostSchema);
module.exports = Blogpost;
module.exports.blogpostSchema = blogpostSchema;