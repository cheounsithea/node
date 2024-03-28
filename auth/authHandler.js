require('dotenv').config();

const jwt = require('jsonwebtoken');


module.exports.generateAccessToken = function (user) {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15 days' })

}

module.exports.authenticateToken = function (req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
    
}