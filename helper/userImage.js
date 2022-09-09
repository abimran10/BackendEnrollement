'use strict';
const multer = require('multer');
const path = require('path')
var fs = require('fs');
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {

        console.log("multer file");
        let dir = path.resolve('uploads');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        // change file name
        let splitFileName = file.originalname.split('.');
        let newFileName = file.originalname.split('.' + splitFileName[splitFileName.length - 1])[0];
        newFileName += new Date().valueOf().toString() + "." + splitFileName[splitFileName.length - 1];

        file.originalname = newFileName;
        console.log("originalname",file.originalname)



        cb(null, dir);

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const userImageUpload = multer({ storage: storage, fileFilter: null });

module.exports = { userImageUpload }