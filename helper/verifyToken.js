const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.header('auth-token');
    if (token.startsWith("\"")) {
        token = token.replace(/\"/g, "")
    }
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}