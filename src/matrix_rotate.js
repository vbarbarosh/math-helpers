/**
 * Rotation matrix
 */
function matrix_rotate(rads)
{
    const cos = Math.cos(rads);
    const sin = Math.sin(rads);
    return [cos, sin, -sin, cos, 0, 0];
}

module.exports = matrix_rotate;
