/**
 * Rotate a rectangle `[x,y,width,height,rads]` around origin.
 */
function rect_rotate(r, cx, cy, rads)
{
    const p = point_rotate(r.x, r.y, cx, cy, rads);
    r.x = p.x;
    r.y = p.y;
    r.degs += degs_from_rads(rads);
}

module.exports = rect_rotate;
