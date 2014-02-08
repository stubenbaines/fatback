var mongoose = require('mongoose');

var Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var Answer = new Schema({
    _question : { type: ObjectId, ref: 'Question' },
    body : String
});

module.exports = mongoose.model('Answer', Answer);
