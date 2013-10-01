var mongoose = require('mongoose');

var Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var Question = new Schema({
    title : {type : String, required : true, trim : true},
    body : String,
    tags : Array 

});

module.exports = mongoose.model('Question', Question);
