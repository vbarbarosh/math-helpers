const matrix_from_oab_norot = require('./matrix_from_oab_norot');
const rect_point = require('./rect_point');
const rect_transform = require('./rect_transform');

/**
 * Resize rotated rectangle proportionally around origin.
 *
 * 1. Take any point on a rectangle [a].
 * 2. And make sure that on a new rectangle this point will correspond to [b].
 * 3. At the same time, ensure that point [o] is the same on both rectangles.
 */
function rect_resize_matrix(rect, a, b, o = rect_point(rect, 0.5, 0.5))
{
    // rect_transform(rect, matrix_from_oab_norot(o, a, b));
    return matrix_from_oab_norot(o, a, b);
}

module.exports = rect_resize_matrix;
