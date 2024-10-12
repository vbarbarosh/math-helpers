/**
 * Rotation matrix around origin.
 *
 * @link https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L256
 */
function matrix_rotate_origin(rads, cx, cy)
{
    const cos = Math.cos(rads);
    const sin = Math.sin(rads);

    // translate(x, y)
    //     [1, 0, 0, 1, x, y]
    //
    // translate(x, y) * rotate(rads)
    //     [cos, sin, -sin, cos, x, y]
    //
    // translate(x, y) * rotate(rads) * translate(-x, -y)
    //     [cos, sin, -sin, cos, (cos*-x) + (-sin*-y) + x, (sin*-y) + (cos*-y) + y]

    return [cos, sin, -sin, cos, cx - (cos*cx) + (sin*cy), cy - (sin*cx) - (cos*cy)];
}

module.exports = matrix_rotate_origin;
