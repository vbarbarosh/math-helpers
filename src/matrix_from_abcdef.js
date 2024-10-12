// https://stackoverflow.com/a/69991541
// 🐛️ Doesn't work with rotation
function broken_matrix_from_abcdef(a, b, c, d, e, f)
{
    const m1 = matrix_invert_paperjs(reset(a, b, c));
    const m2 = reset(d, e, f);
    return matrix_multiply(m2, m1);
    function reset(p1, p2, p3) {
        return [
            p1.x - p3.x, p1.y - p3.y,
            p2.x - p3.x, p2.y - p3.y,
            p3.x, p3.y
        ];
    }
}

/**
 * Transform the area of one triangle into the area of another triangle.
 *
 * @link https://github.com/chrvadala/transformation-matrix/blob/main/src/fromTriangles.js
 */
function matrix_from_abcdef(a, b, c, d, e, f)
{
    const m = fromTriangles([a, b, c], [d, e, f]);
    return [m.a, m.b, m.c, m.d, m.e, m.f];
}

// https://github.com/chrvadala/transformation-matrix/blob/main/src/fromTriangles.js
function fromTriangles(t1, t2)
{
    // point p = first point of the triangle
    const px1 = t1[0].x != null ? t1[0].x : t1[0][0];
    const py1 = t1[0].y != null ? t1[0].y : t1[0][1];
    const px2 = t2[0].x != null ? t2[0].x : t2[0][0];
    const py2 = t2[0].y != null ? t2[0].y : t2[0][1];

    // point q = second point of the triangle
    const qx1 = t1[1].x != null ? t1[1].x : t1[1][0];
    const qy1 = t1[1].y != null ? t1[1].y : t1[1][1];
    const qx2 = t2[1].x != null ? t2[1].x : t2[1][0];
    const qy2 = t2[1].y != null ? t2[1].y : t2[1][1];

    // point r = third point of the triangle
    const rx1 = t1[2].x != null ? t1[2].x : t1[2][0];
    const ry1 = t1[2].y != null ? t1[2].y : t1[2][1];
    const rx2 = t2[2].x != null ? t2[2].x : t2[2][0];
    const ry2 = t2[2].y != null ? t2[2].y : t2[2][1];

    const r1 = {
        a: px1 - rx1,
        b: py1 - ry1,
        c: qx1 - rx1,
        d: qy1 - ry1,
        e: rx1,
        f: ry1
    };
    const r2 = {
        a: px2 - rx2,
        b: py2 - ry2,
        c: qx2 - rx2,
        d: qy2 - ry2,
        e: rx2,
        f: ry2
    };

    const inverseR1 = inverse(r1);
    const affineMatrix = transform([r2, inverseR1]);

    // round the matrix elements to smooth the finite inversion
    return smoothMatrix(affineMatrix);
}

function inverse(matrix)
{
    // http://www.wolframalpha.com/input/?i=Inverse+%5B%7B%7Ba,c,e%7D,%7Bb,d,f%7D,%7B0,0,1%7D%7D%5D
    const {a, b, c, d, e, f} = matrix;
    const denom = a * d - b * c;
    return {
        a: d / denom,
        b: b / -denom,
        c: c / -denom,
        d: a / denom,
        e: (d * e - c * f) / -denom,
        f: (b * e - a * f) / denom
    };
}

function transform(...matrices)
{
    matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;

    const multiply = (m1, m2) => {
        return {
            a: m1.a * m2.a + m1.c * m2.b,
            c: m1.a * m2.c + m1.c * m2.d,
            e: m1.a * m2.e + m1.c * m2.f + m1.e,
            b: m1.b * m2.a + m1.d * m2.b,
            d: m1.b * m2.c + m1.d * m2.d,
            f: m1.b * m2.e + m1.d * m2.f + m1.f
        };
    }

    switch (matrices.length) {
    case 0:
        throw new Error('no matrices provided');
    case 1:
        return matrices[0];
    case 2:
        return multiply(matrices[0], matrices[1]);
    default: {
        const [m1, m2, ...rest] = matrices;
        const m = multiply(m1, m2);
        return transform(m, ...rest);
    }
    }
}

function smoothMatrix(matrix, precision = 10000000000)
{
    return {
        a: Math.round(matrix.a * precision) / precision,
        b: Math.round(matrix.b * precision) / precision,
        c: Math.round(matrix.c * precision) / precision,
        d: Math.round(matrix.d * precision) / precision,
        e: Math.round(matrix.e * precision) / precision,
        f: Math.round(matrix.f * precision) / precision
    };
}

module.exports = matrix_from_abcdef;
