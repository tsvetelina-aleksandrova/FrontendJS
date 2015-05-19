var fs = require("fs");
var path = require("path");

 module.exports = function(){

 	var saveImage = function(imgName, imgPath, res){
 		fs.readFile(imgPath, function (err, data) {
		    var newPath = path.resolve(__dirname + 
		    	"/../public/img/" + imgName);
		    console.log(newPath);
		    fs.writeFile(newPath, data, function (err) {
		    	if(err){
		      		res.json({error: "Image could not be saved"});
		    	} else {
		    		res.json({msg: "Image saved successfully"});
		    	}
		    });
 		});
 	}

 	return {
 		saveImage: saveImage
 	};
 }