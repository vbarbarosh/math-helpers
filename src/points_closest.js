/**
 * Find the first closest point to x,y not farther than radius.
 * Returns -1 if no such point was found.
 *
 * @param points
 * @param x
 * @param y
 * @param radius
 * @returns {number}
 */
function points_closest(points, x, y, radius)
{
    let min = Number.MAX_VALUE;
    let out = -1;
    const rr = radius*radius;
    for (let i = 0, end = points.length; i < end; ++i) {
        const dx = points[i].x - x;
        const dy = points[i].y - y;
        const dd = dx*dx + dy*dy;
        if (min > dd && dd <= rr) {
            min = dd;
            out = i;
        }
    }
    return out;
}

module.exports = points_closest;
