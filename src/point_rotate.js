/**
 * Rotate a point around origin.
 *
 * @link https://github.com/DmitryBaranovskiy/raphael/blob/master/raphael.js#L1901
 * @link https://github.com/toji/gl-matrix/blob/87b1322e7faf4229fcbec69eb9f7e992235bbc1d/src/vec2.js#L458
 */
function point_rotate(x, y, cx, cy, rads)
{
    const dx = x - cx;
    const dy = y - cy;
    const cos = Math.cos(rads);
    const sin = Math.sin(rads);
    return {
        x: dx*cos - dy*sin + cx,
        y: dx*sin + dy*cos + cy
    };
}

module.exports = point_rotate;
