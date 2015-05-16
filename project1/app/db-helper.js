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
	var mongoAfterSaveAction = function(e){
	  if(e){
	    console.log('Error while saving mongo document.')
	  } else{
	    console.log('Mongo document is saved.')
	  }
  }

	var getArtOfUser = function(username, res){
		Users.findOne({username: username}, function(e, user){
			ArtPieces.find({artist : username}, function(err, artArr) {
		        var userArtData = {
		        	"data": {
		            	"user": user,
		            	"art": artArr
		          	}
		    	};
		    	res.render("profile", userArtData);
	    	});
		});
	}

	var getGalleryData = function(thumbnailNumRange, res, username){
	  var skipNum = parseInt(thumbnailNumRange[0], 10);
	  var limitNum = parseInt(thumbnailNumRange[1], 10);
	  var queryParams = {};
	  if(username){
	    queryParams = {artist: username};
	  }
	  ArtPieces
	  .find(queryParams)
	  .limit(limitNum)
	  .skip(skipNum)
	  .exec(function(err, pieces) {
	    if(pieces.length === 0){
	      res.send({end: "No more data"});
	      return;
	    }
	    var html = jade.renderFile("views/thumbnails.jade", {"galleryData": pieces});
	    res.send(html);
	  });
	}

	var createComment = function(artPieceId, username, commentText, res){
		var newComment = new Comments({
		    "pieceId": artPieceId,
		    "writer": username,
		    "text": commentText
		  });
		newComment.save(mongoAfterSaveAction);
		res.send("Commented");
	}

	var likeArtPiece = function(id, res){
		ArtPieces.findOne({ _id : id }, function(err, artObj) {
      artObj.likes.$inc();
      artObj.save(mongoAfterSaveAction);
      res.send("Liked");
    });
	}

	var getCommentsForArtPiece = function(id, res){
		Comments.find({pieceId: id}, function(err, commentsObj){
			var html = jade.renderFile("views/comments.jade", {
	      "pieceId": id,
	      "comments": commentsObj
	    });
	    res.send(html);
		});
	}

	var getArtPieceData = function(id, username, res){
		ArtPieces.findOne({ _id : id }, function(err, artObj) {
	    Users.findOne({username: artObj.artist}, function(err, userObj){
	      res.render("piece", {
	        "username": username,
	        "userObj": userObj, 
	        "piece": artObj
	      });
    	});
	  });
	}

	return {
		getArtOfUser: getArtOfUser,
		getGalleryData: getGalleryData,
		createComment: createComment,
		likeArtPiece: likeArtPiece,
		getCommentsForArtPiece: getCommentsForArtPiece,
		getArtPieceData: getArtPieceData
	};
}