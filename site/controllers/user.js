var User = require('../models/user.js');


// Register a new user.
exports.register = function(req, res) {
    var user = new User({ username: req.body.username, password: req.body.password });
    user.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('user: ' + user.username + " saved.");
        }
    });
};

