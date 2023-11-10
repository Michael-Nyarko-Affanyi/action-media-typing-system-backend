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

module.exports = model('Student', studentSchema);