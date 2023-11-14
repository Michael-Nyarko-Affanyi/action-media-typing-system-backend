const jwt = require("jsonwebtoken");

const createJWT = (user, expires = process.env.JWT_LIFETIME) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: expires
        }
    );
};

const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {createJWT, verifyJWT};