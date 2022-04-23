const router = require('express').Router();
const User = require('../models/User');
const { registrationValidation, loginValidation } = require('../helper/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../helper/logger');
const multer = require('multer');
const UserFile = require('../models/UserFile');

const ms = require('../helper/uploadConfig')

const upload = multer({ storage: ms.multerStorage });

router.post('/', upload.array('photos', 5), async (req, res) => {

    console.log("req.........", req.files);

    const userExists = await User.findOne({ email: req.user.name });
    if (!userExists) {
        logger.customLogger.log('error', 'user not found');
        return res.status(400).send('user not found')
    }

    console.log("user....", userExists.id);

    Promise.all(
        req.files.map(async (ele) => {
            // const newUpload = new Uploads({
            //     _id: new Types.ObjectId(),
            //     path: ele.path,
            //     owner: req.user.userId,
            // });
            // logger.customLogger.log('info', 'uploading image...............');
            console.log("ookk...", ele);
            // 

            const newFile = new UserFile({
                name: ele.originalname,
                userId: userExists.id
            });

            console.log("new... filee...", newFile);

            return await newFile.save();
        })
    )
        .then(res.status(201).json("files successfully uploaded"))
        .catch((e) => {
            res
                .status(500)
                .json({ message: "Something went wrong in /uploads/img", error: e });
        });








    // console.log("file length..", req.files.length);

    // req.files.forEach(async (ele) => {
    //     console.log("for  each.......................................", ele);


    //     console.log("saving.......................................");

    //     try {
    //         await newFile.save();
    //     } catch (err) {
    //         logger.customLogger.log('error', err);
    //         res.status(400).send(err)
    //     }
    // })

    // res.send('file saved');
    // logger.customLogger.log('info', `File saved`);


})


router.post('/profile', async (req, res) => {
    upload.single('photo')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('uploading error')
        } else if (err) {
            return res.status(400).send('uploading error')
        }

        const newFile = new UserFile({
            name: req.file.originalname,
            path: req.file.path
        });


        try {
            const savedFile = await newFile.save();
            res.send({ "path": req.file.path });
            logger.customLogger.log('info', `file saved`);
        } catch (err) {
            logger.customLogger.log('error', `error while uplaoding...${err}`);
            res.status(400).send(err)
        }
    })

})


module.exports = router;