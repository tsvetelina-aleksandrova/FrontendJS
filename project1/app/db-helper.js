var mongoose = require('mongoose');
var jade = require("jade");
var dbConfig = require("./config/db-config.js");

var ArtPieces = require('./db/art-piece-model.js');
var Users = require('./db/user-model.js');
var Comments = require('./db/comment-model.js');

var ArtPieces = mongoose.model('ArtPieces');
var Users = mongoose.model('Users');
var Comments = mongoose.model('Comments');

mongoose.connection.on("open", function(){
  console.log("connected to mongodb");
});

mongoose.connect(dbConfig.url);

module.exports = function(){
	var logMongoSave = function(err){
	  if(err){
	    console.log('Error while saving mongo document.', err);
	  } else{
	    console.log('Mongo document is saved.');
	  }
  }

  var logMongoRemove = function(err){
    if (err){
      console.log('Error while removing mongo document.', err);
    }
    else{
      console.log('Mongo document is removed.');
    }
}

	var getArtOfUser = function(username, profileUsername, res){
		Users.findOne({username: profileUsername}, function(e, user){
		    var userArtData = {
	        	"user": username,
	            "profileUser": user
	    	};
	    	res.send(userArtData);
		});
	}

	var getGalleryData = function(params, res, username){
	  var findParams = {};
	  var sortParams = [['_id', -1]];
	  if(typeof params.popular !== 'undefined'){
	  	sortParams = [['likes', -1]];
	  }
	  if(username){
	    findParams = {artist: username};
	  }

	  ArtPieces
	  .find(findParams)
	  .sort(sortParams)
	  .limit(params.range.limitNum)
	  .skip(params.range.skipNum)
	  .exec(function(err, pieces) {
	    if(pieces.length === 0){
	      res.send({end: "No more data"});
	      return;
	    }
	    res.send({"galleryData": pieces});
	  });
	}

	var createComment = function(artPieceId, username, commentText, res){
		var newComment = new Comments({
		    "pieceId": artPieceId,
		    "writer": username,
		    "text": commentText
		  });
		newComment.save(logMongoSave);
		res.send("Commented");
	}

	var likeArtPiece = function(id, res){
		ArtPieces.findOne({ _id : id }, function(err, artObj) {
      artObj.likes += 1;
      artObj.save(logMongoSave);
      res.send("Liked");
    });
	}

	var getCommentsForArtPiece = function(id, res){
		Comments.find({pieceId: id}, function(err, commentsObj){
		    res.send({
		      "pieceId": id,
		      "comments": commentsObj
		    });
		});
	}

	var getArtPieceData = function(id, username, res){
		ArtPieces.findOne({ _id : id }, function(err, artObj) {
	    Users.findOne({username: artObj.artist}, function(err, userObj){
	      res.send({
	        "user": username,
	        "userObj": userObj, 
	        "piece": artObj
	      });
    	});
	  });
	}

	var addArt = function(artData, res){
		artData.likes = 0;
		var newArtPiece = new ArtPieces(artData);
		newArtPiece.save(logMongoSave);
		console.log("Added");
	}

	var updateUser = function(username, userData, res){
		Users.findOne({ username : username }, function(err, user) {
     	user.email = userData.email || user.email;
     	user.img = userData.img || user.img;
     	user.password = userData.password || user.password;
      user.save(logMongoSave);
      console.log("Saved");
    });
	}

	var deleteUser = function(username, res){
		Users.remove({username: username}, logMongoRemove);
		ArtPieces.remove({artist: username}, logMongoRemove);
		Comments.remove({writer: username}, logMongoRemove);
		console.log("User + art and comments deleted");
	}

	return {
		getArtOfUser: getArtOfUser,
		getGalleryData: getGalleryData,
		createComment: createComment,
		likeArtPiece: likeArtPiece,
		getCommentsForArtPiece: getCommentsForArtPiece,
		getArtPieceData: getArtPieceData,
		addArt: addArt,
		updateUser: updateUser,
		deleteUser: deleteUser
	};
}