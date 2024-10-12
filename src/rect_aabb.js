const rads_from_degs = require('./rads_from_degs');

function rect_aabb(rotated_rect)
{
    return rect_bbox(rotated_rect.width, rotated_rect.height, rads_from_degs(rotated_rect.rotate));
}

module.exports = rect_aabb;
