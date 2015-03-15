/**
 * Created by splizmo on 3/2/15.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var utils = require('./utils');
var models  = require('./models');

function findById(id, fn) {

    models.User.find({
        where: {id: id}
    }).then(function(user) {
        fn(null, user);
    });
}

function findByUsername(username, fn) {

    models.User.find({
        where: {username: username}
    }).then(function(user) {
        fn(null, user);
    });
}

//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != utils.getHash(password,user.salt)) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));

module.exports = passport;