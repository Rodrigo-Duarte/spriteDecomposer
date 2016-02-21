//Load the http module to create an http server.
var http = require('http');
var PNG = require('png-js');
var decomposer = require('./decomposer');
var fs = require('fs');
var zpad = require('zpad');
zpad.amount(5);
var formidable = require('formidable');
var zipFolder = require('zip-folder')

function bla(filename, res) {
	console.log('loading ' + filename);
	var png = PNG.load(filename);
	var folder = filename.substring(filename.lastIndexOf('/')+1);
	png.decode(function(pixels) {
		var width = png.width;
		var alphamap = decomposer.getAlphaMap(pixels, width);
		var vert = decomposer.verticalCut(alphamap);
		var horz = decomposer.horizontalCut(alphamap);
		var rgbam = decomposer.toRGBAMatrix(pixels, width);
		fs.mkdir(folder);
		var i = 0;
		for (var h = 0; h < horz.length; h += 2) {
			for (var v = 0; v < vert.length; v += 2) {
				var a = [horz[h], vert[v]];
				var b = [horz[h+1], vert[v+1]];
				var crop = decomposer.crop(rgbam, a, b);
				decomposer.save(folder + '/f' + zpad(i++) + '.png', crop);
			}
		}
		console.log("done breaking... zipping");

		zipFolder(folder,folder + '.zip', function() {
			console.log("done zipping");	
			var stream = fs.createReadStream(folder + '.zip');
			res.setHeader('Content-disposition', 'attachment; filename=' + folder + '.zip');
			res.writeHead(200);
			stream.pipe(res);

		});
		
	});
}

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload 
    var form = new formidable.IncomingForm();
 		var tnc = [];
    form.parse(req, function(err, fields, files) {
      console.log(files.upload.path);
    	bla(files.upload.path, res);
    });

    return;
  }
 
  // show a file upload form 
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http:127.0.0.1:8000/");