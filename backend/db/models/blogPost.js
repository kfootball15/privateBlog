'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date: {
        type: Date, default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
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
        default: "Now write a little something..."
    },
    title: {
        type: String,
        default: "Give this post a title"
    }
});





mongoose.model('blogPost', schema);
