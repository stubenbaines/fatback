'use strict';
var mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://127.0.0.1/QuestionDB');
mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose');
});

