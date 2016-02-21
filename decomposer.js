var _ = require('underscore');
var fs = require('fs');
var PNG = require('node-png').PNG;

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
	var isZero = function(el) {
		return el === 0
	};
	var allZeroRows = _.reduce(matrix, function(memo, el, ind) {
		if (el.every(isZero)) memo.push(ind);
		return memo;
	}, []);
	return _.filter(allZeroRows, function(el, ind, list) {
		return (typeof list[ind - 1] !== 'undefined' && list[ind - 1] != el - 1) || (typeof list[ind + 1] !== 'undefined' && el + 1 != list[ind + 1]);
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
			.filter(function(row, ind) {
				return ind >= a[0] && ind <= b[0]
			})
			.map(function(row) {
				return _.filter(row, function(cell, ind) {
					return ind >= a[1] && ind <= b[1]
				});
			});
		return chain.value();
	},
	toRGBAMatrix: function(pixels, width) {
		var w = 4;
		var fun = function(memo, el, ind) {
			var group = memo[Math.floor(ind / w)] || memo[memo.push([]) - 1];
			group.push(el);
			return memo;
		};
		var rgbaArray = _.reduce(pixels, fun, []);
		w = width; //doidera
		return _.reduce(rgbaArray, fun, []);
	},
	save: function(filename, matrix) {
		var png = new PNG({
			filterType: -1,
			width: matrix[0].length,
			height: matrix.length
		});

		_.forEach(matrix, function(row, rowInd) {
			_.forEach(row, function(el, ind) {
				var offset = ((4 * row.length) * rowInd) + (4 * ind);
				png.data[offset + 0] = el[0];
				png.data[offset + 1] = el[1];
				png.data[offset + 2] = el[2];
				png.data[offset + 3] = el[3];
			})
		});
		png.pack().pipe(fs.createWriteStream(filename));
	}
};