const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let authHeader = req.header('auth-token');
    const token = authHeader
    console.log("tokem", token);
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}