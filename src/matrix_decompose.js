// https://github.com/paperjs/paper.js/blob/develop/src/basic/Matrix.js#L687C1-L724C1
function matrix_decompose(matrix)
{
    // http://dev.w3.org/csswg/css3-2d-transforms/#matrix-decomposition
    // http://www.maths-informatique-jeux.com/blog/frederic/?post/2013/12/01/Decomposition-of-2D-transform-matrices
    // https://github.com/wisec/DOMinator/blob/master/layout/style/nsStyleAnimation.cpp#L946
    var a = matrix[0],
        b = matrix[1],
        c = matrix[2],
        d = matrix[3],
        det = a * d - b * c,
        sqrt = Math.sqrt,
        atan2 = Math.atan2,
        degrees = 180 / Math.PI,
        rotate,
        scale,
        skew;
    if (a !== 0 || b !== 0) {
        var r = sqrt(a * a + b * b);
        rotate = Math.acos(a / r) * (b > 0 ? 1 : -1);
        scale = [r, det / r];
        skew = [atan2(a * c + b * d, r * r), 0];
    } else if (c !== 0 || d !== 0) {
        var s = sqrt(c * c + d * d);
        // rotate = Math.PI/2 - (d > 0 ? Math.acos(-c/s) : -Math.acos(c/s));
        rotate = Math.asin(c / s)  * (d > 0 ? 1 : -1);
        scale = [det / s, s];
        skew = [0, atan2(a * c + b * d, s * s)];
    } else { // a = b = c = d = 0
        rotate = 0;
        skew = scale = [0, 0];
    }
    return {
        translation: [matrix[4], matrix[5]],
        rotation: rotate * degrees,
        scaling: scale,
        skewing: [skew[0] * degrees, skew[1] * degrees],
    };
}

module.exports = matrix_decompose;
