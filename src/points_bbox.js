/**
 * Calculates bounding box surrounding all passed-in points.
 */
function points_bbox(points)
{
    if (points.length === 0) {
        return {x: 0, y: 0, w: 0, h: 0};
    }

    const tmp = points[0];
    let x0 = tmp.x;
    let y0 = tmp.y;
    let x1 = tmp.x;
    let y1 = tmp.y;

    for (let i = 1, end = points.length; i < end; ++i) {
        const {x, y} = points[i];
        x0 = Math.min(x0, x);
        x1 = Math.max(x1, x);
        y0 = Math.min(y0, y);
        y1 = Math.max(y1, y);
    }

    const w = x1 - x0;
    const h = y1 - y0;

    if (w === 0 || h === 0) {
        return {x: 0, y: 0, w: 0, h: 0};
    }

    return {x: x0, y: y0, w, h};
}

module.exports = points_bbox;
