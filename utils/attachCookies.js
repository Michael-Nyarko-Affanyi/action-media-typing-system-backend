const {createJWT} = require("./jwtToken");


const attachCookies = ({tokenUser, res, expires}) => {
    const token = createJWT(tokenUser);

    res.cookie('accessToken', token, {
        // httpOnly: true,
        expires: new Date(Date.now() + expires),
        // secure: true,
        signed: true,
    });
};

module.exports = attachCookies;