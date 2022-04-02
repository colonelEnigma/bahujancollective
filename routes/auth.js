const router = require('express').Router();
const User = require('../models/User');
const { registrationValidation, loginValidation } = require('../helper/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    // validating req body
    const { error } = registrationValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //check if user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('email already exists')
    }

    //hashing pass
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {

    //validating req body
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('email not found')
    }

    //check if pass is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
        return res.status(400).send('invalid pass')
    }

    // assign token
    const payload = {
        name: req.body.email,
        roles: user.role
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(user);

})

module.exports = router;