const mongoose = require('mongoose');
const bluebird = require('bluebird');
const validator = require('validator');
const UserModel = require('./model/User.js');

mongoose.Promise = bluebird;

const DB_URI = 'mongodb://lambdauser:SoXFyiJqDpUnjh5G@ds139919.mlab.com:39919/platform';
let dbOptions = {
    bufferMaxEntries: 0,
    bufferCommands: false
};

const createErrorResponse = (statusCode, message) => ({
    statusCode: statusCode || 501,
    headers: {'Content-Type': 'text/plain'},
    body: message || 'Incorrect id',
});

module.exports.user = (event, context, callback) => {
    const id = event.pathParameters.id;

    if (!validator.isAlphanumeric(id)) {
        callback(null, createErrorResponse(400, 'Incorrect id'));
        return;
    }

    mongoose.connect(DB_URI, dbOptions).then(
        (db) => {
            UserModel
                .find({_id: id})
                .then((user) => {
                    callback(null, {statusCode: 200, body: JSON.stringify(user)});
                })
                .catch((err) => {
                    callback(null, createErrorResponse(err.statusCode, err.message));
                })
                .finally(() => {
                    db.connection.close();
                });
        },
        err => {
            console.log(err);
        }
    );
};

module.exports.createUser = (event, context, callback) => {
    let user = {};
    const mongooseId = '_id';

    const data = JSON.parse(event.body);
    user = new UserModel(
        {
            name: data.name,
            email: data.email
        }
    );
    const errs = user.validateSync();
    if (errs) {
        console.log(errs);
        callback(null, createErrorResponse(400, 'Incorrect user data'));
        // db.close();
        return;
    }

    mongoose.connect(DB_URI, dbOptions).then(
        (db) => {
            console.log("CONNECTED!");
            user
                .save()
                .then(() => {
                    callback(null, {statusCode: 200, body: JSON.stringify({id: user[mongooseId]})});
                })
                .catch((err) => {
                    callback(null, createErrorResponse(err.statusCode, err.message));
                })
                .finally(() => {
                    db.connection.close();
                });

        },
        err => {
            console.log(err);
        }
    );
};

module.exports.deleteUser = (event, context, callback) => {
    const id = event.pathParameters.id;

    if (!validator.isAlphanumeric(id)) {
        callback(null, createErrorResponse(400, 'Incorrect id'));
        return;
    }

    mongoose.connect(DB_URI, dbOptions).then(
        (db) => {
            UserModel
                .remove({_id: id})
                .then(() => {
                    callback(null, {statusCode: 200, body: JSON.stringify('Ok')});
                })
                .catch((err) => {
                    callback(null, createErrorResponse(err.statusCode, err.message));
                })
                .finally(() => {
                    db.connection.close();
                });

        },
        err => {
            console.log(err);
        }
    );
};

module.exports.updateUser = (event, context, callback) => {
    const id = event.pathParameters.id;
    let user = {};

    if (!validator.isAlphanumeric(id)) {
        callback(null, createErrorResponse(400, 'Incorrect id'));
        return;
    }

    const data = JSON.parse(event.body);
    user = new UserModel({
        _id: id,
        name: data.name,
        email: data.email
    });

    const errs = user.validateSync();
    if (errs) {
        callback(null, createErrorResponse(400, 'Incorrect parameter'));
        return;
    }
    mongoose.connect(DB_URI, dbOptions).then(
        (db) => {
            UserModel.findByIdAndUpdate(id, user)
                .then(() => {
                    callback(null, {statusCode: 200, body: JSON.stringify('Ok')});
                })
                .catch((err) => {
                    callback(err, createErrorResponse(err.statusCode, err.message));
                })
                .finally(() => {
                    db.connection.close();
                });
        },
        err => {
            console.log(err);
        }
    );
};
