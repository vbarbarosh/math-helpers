const point_rotate = require('./point_rotate');
const rads_from_degs = require('./rads_from_degs');

/**
 * Select a point on a rotated rectangle.
 */
function rect_point(rect, mx, my)
{
    return point_rotate(rect.x + rect.w*mx, rect.y + rect.h*my, rect.x, rect.y, rads_from_degs(rect.degs));
}

module.exports = rect_point;
