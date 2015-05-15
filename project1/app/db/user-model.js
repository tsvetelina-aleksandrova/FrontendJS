var mongoose = require('mongoose');
 
module.exports = mongoose.model("Users", {
    username: String,
    password: String,
    img: String,
    email: String
}, "users");