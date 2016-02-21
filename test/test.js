var assert = require('assert');
var decomposer = require('../decomposer');

describe ('Decomposer', function() {
	describe ('getAlphaMap', function() {
		it('should return alpha map', function() {
			var input = [1,2,3,255,4,5,6,0,7,8,9,0,10,11,12,255];
			assert.deepEqual(decomposer.getAlphaMap(input), [255,0,0,255]);
		});
	});
});