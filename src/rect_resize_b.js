const point_rotate = require('./point_rotate');
const rads_from_degs = require('rads_from_degs');

function rect_resize_b(item, dx, dy)
{
    const p = point_rotate(dx, dy, 0, 0, -rads_from_degs(item.transform.rotate));
    item.height += p.y;
    return item;
}

module.exports = rect_resize_b;
