const asyncWrapper = require('../middleware/asyncWrapper');
const {BadRequestError} = require('../error');
const Student = require('../models/Student');
const School = require('../models/School');

exports.login = asyncWrapper((req, res) => {
    res.send('Login endpoint');
});

exports.register = asyncWrapper(async (req, res) => {
    const {name, email, region, city, address, password, confirmPassword} = req.body;

    if(!name || !email || !region || !city || !address || !password || !confirmPassword) {
        throw new BadRequestError("Please provide all required fields")
    }

    if (password !== confirmPassword) {
        throw new BadRequestError("Passwords do not match")
    }

    const schoolExists = await School.exists({email});
    if (schoolExists) {
        throw new BadRequestError("School already exists")
    }

    const schoolDoc = await School.create(req.body);

    res.status(201).json({school: schoolDoc});
});