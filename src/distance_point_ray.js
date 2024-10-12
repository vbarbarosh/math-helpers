/**
 * Calculate a distance between a point (x,y) and a ray (x1,y1,x2,y2)
 *
 * @link https://stackoverflow.com/a/6853926/1478566
 * @link https://iamshishir.com/finding-closest-point-on-the-line/
 */
function distance_point_ray(x, y, x1, y1, x2, y2)
{
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) {//in case of 0 length line
        param = dot / len_sq;
    }

    let xx, yy;
    if (param < 0) {
        xx = x1;
        yy = y1;
    }
        // else if (param > 1) {
        //     xx = x2;
        //     yy = y2;
    // }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx*dx + dy*dy);
}

module.exports = distance_point_ray;
