const point_rotate = require('./point_rotate');

function rect_resize_tr(rect, dx, dy)
{
    const p = point_rotate(dx, dy, 0, 0, -rect.rads);
    rect.w += p.x;
    rect.h -= p.y;

    const tl = point_rotate(rect.x, rect.y + p.y, rect.x, rect.y, rect.rads);
    rect.x = tl.x;
    rect.y = tl.y;
    return rect;
}

module.exports = rect_resize_tr;
