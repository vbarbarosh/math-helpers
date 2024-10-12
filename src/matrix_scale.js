/**
 * @link https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L256
 */
function matrix_scale(sx, sy = sx)
{
    return [sx, 0, 0, sy, 0, 0];
}

module.exports = matrix_scale;
