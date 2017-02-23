/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./backend/db');
var User = mongoose.model('User');
var Blogposts = mongoose.model('blogPost');


var userSeed = [
    {
        username: 'jchan',
        email: 'jchan@me.com',
        friends: [],
        bio: 'Jacky is an avid blog writer and an unbelievable mixed martial artist. With an amazing, 20 year career in film and television, Jacky Chan has has brought in over 2 billion dollars in box office revenue.',
        firstname: 'Jacky',
        lastname: 'Chan',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'mjordan',
        email: 'mjordan@me.com',
        friends: [],
        bio: 'Michael Jordan is one of the premiere web developers in the United States. After a decorated career as a professional basketball player, Jordan awoke one day with a desire to dominate the world of code, and he has done so spectacularly winning 5 championships.',
        firstname: 'Michael',
        lastname: 'Jordan',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'tmandelkern',
        email: 'tmandelkern@me.com',
        friends: [],
        bio: 'Talya Mandelkern is one of the brightest minds we have seen this century. With a degree in biomedical engineering, Talya has exploded onto the scene as a stand out medical student at the University of Pittsburgh. A lovely smile, and wonderful rack, and an ass that simply does not quit.',
        firstname: 'Talya',
        lastname: 'Mandelkern',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'jarcher',
        email: 'jarcher@me.com',
        friends: [],
        bio: 'John Archer is a spi! And an American Patriot.',
        firstname: 'John',
        lastname: 'Arcjer',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'owinfrey',
        email: 'owinfrey@me.com',
        friends: [],
        bio: 'Oprah Winfrey is a Television woman! And what a rotund lady she has become despite here addition to weight watching.',
        firstname: 'Oprah',
        lastname: 'Winfrey',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'hstern',
        email: 'hstern@me.com',
        friends: [],
        bio: 'Howard Stern is a man amongst children. His penis, though tiny, is known around the world',
        firstname: 'Howard',
        lastname: 'Stern',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'timmy',
        email: 'timmy @me.com',
        friends: [],
        bio: 'Timmy is not a real person...',
        firstname: 'timmy',
        lastname: 'noname',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'admin',
        email: 'admin@me.com',
        friends: [],
        bio: 'This is the admin. He is king around here.',
        firstname: 'admin',
        lastname: 'istrator',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    },
    {
        username: 'me',
        email: 'me@me.com',
        friends: [],
        bio: 'Jeff is really your standard development account that allows for all kinds of tests and experimentation to be done and executed on point until the completion of the application. If life were easier, I would have someone else do this seed file. Such is life.',
        firstname: 'Jeff',
        lastname: 'Fenster',
        password: '123',
        // avatar: 'http://quindrycom.richardquindryph.netdna-cdn.com/wp-content/gallery/people/corporate-headshot-Philadelphia-36-Square.jpg'
    }
];

var blogpostSeed = [
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a post to a blog',
        subtitle: 'And life is good'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is my stuff',
        subtitle: 'And life is bad'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is your stuff',
        subtitle: 'And life is ok'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a bad thing',
        subtitle: 'And life is so so'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a good thing',
        subtitle: 'And life is good'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is my story',
        subtitle: 'And life is beautiful'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is the way',
        subtitle: 'And life is swell'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a Hoot',
        subtitle: 'And life is charmed'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is Time',
        subtitle: 'And life is smelly'
    },
        {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a bad thing',
        subtitle: 'And life is so so'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a good thing',
        subtitle: 'And life is good'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is my story',
        subtitle: 'And life is beautiful'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is the way',
        subtitle: 'And life is swell'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a Hoot',
        subtitle: 'And life is charmed'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is Time',
        subtitle: 'And life is smelly'
    },
        {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a bad thing',
        subtitle: 'And life is so so'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a good thing',
        subtitle: 'And life is good'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is my story',
        subtitle: 'And life is beautiful'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is the way',
        subtitle: 'And life is swell'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is a Hoot',
        subtitle: 'And life is charmed'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        title: 'This is Time',
        subtitle: 'And life is smelly'
    }
];

var publicOrPrivate = ['public', 'private'];

var numberOfFriends = [1,2,3,4,5,6,7,8,9]

// var storySeed = [
//     {
//         title: 'Jeffs Story',
//         friends: [],
//         squares: []
//     }
// ];

// var squareSeed = [
//     {
//         picture: "http://placehold.it/375x375?text=picture+375+x+375",
//         filteredPic: "http://placehold.it/375x375/934636/025462/?text=filteredPic+375+x+375",
//         finalImage: "http://placehold.it/375x375/132288/000000/?text=finalImage+375+x+375"
//     }
// ];

var wipeCollections = function () {
    var models = [User, Blogposts];

    return Promise.map(models, function(model) {
        return model.remove({}).exec();
    });
};

var seedDB = function() {
    var randomizeSelector = function(array) {
      var random = Math.floor(Math.random() * array.length);
      var randomSelection = array[random];
      return randomSelection;
    };

    var usersList;
    return User.create(userSeed)
    .then(function(users){
        usersList = users;
        var friendsArray = [];
        for (var i = 0; i < usersList.length; i++){

          var counter = 10;
          while (counter > 0) {
            var tempfriend = randomizeSelector(usersList)._id;
            if(friendsArray.indexOf(tempfriend) === -1) friendsArray.push(tempfriend)
            counter--;
          }

          console.log("friendsArray", friendsArray)
          User.findByIdAndUpdate(usersList[i]._id,
            { "$set": { "friends": friendsArray } },
            { "new": true, "upsert": true },
            function (err, friends) {
                if (err) console.log("ERROROROROROR");
                console.log("Friendsuser:", friends);
            })
        }
      })
      .then(function(users){
        return Promise.map(blogpostSeed, function(blogPost) {
            var blogType = randomizeSelector(publicOrPrivate)
            var numfriends = randomizeSelector(numberOfFriends)

            //Creation of random blogPosts and users
            var userToAddToFriends1 = randomizeSelector(usersList);
            var userToAddToFriends2 = randomizeSelector(usersList);
            var userToAddToFriends3 = randomizeSelector(usersList);

            //Pushing them into the seedfile object
            blogPost.owner = randomizeSelector(usersList);
            blogPost.blogType = blogType;
            console.log("numbfriends:", numfriends)
            if (blogType === 'public') {
              while (numfriends >= 0) {
                var tempfriend = randomizeSelector(usersList)
                if (blogPost.friends.indexOf(tempfriend._id) === -1) blogPost.friends.push(tempfriend);
                // blogPost.friends.push(userToAddToFriends2._id);
                // blogPost.friends.push(userToAddToFriends3._id);
                numfriends--;
              }
            }

            //creating the story with the adjusted seedfile object, now populated with completed stories
            return Blogposts.create(blogPost);
        });
    })
};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedDB();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
