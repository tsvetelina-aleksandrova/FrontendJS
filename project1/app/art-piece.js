var mongoose = require('mongoose');
 
module.exports = mongoose.model("ArtPieces", {
    name: String,
    artist: String,
    img: String,
    likes: Number,
    orders: Number,
    isReal: Boolean
}, "pieces");