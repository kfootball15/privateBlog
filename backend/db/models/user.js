'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    bio: {
      type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isTemp: {
        type: Boolean,
        default: false
    },
    isTutorialFriend: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};
// method to return just userId (for tutorial friends population)
schema.methods.sanitizeForId = function () {
    return _.omit(this.toJSON(), ['password', 'salt', 'isTutorialFriend', 'isTemp', 'email', 'bio', 'friends', 'username', 'firstname', 'lastname']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.virtual('fullname')
.get(function () {
  return this.firstname + ' ' + this.lastname;
});

mongoose.model('User', schema);
