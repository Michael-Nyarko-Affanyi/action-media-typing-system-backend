const router = require('express').Router();
const {login, register, showSchool} = require('../controllers/authController');
const authenticateUser = require('../middleware/authenticateUser');

router.route('/show-school').get(authenticateUser, showSchool);
router.route('/login').post(login);
router.route('/register').post(register);

module.exports = router;