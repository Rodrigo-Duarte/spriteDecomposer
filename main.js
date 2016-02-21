//Load the http module to create an http server.
var http = require('http');
var PNG = require('png-js');
var decomposer = require('./decomposer');
var fs = require('fs');
var zpad = require('zpad');
zpad.amount(5);
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function(request, response) {
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.end("Hello World\n");


});
var folder = "temp";
var file = "ss.png";
var png = PNG.load(file);
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
	console.log("done");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http:127.0.0.1:8000/");