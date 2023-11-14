const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 8
    },
    city: String,
    region: String,
    address: String,
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

schoolSchema.pre('save', async function(next) {
    const school = this;

    if (school.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        school.password = await bcrypt.hash(school.password, salt);
        next();
    }
});

module.exports = model('School', schoolSchema);