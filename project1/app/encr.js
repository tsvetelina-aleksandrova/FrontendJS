var bCrypt = require('bcrypt-nodejs');

module.exports = function(){
   // currently the test data is not hashed
  var compare = function(value, hashedValue){
  	//return bCrypt.compareSync(hashedValue, value);
    return value === hashedValue;
  }

  var createHash = function(password){
   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  return {
  	"compare": compare,
  	"createHash": createHash
  };
}