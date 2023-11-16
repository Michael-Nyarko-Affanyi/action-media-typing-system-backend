const asyncWrapper = require('../middleware/asyncWrapper');
const {BadRequestError} = require('../error');
const Student = require('../models/Student');
const School = require('../models/School');
const {createJWT} = require("../utils/jwtToken");
const attachCookies = require("../utils/attachCookies");
const bcrypt = require('bcrypt');


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

    const tokenUser = {
        id: schoolDoc._id,
        email: schoolDoc.email,
    }

    attachCookies({res, tokenUser, expires: 1000 * 60 * 60 * 24});
    res.status(201).json({msg: "School created successfully"});
});

exports.login = asyncWrapper(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new BadRequestError("Please provide all required fields")
    }

    const schoolDoc = await School.findOne({email});

    if (!schoolDoc) {
        throw new BadRequestError("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, schoolDoc.password);

    if (!isPasswordValid) {
        throw new BadRequestError("Invalid credentials")
    }

    const tokenUser = {
        id: schoolDoc._id,
        email: schoolDoc.email,
    }
    attachCookies({res, tokenUser, expires: 1000 * 60 * 60 * 24});

    res.status(200).json({msg: "Login successful"});
});

exports.logout = asyncWrapper(async (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json({msg: "Logout successful"});
});

exports.showSchool = asyncWrapper(async (req, res) => {
    const schoolDoc = await School.findById(req.user.id).populate('students').select('-password');
    res.status(200).json({school: schoolDoc});
});