const assert = require('assert');
const degs_norm = require('./degs_norm');

describe('degs_norm', function () {
    it('should pass basic tests', function () {
        assert.strictEqual(degs_norm(-360), 0);
        assert.strictEqual(degs_norm(360), 0);
        assert.strictEqual(degs_norm(-361), 359);
        assert.strictEqual(degs_norm(361), 1);
        assert.strictEqual(degs_norm(-1), 359);
    });
});
