const {Schema, model} = require('mongoose');

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: String,
    region: String,
    address: String,
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

module.exports = model('School', schoolSchema);