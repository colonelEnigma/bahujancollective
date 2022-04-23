const multer = require('multer');


const multerStorage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        const fname = file.originalname.replace(/\s/g, '');
        cb(null, `${Date.now()}` + fname);
    },
});


module.exports = { multerStorage };