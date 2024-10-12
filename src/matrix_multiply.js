/**
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L197
 */
function matrix_multiply(...matrices)
{
    let m = matrices[0],
        out = new Array(6),
        a0, a1, a2, a3, a4, a5,
        b0, b1, b2, b3, b4, b5,
        i, end;

    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];

    for (i = 1, end = matrices.length; i < end; ++i) {
        m = matrices[i];
        a0 = out[0];
        a1 = out[1];
        a2 = out[2];
        a3 = out[3];
        a4 = out[4];
        a5 = out[5];
        b0 = m[0];
        b1 = m[1];
        b2 = m[2];
        b3 = m[3];
        b4 = m[4];
        b5 = m[5];
        out[0] = a0 * b0 + a2 * b1;
        out[1] = a1 * b0 + a3 * b1;
        out[2] = a0 * b2 + a2 * b3;
        out[3] = a1 * b2 + a3 * b3;
        out[4] = a0 * b4 + a2 * b5 + a4;
        out[5] = a1 * b4 + a3 * b5 + a5;
    }

    return out;
}

module.exports = matrix_multiply;
