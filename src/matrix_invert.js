/**
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L153
 */
function matrix_invert(m)
{
    let aa = m[0], ab = m[1], ac = m[2], ad = m[3],
        atx = m[4], aty = m[5],
        det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;
    return [
        ad * det,
        -ab * det,
        -ac * det,
        aa * det,
        (ac * aty - ad * atx) * det,
        (ab * atx - aa * aty) * det
    ];
}

// function matrix_invert_paperjs(matrix)
// {
//     var a = matrix[0],
//         b = matrix[1],
//         c = matrix[2],
//         d = matrix[3],
//         tx = matrix[4],
//         ty = matrix[5],
//         det = a * d - b * c,
//         res = null;
//     if (det && !isNaN(det) && isFinite(tx) && isFinite(ty)) {
//         return [d / det, -b / det,
//             -c / det, a / det,
//             (c * ty - d * tx) / det,
//             (b * tx - a * ty) / det
//         ];
//     }
//     throw new Error('Invalid matrix');
// }

module.exports = matrix_invert;
