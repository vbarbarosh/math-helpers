const point_rotate = require('./point_rotate');

function rect_resize_r(rect, dx, dy)
{
    const p = point_rotate(dx, dy, 0, 0, -rect.rads);
    rect.w += p.x;
    return rect;
}

module.exports = rect_resize_r;
