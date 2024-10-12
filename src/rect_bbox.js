/**
 * Return `width` and `height` of an axis aligned bounding box of a rotated rectangle.
 *
 * @link https://math.stackexchange.com/a/592779
 * @link https://medium.com/@code-tips/width-and-height-of-rotated-elements-99f639572a57
 * @link https://stackoverflow.com/a/33867165
 */
function rect_bbox(width, height, rads)
{
    const sin = Math.abs(Math.sin(rads));
    const cos = Math.abs(Math.cos(rads));
    return [width*cos + height*sin, width*sin + height*cos];
}

module.exports = rect_bbox;
