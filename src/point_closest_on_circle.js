/**
 * Find a point on a circle, closest to another point.
 *
 * @link https://stackoverflow.com/a/300894
 */
function point_closest_on_circle(x, y, cx, cy, radius)
{
    const dx = x - cx;
    const dy = y - cy;
    const len = Math.sqrt(dx*dx + dy*dy);
    if (len === 0) {
        return {x, y};
    }
    return {x: cx + dx/len*radius, y: cy + dy/len*radius};
}

module.exports = point_closest_on_circle;
