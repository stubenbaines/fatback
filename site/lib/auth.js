'use strict';
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user.js');
// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                user.comparePassword(password, function(err, isMatch) {
                    if (err) {
                        return done(err);
                    }
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
        });
    });
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Login handler.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = {
    passport : passport,
    ensureAuthenticated : ensureAuthenticated
};
