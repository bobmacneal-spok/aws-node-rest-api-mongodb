const mongoose = require('mongoose');
const validator = require('validator');


const model = mongoose.model('User', {
    firstName: {
        type: String,
        required: true,
        validate: {
            validator(name) {
                return validator.isAlpha(name);
            },
        },
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator(name) {
                return validator.isAlpha(name);
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
