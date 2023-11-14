const {Schema, model} = require('mongoose');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }
});

studentSchema.pre('save', async function(next) {
    const student = this;

    if (student.isModified('school')) {
        const School = require('./School');
        const school = await School.findById(student.school);

        if (!school) {
            throw new Error('School not found');
        }

        school.students.push(student._id);
        await school.save();
    }

    next();
});

module.exports = model('Student', studentSchema);