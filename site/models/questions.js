var mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var Question = new Schema({
    title : {type : String, required : true, trim : true},
    body : String,
    tags : Array 

});

module.exports = mongoose.model('Question', Question);
