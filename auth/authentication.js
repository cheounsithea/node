require('dotenv').config();

const authHandler = require('./authHandler');
const jwt = require('jsonwebtoken');
const { body, checkSchema, validationResult } = require('express-validator');
const validate = require('../helper/validator')
module.exports = function (app) {

    let refreshTokens = [];
   

    app.post('/token', (req, res) => {
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = authHandler.generateAccessToken({ name: user.name })
            res.json({ accessToken: accessToken })
        })
    })

    app.delete('/logout', (req, res) => {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.sendStatus(204)
    })

    app.post('/login', 
    checkSchema(
        validate.loginSchema,
    ),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array().map(x=>x.path+': '+x.msg)
            });
        }
        // Authenticate User

        const username = req.body.username
        // const password = req.body.password

        const user = { id:1, name: username }

        const accessToken = authHandler.generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    })

    app.post('/register', 
    checkSchema(
        validate.registrationSchema,
    ),
     (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array().map(x=>x.path+': '+x.msg)
            });
        }
        res.json({ accessToken: "Hello" })
    })

   

}
