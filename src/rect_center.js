function rect_center(rotated_rect, scene_rect)
{
    const r = rotated_rect;
    const a = rotate(r.left, r.top, r.left, r.top, r.rotate);
    const b = rotate(r.left, r.top + r.height, r.left, r.top, r.rotate);
    const c = rotate(r.left + r.width, r.top, r.left, r.top, r.rotate);
    const d = rotate(r.left + r.width, r.top + r.height, r.left, r.top, r.rotate);
    const topmost = Math.min(a.y, b.y, c.y, d.y);
    const leftmost = Math.min(a.x, b.x, c.x, d.x);
    const rightmost = Math.max(a.x, b.x, c.x, d.x);
    const bottommost = Math.max(a.y, b.y, c.y, d.y);
    const dx = (scene_rect.left + scene_rect.width/2) - (leftmost + rightmost)/2;
    const dy = (scene_rect.top + scene_rect.height/2) - (topmost + bottommost)/2;
    return {dx, dy};
}

module.exports = rect_center;
