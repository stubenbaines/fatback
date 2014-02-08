var Answer = require('../models/answers.js');

// Dummy methods. 
exports.index = function(req, res) {
    return true;
};
exports.delete = function(req, res) {
    return true;
};
exports.destroy = function(req, res) {
    return true;
};
exports.show= function(req, res) {
    return true;
};
exports.edit = function(req, res) {
    return true;
};
exports.update = function(req, res) {
    return true;
};

exports.new = function(req, res) {
    res.render('answers/new', {title: 'New Answer'});
};
// Add an answer 
exports.create = function(req, res) {
    var a  = {
        body : req.body.body,
        _question: req.body.question 
    };
    var answerObj= new Answer(a);

    answerObj.save(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/questions/' + req.body.question);
        }
    });
};

// Show all answers 
exports.list= function(req, res) {
    Answer.find({ 'question' : req.body.question }, function(err, doc) {
        if (err) {
            res.send('There is no answer with this id');
        } else {
            res.render('answer/list', { title: 'Answers Listing', answers: doc});
        }
    });
};
