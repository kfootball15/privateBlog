'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var blogSchema = new mongoose.Schema({
    date: {
        type: Date, default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Must be signed in to create a Blog Post']
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    private: {
      type: Boolean,
      default: false
    },
    hasPassword: {
        type: Boolean,
        default: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    thumbnail: {
        //will get stored in firebase also with _id
        type: String,
        // default: '/img/adam.jpg'
    },
    content: {
        type: String,
        default: "No Content"
    },
    title: {
        type: String,
        default: "No Title"
    },
    subtitle: {
        type: String,
        default: "No Sub Title"
    },
    isTutorialPost: {
        type: Boolean,
        default: false
    }
});

// method to remove sensitive information from user objects before sending them out
blogSchema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
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

blogSchema.pre('save', function (next) {
    if (this.private && this.password) {
        if (this.isModified('password')) {
            this.salt = this.constructor.generateSalt();
            this.password = this.constructor.encryptPassword(this.password, this.salt);
        }
    }
    next();
});

blogSchema.pre('save', function(next) {
    console.log("pre password", this.password)
    if (this.password) this.hasPassword = true;
    console.log("hasPassword", this.hasPassword)
    next();
})

blogSchema.statics.generateSalt = generateSalt;
blogSchema.statics.encryptPassword = encryptPassword;

blogSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});



mongoose.model('blogPost', blogSchema);
