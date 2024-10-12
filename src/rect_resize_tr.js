const point_rotate = require('./point_rotate');
const rads_from_degs = require('./rads_from_degs');

function rect_resize_tr(item, dx, dy)
{
    const p = point_rotate(dx, dy, 0, 0, -rads_from_degs(item.transform.rotate));
    item.width += p.x;
    item.height -= p.y;

    const tl = point_rotate(item.left, item.top + p.y, item.left, item.top, rads_from_degs(item.transform.rotate));
    item.top = tl.y;
    item.left = tl.x;
    return item;
}

module.exports = rect_resize_tr;
