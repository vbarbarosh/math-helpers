/**
 * Calculate an angle (in radians) between two points.
 *
 * @link https://github.com/DmitryBaranovskiy/raphael/blob/master/raphael.js#L483
 */
function angle(x1, y1, x2, y2)
{
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) {
        return 0;
    }
    return Math.atan2(dy, dx);
}

module.exports = angle;
