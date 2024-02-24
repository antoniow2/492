const jwt = require('jsonwebtoken');

const BEARER_PREFIX = 'Bearer';
const SECRET_KEY = 'skey';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    // Check if the header starts with "Bearer "
    const [bearer, token] = authHeader.split(' ')

    if (bearer !== BEARER_PREFIX || !token) {
        return res.status(401).json({ error: 'Unauthorized: Malformed token' })
    }

    //console.log('Received token:', token)

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Invalid token:', err.message)
            return res.status(401).json({ error: `Unauthorized: ${err.message}` })
        }

        req.userId = decoded.userId
        next()
    })
}

module.exports = authenticate
