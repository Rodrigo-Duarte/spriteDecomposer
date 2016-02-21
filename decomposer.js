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
		return (typeof list[ind-1] !== 'undefined' && list[ind-1] != el - 1) 
				|| (typeof list[ind+1] !== 'undefined' && el + 1 != list[ind+1]);
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
	},
	crop: function(matrix, a, b) {
		var chain = _.chain(matrix)
		.filter(function(row, ind) {return ind >= a[0] && ind <= b[0]})
		.map(function(row) { return _.filter(row, function(cell, ind) {return ind >= a[1] && ind <= b[1]});});
		return chain.value();
	},
	toRGBAMatrix: function(pixels, width) {
		var w = 4;
		var fun = function(memo, el, ind) {
			var group = memo[Math.floor(ind/w)] || memo[memo.push([])-1];
			group.push(el);
			return memo;
		};
		var rgbaArray = _.reduce(pixels, fun, []);
		w = width; //doidera
		return _.reduce(rgbaArray, fun, []);
	}
};