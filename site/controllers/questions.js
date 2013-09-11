// In memory sample data
var questions = [{
    id : 1,
    title : 'How do I create a node app?',
    body : 'blah blah, blah',
    tags : ['node', 'javascript']
}];

// Index listing of questions at /questions
exports.index = function(req, res) {
    res.send(questions);
};

exports.new = function(req, res) {
    res.render('questions/new', {title: 'New Question'});
};

// Add a question.
exports.create = function(req, res) {
    var id = questions.length + 1;
    questions.push({
        id : id,
        title : req.body.title,
        body : req.body.questionBody,
        tags : req.body.tags.split(',')
    });
    console.log('added ' + questions[id - 1]);
    res.render('questions/added', {title: 'Question Added', question : questions[id-1]});
};

// Show a question 
exports.show = function(req, res) {
    var indx = parseInt(req.params.id, 10) - 1;
    if (!questions[indx]) {
        res.send('There is no question with that id');
    } else {
        res.send(questions[indx]);
    }
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

