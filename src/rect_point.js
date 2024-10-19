const point_rotate = require('./point_rotate');

/**
 * Select a point on a rotated rectangle.
 */
function rect_point(rect, mx, my)
{
    return point_rotate(rect.x + rect.w*mx, rect.y + rect.h*my, rect.x, rect.y, rect.rads);
}

module.exports = rect_point;
