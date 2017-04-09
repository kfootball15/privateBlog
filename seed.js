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
        email: 'test@test.com',
        username: 'Ironman',
        friends: [],
        firstname: 'Tony',
        lastname: 'Stark',
        bio: 'You know who I am.',
        password: '123',
        isTutorialFriend: true
    },
    {
        email: 'test1@test.com',
        username: 'Hulksmash',
        friends: [],
        firstname: 'Bruce',
        lastname: 'Banner',
        bio: 'Dr. Bruce Banner is a genius in nuclear physics, possessing a mind so brilliant that it cannot be measured on any known intelligence test. When Banner is the Hulk, Banner\'s consciousness is buried within the Hulk\'s, and can influence the Hulks behavior only to a very limited extent.',
        password: '123',
        isTutorialFriend: true
    },
    {
        email: 'test2@test.com',
        username: 'Batman',
        friends: [],
        firstname: 'Bruce',
        lastname: 'Wayne',
        bio: 'Batman is the superhero protector of Gotham City, a man dressed like a bat who fights against evil and strikes terror into the hearts of criminals everywhere. In his secret identity he is Bruce Wayne, billionaire industrialist and notorious playboy. Although he has no superhuman powers, he is one of the world\'s smartest men and greatest fighters. His physical prowess and technical ingenuity make him an incredibly dangerous opponent. He is also a founding member of the Justice League and the Outsiders.',
        password: '123',
        isTutorialFriend: true
    },
    {
        email: 'test3@test.com',
        username: 'Hammerman',
        friends: [],
        firstname: 'Thor',
        lastname: 'Hammer',
        bio: 'Thor is a fictional superhero appearing in American comic books published by Marvel Comics. The character, based on the Norse mythological deity of the same name, is the Asgardian god of thunder and possesses the enchanted hammer Mjolnir, which grants him the ability of flight and weather manipulation amongst his other superhuman attributes.',
        password: '123',
        isTutorialFriend: true
    },
    {
        email: 'test4@test.com',
        username: 'Superman',
        friends: [],
        firstname: 'Clark',
        lastname: 'Kent',
        bio: 'Superman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by writer Jerry Siegel and artist Joe Shuster, high school students living in Cleveland, Ohio, in 1933. They sold Superman to Detective Comics, the future DC Comics, in 1938.',
        password: '123',
        isTutorialFriend: true
    },
    {
        email: 'test5@test.com',
        username: 'CatWoman',
        friends: [],
        firstname: 'Selina',
        lastname: 'Kyle',
        bio: "Catwoman (Selina Kyle) is a fictional character appearing in American comic books published by DC Comics, commonly in association with the superhero Batman. The character was created by Bob Kane and Bill Finger, and she made her debut in Batman #1 (Spring 1940), in which she is known as 'the Cat'.",
        password: '123',
        isTutorialFriend: true
    },
    {
        email: 'test6@test.com',
        username: 'CaptainAmerica',
        friends: [],
        firstname: 'Steve',
        lastname: 'Rogers',
        bio: 'In World War II patriotic solider Steve Rogers recipient of the "Super Soldier Serum" became the living symbol of freedom, Captain America. Left for dead while frozen in ice, the star-spangled hero with an indestructible shield awoke years later to continue his never-ending battle for liberty.',
        password: '123',
        isTutorialFriend: true
    },
    {
        email: 'test7@test.com',
        username: 'Deadpool',
        friends: [],
        firstname: 'Wade',
        lastname: 'Wilson',
        bio: "Wade Wilson's early life is mostly unknown. His mother died of cancer while he was young and his father (who was in the military) was physically abusive. Wade was a deliquent in his teenage years, possibly to spite his father. However one night while drinking with his friends his father attempt to take him out of the club one of his friends stole Wade\'s Fathers handgun and killed him.",
        password: '123',
        isTutorialFriend: true
    },
    
];

var blogpostSeed = [
    {
        date: new Date(),
        friends: [],
        hasPassword: false,
        title: "This is a 'Public' blog post",
        subtitle: 'The contents of this post can be seen by anyone and everyone!',
        content: "To edit this post and its contents, simply click on the text you would like to edit!",
        isTutorialPost: true,
        private: false
    },    
    {
        date: new Date(),
        friends: [],
        password: '12345',
        hasPassword: true,
        title: "This is a 'Private' blog post",
        subtitle: 'The contents of this post are password protected! (Hint: 12345)',
        content: "Above, you'll see all of the other users you've invited to come look at you're post. \n Each added user received an email with an invitation to read. \n To add a new user, click the green '+' button and select a user account or, if you have a friend in mind that does not yet have an account, simply type in an email address. ",
        isTutorialPost: true,
        private: false
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is my stuff',
        subtitle: 'And life is bad'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is your stuff',
        subtitle: 'And life is ok'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a bad thing',
        subtitle: 'And life is so so'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a good thing',
        subtitle: 'And life is good'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is my story',
        subtitle: 'And life is beautiful'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is the way',
        subtitle: 'And life is swell'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a Hoot',
        subtitle: 'And life is charmed'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is Time',
        subtitle: 'And life is smelly'
    },
        {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a bad thing',
        subtitle: 'And life is so so'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a good thing',
        subtitle: 'And life is good'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is my story',
        subtitle: 'And life is beautiful'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is the way',
        subtitle: 'And life is swell'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a Hoot',
        subtitle: 'And life is charmed'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is Time',
        subtitle: 'And life is smelly'
    },
        {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a bad thing',
        subtitle: 'And life is so so'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a good thing',
        subtitle: 'And life is good'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is my story',
        subtitle: 'And life is beautiful'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is the way',
        subtitle: 'And life is swell'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is a Hoot',
        subtitle: 'And life is charmed'
    },
    {
        date: new Date(),
        friends: [],
        content: "Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.Life is great, which is why I have decided to right this blog post. It may repeat itself, but it is to symbolize the wonderful unity of life.",
        password: '123',
        title: 'This is Time',
        subtitle: 'And life is smelly'
    }
];

var numberOfFriends = [4,5,6,7,8,9]

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

          var counter = 8;
          while (counter > 0) {
            var tempfriend = randomizeSelector(usersList)._id;
            if(friendsArray.indexOf(tempfriend) === -1) friendsArray.push(tempfriend)
            counter--;
          }

          console.log("friendsArray", friendsArray)
          return User.findByIdAndUpdate(usersList[i]._id,
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
            var numfriends = randomizeSelector(numberOfFriends)

            //Pushing them into the seedfile object
            blogPost.owner = randomizeSelector(usersList);
            console.log("numbfriends:", numfriends)
            if (blogPost.private === true) {
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
