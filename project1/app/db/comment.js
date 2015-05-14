var mongoose = require('mongoose');
 
module.exports = mongoose.model("Comments", {
    pieceId: String,
    writer: String,
    text: String
}, "comments");