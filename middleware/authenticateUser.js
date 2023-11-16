const jwt = require("jsonwebtoken");
const {UnAuthorizedError} = require("../error");
const asyncWrapper = require("./asyncWrapper");
const {verifyJWT} = require("../utils/jwtToken");

const authenticateUser = asyncWrapper(
    async (req, res, next) => {
        const {accessToken} = req.signedCookies;
        if (!accessToken) {
            throw new UnAuthorizedError("Please login to access this resource");
        }

        req.user = await verifyJWT(accessToken);
        next();
    }
);

module.exports = authenticateUser;