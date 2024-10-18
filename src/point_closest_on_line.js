/**
 * Find a point on a line, closest to another point.
 *
 * @link http://paulbourke.net/geometry/pointlineplane/
 * @link https://www.metanetsoftware.com/technique/tutorialA.html#section1
 * @link https://www.youtube.com/watch?v=YbHOzJIHS1k
 */
function point_closest_on_line(x, y, x1, y1, x2, y2)
{
    const dx = x2 - x1;
    const dy = y2 - y1;
    const denom = dx*dx + dy*dy;

    // 1. The only special testing for a software implementation
    //    is to ensure that P1 and P2 are not coincident
    //    (denominator in the equation for u is 0).
    if (denom === 0) {
        return {x: x1, y: y1};
    }

    const u = ((x - x1)*dx + (y - y1)*dy)/denom;
    return {
        x: x1 + u*dx,
        y: y1 + u*dy,
        // 2. If the distance of the point to a line segment is
        //    required then it is only necessary to test that u
        //    lies between 0 and 1.
        seg: u >= 0 && u <= 1,
    };
}

module.exports = point_closest_on_line;
