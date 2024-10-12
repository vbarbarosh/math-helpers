const rads_from_degs = require('./rads_from_degs');
const point_rotate = require('./point_rotate');

function rect_resize_t(item, dx, dy)
{
    const p = point_rotate(dx, dy, 0, 0, -rads_from_degs(item.transform.rotate));
    item.height -= p.y;

    const tl = point_rotate(item.left, item.top + p.y, item.left, item.top, rads_from_degs(item.transform.rotate));
    item.top = tl.y;
    item.left = tl.x;
    return item;
}

module.exports = rect_resize_t;
