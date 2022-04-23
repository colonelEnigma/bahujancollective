const router = require('express').Router();
const User = require('../models/User');
const { registrationValidation, loginValidation } = require('../helper/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const logger = require('../helper/logger');
const multer = require('multer');
const ms = require('../helper/uploadConfig');
const UserFile = require('../models/UserFile');
const verifyToken = require('../helper/verifyToken');
const upload = multer({ storage: ms.multerStorage });



router.post('/register', upload.single('photo'), async (req, res) => {
    // validating req body
    const { error } = registrationValidation(req.body);
    if (error) {
        logger.customLogger.log('error', error.details[0].message);
        return res.status(400).send(error.details[0].message)
    }

    //check if user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        logger.customLogger.log('error', 'email already exists');
        return res.status(400).send('email already exists')
    }

    //check if username already exists
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
        logger.customLogger.log('error', 'username taken');
        return res.status(400).send('username exists')
    }

    // hashing pass
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        username: req.body.username,
        gender: req.body.gender,
        caste: req.body.caste,
        religion: req.body.religion,
        artist: req.body.artist ? req.body.artist : false,
        writer: req.body.writer ? req.body.writer : false,
        photo: req.body.photo ? req.body.photo : ''
    });
    try {
        const savedUser = await user.save();
        res.send(`${savedUser.username} is successfully registered`);
        logger.customLogger.log('info', `user saved`);

    } catch (err) {
        logger.customLogger.log('error', `error while registering...${err}`);
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {

    //validating req body
    const { error } = loginValidation(req.body);
    if (error) {
        logger.customLogger.log('error', error.details[0].message);
        return res.status(400).send(error.details[0].message)
    }

    //check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        logger.customLogger.log('error', 'email not found');
        return res.status(400).send('email not found')
    }

    //check if pass is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
        logger.customLogger.log('error', 'invalid pass');
        return res.status(400).send('invalid pass')
    }

    // assign token
    const payload = {
        name: req.body.email,
        username: user.username
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(user);
    logger.customLogger.log('info', 'token sent');

})

module.exports = router;