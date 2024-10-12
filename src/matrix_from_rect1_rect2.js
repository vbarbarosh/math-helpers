const matrix_from_abcdef = require('./matrix_from_abcdef');
const rect_point = require('./rect_point');

/**
 * Transform the area of the first rectangle into the area of the second rectangle.
 **/
function matrix_from_rect1_rect2(rect1, rect2)
{
    const a = rect_point(rect1, 0, 0);
    const b = rect_point(rect1, 0, 1);
    const c = rect_point(rect1, 1, 1);
    const d = rect_point(rect2, 0, 0);
    const e = rect_point(rect2, 0, 1);
    const f = rect_point(rect2, 1, 1);
    return matrix_from_abcdef(a, b, c, d, e, f);
}

module.exports = matrix_from_rect1_rect2;
