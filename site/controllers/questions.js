var Question = require('../models/questions.js');

// Index listing of questions at /questions
exports.index = function(req, res) {
    res.send(questions);
};

exports.new = function(req, res) {
    res.render('questions/new', {title: 'New Question'});
};

// Add a question.
exports.create = function(req, res) {
    var q = {
        id : 1,
        title : req.body.title,
        body : req.body.questionBody,
        tags : req.body.tags.split(',')
    };
    var questionObj = new Question(q);

    questionObj.save(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            console.log(data);
            res.render('questions/added', {title: 'Question Added', question : q});
        }
    });
};

// Show a question 
exports.show = function(req, res) {
    var indx = parseInt(req.params.id, 10) - 1;

    Question.findOne({id : indx}, function(err, doc) {
        if (err) {
            res.send('There is no widget with this id');
        } else {
            res.render('questions/show', { title: 'Questions Listing', question: doc});
        }
    });

    // For debugging
    console.log(questions[0].title);
};

// Delete a question.
exports.destroy = function(req, res) {
    var indx = req.params.id - 1;
    delete widgets[indx];

    console.log('deleted ' + req.params.id);
    res.send('deleted ' + req.params.id);
};

// Display edit form.
exports.edit = function(req, res) {
    res.send('displaying edit form');
};

// Update a question
exports.update = function(req, res) {
    var indx = parseInt(req.params.id, 10) - 1;
    questions[indx] = {
        id : indx,
        title : req.body.title,
        body : req.body.questionBody,
        tags : req.body.tags.split(',')
    };
    console.log(questions[indx]);
    res.send('Updated ' + req.params.id);
};

