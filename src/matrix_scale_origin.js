/**
 * @link https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L256
 * @link http://stackoverflow.com/a/6714140/1478566
 **/
function matrix_scale_origin(scale, cx, cy)
{
    // translate(x, y)
    //     [1, 0, 0, 1, x, y]
    //
    // translate(cx, cy) * scale(s)
    //     [s, 0, 0, s, x, y]
    //
    // translate(x, y) * scale(s) * translate(-x, -y)
    //     [s, 0, 0, s, (s * -x) + (0 * -y) + x, (0 * -x) + (s * -y) + cy]

    return [scale, 0, 0, scale, cx - (scale * cx), cy - (scale * cy)];
}

module.exports = matrix_scale_origin;
