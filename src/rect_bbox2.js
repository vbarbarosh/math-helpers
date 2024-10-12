function rect_bbox2(r)
{
    const rads = rads_from_degs(r.degs);
    const sin = Math.sin(rads);
    const cos = Math.cos(rads);
    const w = r.w*cos + r.h*sin;
    const h = r.w*sin + r.h*cos;
    return [r.x,r.y,w,h];
}
