module.exports = {
	getAlphaMap: function(pixels) {
		var alphaMap = [];
		for (var i = 3; i < pixels.length; i += 4) {
			alphaMap.push(pixels[i]);
		}
		console.log(alphaMap);
		return alphaMap;
	}
};