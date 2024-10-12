const assert = require('assert');
const distance = require('./distance');

describe('distance', function () {
    it('should pass basic tests', function () {
        assert.strictEqual(100, distance(0, 0, 100, 0));
    });
});
