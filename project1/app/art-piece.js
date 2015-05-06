var mongoose = require('mongoose');
 
module.exports = mongoose.model("ArtPiece", {
    name: String,
    img: String,
    likes: Integer,
    Orders: Integer,
    isReal: Boolean
}, "piece");