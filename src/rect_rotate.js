const point_rotate = require('./point_rotate');

/**
 * Rotate a rectangle `[x,y,w,h,rads]` around origin (cx,cy).
 */
function rect_rotate(rect, cx, cy, rads)
{
    const p = point_rotate(rect.x, rect.y, cx, cy, rads);
    rect.x = p.x;
    rect.y = p.y;
    rect.rads += rads;
}

module.exports = rect_rotate;
