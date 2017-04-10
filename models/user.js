const mongoose = require('mongoose');
var blogpostSchema = require('./blogpost').blogpostSchema;
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 8;
var userSchema = mongoose.Schema({
    email:String,
    password:String,
    joinedOn:{type:Date,default:Date.now()},
    displayName:String,
    lastActive:{type:Date},
    bio:String,
    googleId:String,
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    blogposts:[blogpostSchema]
});
var noop = function(){}
userSchema.pre("save",function(done){
    var user = this;
    if(!user.isModified("password")){
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR,function(err,salt){
        if(err){
            return done(err);
        }
        bcrypt.hash(user.password,salt,noop,function(err,hashedPassword){
            if(err){return done(err)}
            user.password = hashedPassword;
            done();
        });
    });
});

//check user's password
userSchema.methods.checkPassword = function(guess, done) {
 bcrypt.compare(guess, this.password, function(err, isMatch) {
 done(err, isMatch);
 });
};
userSchema.methods.name = function(){
    return this.displayName || this.email;
}
var User = mongoose.model('User',userSchema);
module.exports = User;