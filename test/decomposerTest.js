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
									 [0,0,0,0,0],
									 [0,0,0,0,0]];
			assert.deepEqual(decomposer.horizontalCut(input), [0, 4]);
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
});