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
    blogType: {
      type: String,
      default: 'private'
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
    }
});





mongoose.model('blogPost', schema);
