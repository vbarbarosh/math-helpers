const angle = require('./angle');
const degs_from_rads = require('./degs_from_rads');
const distance = require('./distance');
const point_rotate = require('./point_rotate');
const point_transform = require('./point_transform');
const rads_from_degs = require('./rads_from_degs');
const rect_point = require('./rect_point');

/**
 * Apply 2d transformation to a rotated rect.
 *
 * @param rect
 * @param matrix
 */
function rect_transform(rect, matrix)
{
    const c = rect_point(rect, 0.5, 0.5);
    const tl = rect_point(rect, 0, 0);
    const tr = rect_point(rect, 1, 0);
    const bl = rect_point(rect, 0, 1);
    // const br = rect_point(rect, 1, 1);
    const tl2 = point_transform(tl.x, tl.y, matrix);
    const tr2 = point_transform(tr.x, tr.y, matrix);
    const bl2 = point_transform(bl.x, bl.y, matrix);
    // const br2 = point_transform(br.x, br.y, matrix);
    rect.x = tl2.x;
    rect.y = tl2.y;
    rect.degs = degs_from_rads(angle(tl2.x, tl2.y, tr2.x, tr2.y));
    rect.w = distance(tl2.x, tl2.y, tr2.x, tr2.y);
    rect.h = distance(tl2.x, tl2.y, bl2.x, bl2.y);
    // fix for parallelogram
    if (1) {
        // outer rect
        const tl = tl2;
        const tr = tr2;
        const bl = bl2;
        const a = angle(tl.x, tl.y, bl.x, bl.y) - angle(tl.x, tl.y, tr.x, tr.y) - rads_from_degs(90);
        rect.x = 0 - Math.min(0, Math.sin(a)*rect.h);
        rect.y = 0;
        rect.w = rect.w + Math.abs(Math.sin(a)*rect.h);
        rect.h = Math.cos(a)*rect.h;
        const p = point_rotate(rect.x, rect.y + rect.h, 0,0, rads_from_degs(rect.degs));
        rect.x = bl.x - p.x;
        rect.y = bl.y - p.y;
    }
    else {
        // inner rect
        const tl = tl2;
        const tr = tr2;
        const bl = bl2;
        const a = angle(tl.x, tl.y, bl.x, bl.y) - angle(tl.x, tl.y, tr.x, tr.y) - rads_from_degs(90);
        rect.x = Math.min(0, Math.sin(a)*rect.h);
        rect.y = 0;
        rect.w = rect.w - Math.abs(Math.sin(a)*rect.h);
        rect.h = Math.cos(a)*rect.h;
        const p = point_rotate(rect.x, rect.y, 0,0, rads_from_degs(rect.degs));
        rect.x = tl.x - p.x;
        rect.y = tl.y - p.y;
    }
}

module.exports = rect_transform;
