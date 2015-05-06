var mongoose = require('mongoose');
 
module.exports = mongoose.model("Comment", {
    piece: String,
    writer: String,
    likes: Integer,
    text: Integer
}, "comment");