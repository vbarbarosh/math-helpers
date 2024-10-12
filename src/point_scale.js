/**
 * Scale a point around origin.
 */
function point_scale(x, y, cx, cy, sx, sy = sx)
{
    // v => Vector.fromPoint(v).sub(center).mul(scale).add(center)
    return {
        x: (x - cx)*sx + cx,
        y: (y - cy)*sy + cy
    };
}

module.exports = point_scale;
