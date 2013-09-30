var mongoose = require('mongoose');

var Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var Question = new Schema({
    id : {type : Number, require : true, trim : true, unique : true},
    title : {type : String, required : true, trim : true},
    body : String,
    tags : Array 

});

module.exports = mongoose.model('Question', Question);
