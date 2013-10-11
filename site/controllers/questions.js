var Question = require('../models/questions.js');

// Index listing of questions at /questions
exports.index = function(req, res) {
    res.send(questions);
};

exports.new = function(req, res) {
    res.render('questions/new', {title: 'New Question'});
};

// Show delete question selection page
exports.delete = function(req, res) {
    console.log("Delete question selection page");

    Question.find({}, function(err, doc) {
        if (err) {
            res.send('There is no question with this id');
        } else {
            res.render('questions/delete', { title: 'Which question to delete?', questions: doc});
        }
    });
};

// Add a question.
exports.create = function(req, res) {
    var q = {
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
exports.list= function(req, res) {
    Question.find({}, function(err, doc) {
        if (err) {
            res.send('There is no question with this id');
        } else {
            res.render('questions/list', { title: 'Questions Listing', questions: doc});
        }
    });

};



// Delete a question.
exports.destroy = function(req, res) {
    Question.remove({ _id: req.params.id }, function (err, remove_target_q) {
        console.log('Removed : ' + remove_target_q);
    });
    Question.find({}, function(err, doc) {
        if (err) {
            res.send('There is no question with this id');
        } else {
            res.render('questions/list', { title: 'Questions Listing', questions: doc});
        }
    });
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

