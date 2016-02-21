var assert = require('assert');
var decomposer = require('../decomposer');

describe ('Decomposer', function() {
	describe ('getAlphaMap', function() {
		it('should return alpha map', function() {
			var input = [1,2,3,255,
									 4,5,6,0,
									 7,8,9,0,
									 10,11,12,255];
			assert.deepEqual(decomposer.getAlphaMap(input, 2, 2), [[255,0],[0,255]]);
		});
	});

	describe ('horizontalCut', function() {
		it('should return Y cut points', function() {
			var input = [[0,0,0,0,0],
									 [0,1,1,1,0],
									 [0,0,0,0,0],
									 [1,0,0,0,1],
									 [0,0,0,0,0]];
			assert.deepEqual(decomposer.horizontalCut(input), [0, 2, 4]);
		});
	});

	describe ('horizontalCut', function() {
		it('should ignore multiple spaces', function() {
			var input = [[0,0,0,0,0],
									 [0,0,0,0,0],
									 [0,0,0,0,0],
									 [1,0,0,0,0],
									 [0,0,0,0,0],
									 [0,0,0,0,0]];
			assert.deepEqual(decomposer.horizontalCut(input), [2, 4]);
		});
	});

	describe ('verticalCut', function() {
		it('should return X cut points', function() {
			var input = [[0,0,0,0,0],
									 [0,0,1,1,0],
									 [0,0,0,0,0],
									 [1,0,0,0,0],
									 [0,0,0,0,0]];
			assert.deepEqual(decomposer.verticalCut(input), [1, 4]);
		});
	});

	describe ('crop', function() {
		it('should return submatrix', function() {
			var matrix = [[1,2,3,4,5],
									 [6,7,8,9,0],
									 [9,8,7,6,5],
									 [4,3,2,1,0],
									 [1,2,3,4,5]];
			var a = [1,1];
			var b = [3,2];
			assert.deepEqual(decomposer.crop(matrix,a,b), [[7,8],[8,7],[3,2]]);
		});
	});

	describe('toRGBAMatrix', function() {
		it('should group in RGBA arrays', function() {
			var pixels = [255,0,0,255, 0,0,0,255, 0,0,0,255,
										255,0,0,255, 0,0,0,255, 0,0,0,255];
			var expected = [[[255,0,0,255],[0,0,0,255],[0,0,0,255]],
											[[255,0,0,255],[0,0,0,255],[0,0,0,255]]];
			assert.deepEqual(decomposer.toRGBAMatrix(pixels,3), expected);
		});
	});
});