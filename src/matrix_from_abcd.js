const angle = require('./angle');
const distance = require('./distance');
const matrix_multiply = require('./matrix_multiply');
const matrix_rotate = require('./matrix_rotate');
const matrix_scale = require('./matrix_scale');
const matrix_translate = require('./matrix_translate');

/**
 * @link http://stackoverflow.com/a/42328992/1478566
 */
function matrix_from_abcd(a, b, c, d)
{
    const r = angle(c.x, c.y, d.x, d.y) - angle(a.x, a.y, b.x, b.y);
    return matrix_multiply(
        matrix_translate(c.x, c.y),
        matrix_rotate(r),
        matrix_scale(
            distance(c.x, c.y, d.x, d.y) / distance(a.x, a.y, b.x, b.y)
        ),
        matrix_translate(-a.x, -a.y)
    );
}

module.exports = matrix_from_abcd;
