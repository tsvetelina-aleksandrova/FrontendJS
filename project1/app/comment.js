var mongoose = require('mongoose');
 
module.exports = mongoose.model("Comment", {
    pieceId: String,
    writer: String,
    text: Integer
}, "comment");