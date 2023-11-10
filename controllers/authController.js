const asyncWrapper = require('../middleware/asyncWrapper');

exports.login = asyncWrapper((req, res) => {
    res.send('Login endpoint');
});