const jwt = require('jsonwebtoken');
const mysecret = "mysecretkey";

const createToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        mysecret
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, mysecret);
}

module.exports = {createToken, verifyToken};