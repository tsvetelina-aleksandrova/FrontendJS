var fs = require("fs");
var path = require("path");

 module.exports = function(){

 	var saveImage = function(imgName, imgPath, res){
 		var flashData;
 		fs.readFile(imgPath, function (err, data) {
		    var newPath = path.resolve(__dirname + 
		    	"/../public/img/" + imgName);
		    console.log("Image saved to: " + newPath);
		    fs.writeFile(newPath, data, function (err) {
		    	if(err){
		      		flashData = {msg: "Image could not be saved"};
		    	} else {
		    		flashData = {err: "Image saved successfully"};
		    	}
		    });
 		});
		return flashData;
 	}

 	return {
 		saveImage: saveImage
 	};
 }