const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    joinedOn:{type:Date,default:Date.now()},
    displayName:String,
    lastActive:{type:Date},
    bio:String
});
userSchema.methods.name = function(){
    return this.displayName || this.username;
}
var User = mongoose.model('User',userSchema);
module.exports = User;