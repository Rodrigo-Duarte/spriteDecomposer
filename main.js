//Load the http module to create an http server.
var http = require('http');
var PNG = require('png-js');
var decomposer = require('./decomposer');
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function(request, response) {
	response.writeHead(200, {
		"Content-Type": "text/plain"
	});
	response.end("Hello World\n");


});
PNG.decode('ss.png', function(pixels) {
	console.log(pixels);
	var width = 360;
	var alphamap = decomposer.getAlphaMap(pixels, width);
	var vert = decomposer.verticalCut(alphamap);
	var horz = decomposer.horizontalCut(alphamap);
	var rgbam = decomposer.toRGBAMatrix(pixels, width);
	for (var h = 0; h < horz.length; h += 2) {
		for (var v = 0; v < vert.length; v += 2) {
			var a = [horz[h], vert[v]];
			var b = [horz[h+1], vert[v+1]];
			var crop = decomposer.crop(rgbam, a, b);
			decomposer.save('f' + h + v + '.png', crop);
		}
	}
});
// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http:127.0.0.1:8000/");