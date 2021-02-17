const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.TOKEN_SECRET
const expiration = '2h'

module.exports = {
    authMiddleWare: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization

        if (req.headers.authorization) {
            token = token
            .split(' ')
            .pop()
            .trim()
        }
        console.log('token', token)

        if (!token) {
            return req
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration })
            req.employee = data
        }
        catch {
            console.log('Invalid Token')
        }
        return req
    },
    signToken: function({ firstName, email, _id }) {
        const payload = { firstName, email, _id}

        return jwt.sign(
            { data: payload },
            secret,
            { expiresIn: expiration}
        )
    }
}