function rect_bbox2(rect)
{
    const sin = Math.sin(rect.rads);
    const cos = Math.cos(rect.rads);
    const w = rect.w*cos + rect.h*sin;
    const h = rect.w*sin + rect.h*cos;
    return [rect.x, rect.y, w, h];
}

module.exports = rect_bbox2;
