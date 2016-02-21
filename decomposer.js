var _ = require('underscore');

function listToMatrix(list, elementsPerSubArray) {
	var matrix = [],
		i, k;

	for (i = 0, k = -1; i < list.length; i++) {
		if (i % elementsPerSubArray === 0) {
			k++;
			matrix[k] = [];
		}

		matrix[k].push(list[i]);
	}

	return matrix;
}

function getCutPoints(matrix) {
	var cutPoints = [];
		for (var i = 0; i < matrix.length; i++) {
			if (matrix[i].every(function(elem) {
					return elem === 0
				}))
				cutPoints.push(i);
		}
		return cutPoints;
}

module.exports = {
	getAlphaMap: function(pixels, width) {
		var alphaArray = [];
		for (var i = 3; i < pixels.length; i += 4) {
			alphaArray.push(pixels[i]);
		}

		return listToMatrix(alphaArray, width);
	},
	horizontalCut: function(alphaMatrix) {
		return getCutPoints(alphaMatrix);
	},
	verticalCut: function(alphaMatrix) {
		return getCutPoints(_.zip.apply(_,alphaMatrix));
	}
};

0, 32, 64, 96,
1, 33, 65, 97