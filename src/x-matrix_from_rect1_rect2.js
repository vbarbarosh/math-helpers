import item_point from '../item/item_point';
import matrix_from_abcdef from './matrix_from_abcdef';

/**
 * Matrix to transform area of rect1 to area of rect2 (map area of rect1 to area of rect2)
 */
function XMatrix_from_rect1_rect2(item1_rect, item2_rect)
{
    const a = item_point(item1_rect, 0, 0);
    const b = item_point(item1_rect, 0, 1);
    const c = item_point(item1_rect, 1, 1);
    const d = item_point(item2_rect, 0, 0);
    const e = item_point(item2_rect, 0, 1);
    const f = item_point(item2_rect, 1, 1);
    return matrix_from_abcdef(a, b, c, d, e, f);
}

module.exports = XMatrix_from_rect1_rect2;
