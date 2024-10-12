/**
 * Calculate distance between two points.
 */
function distance(x1, y1, x2, y2)
{
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
}

module.exports = distance;
