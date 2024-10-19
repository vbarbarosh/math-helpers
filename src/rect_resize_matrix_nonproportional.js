import matrix_multiply from './matrix_multiply';
import matrix_rotate from './matrix_rotate';
import matrix_scale from './matrix_scale';
import matrix_translate from './matrix_translate';
import point_rotate from './point_rotate';
import rads_from_degs from './rads_from_degs';
import rect_point from './rect_point';

function rect_resize_matrix_nonproportional(rect, a, b, o = rect_point(rect, 0.5, 0.5))
{
    const r = o;
    const oo = point_rotate(o.x, o.y, r.x, r.y, -rads_from_degs(rect.degs));
    const aa = point_rotate(a.x, a.y, r.x, r.y, -rads_from_degs(rect.degs));
    const bb = point_rotate(b.x, b.y, r.x, r.y, -rads_from_degs(rect.degs));
    return matrix_multiply(
        matrix_translate(oo.x, oo.y),
        matrix_rotate(rads_from_degs(rect.degs)),
        matrix_scale(
            (oo.x-bb.x)/(oo.x-aa.x),
            (oo.y-bb.y)/(oo.y-aa.y)
        ),
        matrix_rotate(-rads_from_degs(rect.degs)),
        matrix_translate(-oo.x, -oo.y)
    );
    // rect_transform(rect, m);
}

module.exports = rect_resize_matrix_nonproportional;
