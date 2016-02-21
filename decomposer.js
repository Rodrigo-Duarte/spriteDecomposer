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
	var isZero = function(el) {return el === 0};
	var allZeroRows = _.reduce(matrix, function(memo, el, ind) {
		if (el.every(isZero)) memo.push(ind);
		return memo;
	}, []);
	return _.filter(allZeroRows, function(el,ind,list) {
		return list[ind-1] != el - 1 || el + 1 != list[ind+1];
	});
}

module.exports = {
	getAlphaMap: function(pixels, width) {
		var alphas = _.filter(pixels, function(el, index) {
			return (index + 1) % 4 === 0
		});
		return listToMatrix(alphas, width);
	},
	horizontalCut: function(alphaMatrix) {
		return getCutPoints(alphaMatrix);
	},
	verticalCut: function(alphaMatrix) {
		return getCutPoints(_.zip.apply(_, alphaMatrix));
	}
};