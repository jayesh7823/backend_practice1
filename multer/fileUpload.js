const multer = require('multer');

const storage = multer.diskStorage({
    destination: "E:/Code Learning/Internship/Week 14/backend/images/",
    filename: function(req, file, cb){
        cb(null, Date.now() + '-'+ file.originalname);
    }
});

const upload = multer({storage: storage});

module.exports = upload;