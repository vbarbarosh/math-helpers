/**
 * Apply 2d transformation to a point.
 *
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/vec2.js#L460
 * @link https://github.com/toji/gl-matrix/blob/87b1322e7faf4229fcbec69eb9f7e992235bbc1d/src/vec2.js#L407
 */
function point_transform(x, y, matrix)
{
    const m = matrix;
    return {
        x: m[0]*x + m[2]*y + m[4],
        y: m[1]*x + m[3]*y + m[5],
    };
}

module.exports = point_transform;
