const multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+req.user.username+'.jpg');
    }
});
var upload = multer({storage:storage}).single('photo');
exports.get = function(req,res){
    res.render('fileUpload');
};
// exports.name = upload.single('file');
exports.post = function(req,res){
    upload(req,res,function(err){
        if(err){
            return res.end('error uploading file');
        }
        res.redirect('/uploadpic');
    })

};