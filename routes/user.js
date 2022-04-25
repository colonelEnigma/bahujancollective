const router = require('express').Router();
const User = require('../models/User');
const logger = require('../helper/logger');
const verifyToken = require('../helper/verifyToken');


router.get('/details/email', verifyToken, async (req, res) => {

    //get email from req
    const { email } = req.body;

    //check if user already exists
    let user = await User.findOne({ email: email });
    if (!user) {
        logger.customLogger.log('error', 'email not found');
        return res.status(400).send('email not found')
    }
    user.password = undefined;
    res.status(200).send(user);
})


router.get('/details/id', verifyToken, async (req, res) => {

    //get email from req
    const { uid } = req.body;

    //check if user already exists
    let user = await User.findById({ _id: uid });
    if (!user) {
        logger.customLogger.log('error', 'email not found');
        return res.status(400).send('email not found')
    }
    user.password = undefined;
    res.status(200).send(user);
})


router.get('/details/username', verifyToken, async (req, res) => {

    //get email from req
    const { username } = req.body;

    //check if user already exists
    let user = await User.findOne({ username: username });
    if (!user) {
        logger.customLogger.log('error', 'email not found');
        return res.status(400).send('email not found')
    }
    user.password = undefined;
    res.status(200).send(user);
})



module.exports = router;