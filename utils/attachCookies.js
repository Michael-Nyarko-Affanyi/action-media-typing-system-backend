const {createJWT} = require("./jwtToken");


const attachCookies = ({tokenUser, res, expires}) => {
    const token = createJWT(tokenUser);

    res.cookie('access token', token, {
        // httpOnly: true,
        maxAge: expires,
        sameSite: 'none',
        // secure: true,
        signed: true,
    });
};

module.exports = attachCookies;