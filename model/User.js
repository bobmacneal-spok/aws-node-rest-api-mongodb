const mongoose = require('mongoose');
const validator = require('validator');


const model = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        validate: {
            validator(name) {
                return validator.isAlphanumeric(name);
            },
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
        },
    }
});

module.exports = model;
