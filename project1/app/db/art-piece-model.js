var mongoose = require('mongoose');
 
module.exports = mongoose.model("ArtPieces", {
    name: String,
    artist: String,
    img: String,
    likes: Number,
    isReal: Boolean,
    descr: String
}, "pieces");