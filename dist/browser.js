var vb_math_helpers;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var angle = __webpack_require__(1);
var degs_from_rads = __webpack_require__(2);
var degs_norm = __webpack_require__(3);
var distance = __webpack_require__(4);
var distance_point_ray = __webpack_require__(5);
var matrix_decompose = __webpack_require__(6);
var matrix_extract_angle = __webpack_require__(7);
var matrix_from_abcd = __webpack_require__(8);
var matrix_from_abcdef = __webpack_require__(13);
var matrix_from_oab = __webpack_require__(14);
var matrix_from_oab_norot = __webpack_require__(15);
var matrix_from_rect1_rect2 = __webpack_require__(16);
var matrix_invert = __webpack_require__(19);
var matrix_multiply = __webpack_require__(9);
var matrix_rotate = __webpack_require__(10);
var matrix_rotate_origin = __webpack_require__(20);
var matrix_scale = __webpack_require__(11);
var matrix_scale_origin = __webpack_require__(21);
var matrix_translate = __webpack_require__(12);
var point_closest_on_circle = __webpack_require__(22);
var point_closest_on_line = __webpack_require__(23);
var point_rotate = __webpack_require__(18);
var point_scale = __webpack_require__(24);
var point_transform = __webpack_require__(25);
var points_bbox = __webpack_require__(26);
var points_closest = __webpack_require__(27);
var points_ombb = __webpack_require__(28);
var rads_from_degs = __webpack_require__(29);
var rect_aabb = __webpack_require__(30);
var rect_bbox = __webpack_require__(31);
var rect_bbox2 = __webpack_require__(32);
var rect_center = __webpack_require__(33);
var rect_point = __webpack_require__(17);
var rect_resize_b = __webpack_require__(34);
var rect_resize_bl = __webpack_require__(35);
var rect_resize_br = __webpack_require__(36);
var rect_resize_l = __webpack_require__(37);
var rect_resize_matrix = __webpack_require__(38);
var rect_resize_matrix_nonproportional = __webpack_require__(40);
var rect_resize_r = __webpack_require__(41);
var rect_resize_t = __webpack_require__(42);
var rect_resize_tl = __webpack_require__(43);
var rect_resize_tr = __webpack_require__(44);
var rect_rotate = __webpack_require__(45);
var rect_transform = __webpack_require__(39);
module.exports = {
  angle: angle,
  degs_from_rads: degs_from_rads,
  degs_norm: degs_norm,
  distance: distance,
  distance_point_ray: distance_point_ray,
  matrix_decompose: matrix_decompose,
  matrix_extract_angle: matrix_extract_angle,
  matrix_from_abcd: matrix_from_abcd,
  matrix_from_abcdef: matrix_from_abcdef,
  matrix_from_oab: matrix_from_oab,
  matrix_from_oab_norot: matrix_from_oab_norot,
  matrix_from_rect1_rect2: matrix_from_rect1_rect2,
  matrix_invert: matrix_invert,
  matrix_multiply: matrix_multiply,
  matrix_rotate: matrix_rotate,
  matrix_rotate_origin: matrix_rotate_origin,
  matrix_scale: matrix_scale,
  matrix_scale_origin: matrix_scale_origin,
  matrix_translate: matrix_translate,
  point_closest_on_circle: point_closest_on_circle,
  point_closest_on_line: point_closest_on_line,
  point_rotate: point_rotate,
  point_scale: point_scale,
  point_transform: point_transform,
  points_bbox: points_bbox,
  points_closest: points_closest,
  points_ombb: points_ombb,
  rads_from_degs: rads_from_degs,
  rect_aabb: rect_aabb,
  rect_bbox: rect_bbox,
  rect_bbox2: rect_bbox2,
  rect_center: rect_center,
  rect_point: rect_point,
  rect_resize_b: rect_resize_b,
  rect_resize_bl: rect_resize_bl,
  rect_resize_br: rect_resize_br,
  rect_resize_l: rect_resize_l,
  rect_resize_matrix: rect_resize_matrix,
  rect_resize_matrix_nonproportional: rect_resize_matrix_nonproportional,
  rect_resize_r: rect_resize_r,
  rect_resize_t: rect_resize_t,
  rect_resize_tl: rect_resize_tl,
  rect_resize_tr: rect_resize_tr,
  rect_rotate: rect_rotate,
  rect_transform: rect_transform
};

/***/ }),
/* 1 */
/***/ (function(module) {

/**
 * Calculate an angle (in radians) between two points.
 *
 * @link https://github.com/DmitryBaranovskiy/raphael/blob/master/raphael.js#L483
 */
function angle(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return 0;
  }
  return Math.atan2(dy, dx);
}
module.exports = angle;

/***/ }),
/* 2 */
/***/ (function(module) {

/**
 * Convert radians to degrees.
 */
function degs_from_rads(rads) {
  return rads * 180 / Math.PI;
}
module.exports = degs_from_rads;

/***/ }),
/* 3 */
/***/ (function(module) {

/**
 * Convert degrees to value between [0 and 360).
 */
function degs_norm(degs) {
  var out = degs % 360;
  if (out < 0) {
    out += 360;
  }
  if (out === -0) {
    return 0;
  }
  return out;
}
module.exports = degs_norm;

/***/ }),
/* 4 */
/***/ (function(module) {

/**
 * Calculate distance between two points.
 */
function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}
module.exports = distance;

/***/ }),
/* 5 */
/***/ (function(module) {

/**
 * Calculate a distance between a point (x,y) and a ray (x1,y1,x2,y2)
 *
 * @link https://stackoverflow.com/a/6853926/1478566
 * @link https://iamshishir.com/finding-closest-point-on-the-line/
 */
function distance_point_ray(x, y, x1, y1, x2, y2) {
  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;
  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq !== 0) {
    //in case of 0 length line
    param = dot / len_sq;
  }
  var xx, yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  // else if (param > 1) {
  //     xx = x2;
  //     yy = y2;
  // }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }
  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
module.exports = distance_point_ray;

/***/ }),
/* 6 */
/***/ (function(module) {

// https://github.com/paperjs/paper.js/blob/develop/src/basic/Matrix.js#L687C1-L724C1
function matrix_decompose(matrix) {
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
    rotate = Math.asin(c / s) * (d > 0 ? 1 : -1);
    scale = [det / s, s];
    skew = [0, atan2(a * c + b * d, s * s)];
  } else {
    // a = b = c = d = 0
    rotate = 0;
    skew = scale = [0, 0];
  }
  return {
    translation: [matrix[4], matrix[5]],
    rotation: rotate * degrees,
    scaling: scale,
    skewing: [skew[0] * degrees, skew[1] * degrees]
  };
}
module.exports = matrix_decompose;

/***/ }),
/* 7 */
/***/ (function(module) {

/**
 * 🐛️ Does not work for all angles
 *
 * @link https://stackoverflow.com/a/37664392
 */
function matrix_extract_angle(matrix) {
  return Math.asin(matrix[1]);
}
module.exports = matrix_extract_angle;

/***/ }),
/* 8 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var angle = __webpack_require__(1);
var distance = __webpack_require__(4);
var matrix_multiply = __webpack_require__(9);
var matrix_rotate = __webpack_require__(10);
var matrix_scale = __webpack_require__(11);
var matrix_translate = __webpack_require__(12);

/**
 * @link http://stackoverflow.com/a/42328992/1478566
 */
function matrix_from_abcd(a, b, c, d) {
  var r = angle(c.x, c.y, d.x, d.y) - angle(a.x, a.y, b.x, b.y);
  return matrix_multiply(matrix_translate(c.x, c.y), matrix_rotate(r), matrix_scale(distance(c.x, c.y, d.x, d.y) / distance(a.x, a.y, b.x, b.y)), matrix_translate(-a.x, -a.y));
}
module.exports = matrix_from_abcd;

/***/ }),
/* 9 */
/***/ (function(module) {

/**
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L197
 */
function matrix_multiply() {
  for (var _len = arguments.length, matrices = new Array(_len), _key = 0; _key < _len; _key++) {
    matrices[_key] = arguments[_key];
  }
  var m = matrices[0],
    out = new Array(6),
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    b0,
    b1,
    b2,
    b3,
    b4,
    b5,
    i,
    end;
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

/***/ }),
/* 10 */
/***/ (function(module) {

/**
 * Rotation matrix
 */
function matrix_rotate(rads) {
  var cos = Math.cos(rads);
  var sin = Math.sin(rads);
  return [cos, sin, -sin, cos, 0, 0];
}
module.exports = matrix_rotate;

/***/ }),
/* 11 */
/***/ (function(module) {

/**
 * @link https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L256
 */
function matrix_scale(sx) {
  var sy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sx;
  return [sx, 0, 0, sy, 0, 0];
}
module.exports = matrix_scale;

/***/ }),
/* 12 */
/***/ (function(module) {

function matrix_translate(dx, dy) {
  return [1, 0, 0, 1, dx, dy];
}
module.exports = matrix_translate;

/***/ }),
/* 13 */
/***/ (function(module) {

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// https://stackoverflow.com/a/69991541
// 🐛️ Doesn't work with rotation
function broken_matrix_from_abcdef(a, b, c, d, e, f) {
  var m1 = matrix_invert_paperjs(reset(a, b, c));
  var m2 = reset(d, e, f);
  return matrix_multiply(m2, m1);
  function reset(p1, p2, p3) {
    return [p1.x - p3.x, p1.y - p3.y, p2.x - p3.x, p2.y - p3.y, p3.x, p3.y];
  }
}

/**
 * Transform the area of one triangle into the area of another triangle.
 *
 * @link https://github.com/chrvadala/transformation-matrix/blob/main/src/fromTriangles.js
 */
function matrix_from_abcdef(a, b, c, d, e, f) {
  var m = fromTriangles([a, b, c], [d, e, f]);
  return [m.a, m.b, m.c, m.d, m.e, m.f];
}

// https://github.com/chrvadala/transformation-matrix/blob/main/src/fromTriangles.js
function fromTriangles(t1, t2) {
  // point p = first point of the triangle
  var px1 = t1[0].x != null ? t1[0].x : t1[0][0];
  var py1 = t1[0].y != null ? t1[0].y : t1[0][1];
  var px2 = t2[0].x != null ? t2[0].x : t2[0][0];
  var py2 = t2[0].y != null ? t2[0].y : t2[0][1];

  // point q = second point of the triangle
  var qx1 = t1[1].x != null ? t1[1].x : t1[1][0];
  var qy1 = t1[1].y != null ? t1[1].y : t1[1][1];
  var qx2 = t2[1].x != null ? t2[1].x : t2[1][0];
  var qy2 = t2[1].y != null ? t2[1].y : t2[1][1];

  // point r = third point of the triangle
  var rx1 = t1[2].x != null ? t1[2].x : t1[2][0];
  var ry1 = t1[2].y != null ? t1[2].y : t1[2][1];
  var rx2 = t2[2].x != null ? t2[2].x : t2[2][0];
  var ry2 = t2[2].y != null ? t2[2].y : t2[2][1];
  var r1 = {
    a: px1 - rx1,
    b: py1 - ry1,
    c: qx1 - rx1,
    d: qy1 - ry1,
    e: rx1,
    f: ry1
  };
  var r2 = {
    a: px2 - rx2,
    b: py2 - ry2,
    c: qx2 - rx2,
    d: qy2 - ry2,
    e: rx2,
    f: ry2
  };
  var inverseR1 = inverse(r1);
  var affineMatrix = transform([r2, inverseR1]);

  // round the matrix elements to smooth the finite inversion
  return smoothMatrix(affineMatrix);
}
function inverse(matrix) {
  // http://www.wolframalpha.com/input/?i=Inverse+%5B%7B%7Ba,c,e%7D,%7Bb,d,f%7D,%7B0,0,1%7D%7D%5D
  var a = matrix.a,
    b = matrix.b,
    c = matrix.c,
    d = matrix.d,
    e = matrix.e,
    f = matrix.f;
  var denom = a * d - b * c;
  return {
    a: d / denom,
    b: b / -denom,
    c: c / -denom,
    d: a / denom,
    e: (d * e - c * f) / -denom,
    f: (b * e - a * f) / denom
  };
}
function transform() {
  for (var _len = arguments.length, matrices = new Array(_len), _key = 0; _key < _len; _key++) {
    matrices[_key] = arguments[_key];
  }
  matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;
  var multiply = function multiply(m1, m2) {
    return {
      a: m1.a * m2.a + m1.c * m2.b,
      c: m1.a * m2.c + m1.c * m2.d,
      e: m1.a * m2.e + m1.c * m2.f + m1.e,
      b: m1.b * m2.a + m1.d * m2.b,
      d: m1.b * m2.c + m1.d * m2.d,
      f: m1.b * m2.e + m1.d * m2.f + m1.f
    };
  };
  switch (matrices.length) {
    case 0:
      throw new Error('no matrices provided');
    case 1:
      return matrices[0];
    case 2:
      return multiply(matrices[0], matrices[1]);
    default:
      {
        var _matrices = matrices,
          _matrices2 = _toArray(_matrices),
          m1 = _matrices2[0],
          m2 = _matrices2[1],
          rest = _matrices2.slice(2);
        var m = multiply(m1, m2);
        return transform.apply(void 0, [m].concat(_toConsumableArray(rest)));
      }
  }
}
function smoothMatrix(matrix) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000000000;
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

/***/ }),
/* 14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var angle = __webpack_require__(1);
var distance = __webpack_require__(4);
var matrix_multiply = __webpack_require__(9);
var matrix_rotate = __webpack_require__(10);
var matrix_scale = __webpack_require__(11);
var matrix_translate = __webpack_require__(12);

/**
 * @link http://stackoverflow.com/a/42328992/1478566
 */
function matrix_from_oab(o, a, b) {
  var r = angle(o.x, o.y, b.x, b.y) - angle(o.x, o.y, a.x, a.y);
  return matrix_multiply(matrix_translate(b.x, b.y), matrix_rotate(r), matrix_scale(distance(o.x, o.y, b.x, b.y) / distance(o.x, o.y, a.x, a.y)), matrix_translate(-a.x, -a.y));
}
module.exports = matrix_from_oab;

/***/ }),
/* 15 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var angle = __webpack_require__(1);
var distance = __webpack_require__(4);
var matrix_multiply = __webpack_require__(9);
var matrix_rotate = __webpack_require__(10);
var matrix_scale = __webpack_require__(11);
var matrix_translate = __webpack_require__(12);
function matrix_from_oab_norot(o, a, b) {
  var r = angle(o.x, o.y, b.x, b.y) - angle(o.x, o.y, a.x, a.y);
  return matrix_multiply(matrix_translate(b.x, b.y), matrix_rotate(r), matrix_scale(distance(o.x, o.y, b.x, b.y) / distance(o.x, o.y, a.x, a.y)), matrix_translate(-a.x, -a.y), matrix_translate(o.x, o.y), matrix_rotate(-r), matrix_translate(-o.x, -o.y));
}
module.exports = matrix_from_oab_norot;

/***/ }),
/* 16 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var matrix_from_abcdef = __webpack_require__(13);
var rect_point = __webpack_require__(17);

/**
 * Transform the area of the first rectangle into the area of the second rectangle.
 **/
function matrix_from_rect1_rect2(rect1, rect2) {
  var a = rect_point(rect1, 0, 0);
  var b = rect_point(rect1, 0, 1);
  var c = rect_point(rect1, 1, 1);
  var d = rect_point(rect2, 0, 0);
  var e = rect_point(rect2, 0, 1);
  var f = rect_point(rect2, 1, 1);
  return matrix_from_abcdef(a, b, c, d, e, f);
}
module.exports = matrix_from_rect1_rect2;

/***/ }),
/* 17 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);

/**
 * Select a point on a rotated rectangle.
 */
function rect_point(rect, mx, my) {
  return point_rotate(rect.x + rect.w * mx, rect.y + rect.h * my, rect.x, rect.y, rect.rads);
}
module.exports = rect_point;

/***/ }),
/* 18 */
/***/ (function(module) {

/**
 * Rotate a point around origin.
 *
 * @link https://github.com/DmitryBaranovskiy/raphael/blob/master/raphael.js#L1901
 * @link https://github.com/toji/gl-matrix/blob/87b1322e7faf4229fcbec69eb9f7e992235bbc1d/src/vec2.js#L458
 */
function point_rotate(x, y, cx, cy, rads) {
  var dx = x - cx;
  var dy = y - cy;
  var cos = Math.cos(rads);
  var sin = Math.sin(rads);
  return {
    x: dx * cos - dy * sin + cx,
    y: dx * sin + dy * cos + cy
  };
}
module.exports = point_rotate;

/***/ }),
/* 19 */
/***/ (function(module) {

/**
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L153
 */
function matrix_invert(m) {
  var aa = m[0],
    ab = m[1],
    ac = m[2],
    ad = m[3],
    atx = m[4],
    aty = m[5],
    det = aa * ad - ab * ac;
  if (!det) {
    return null;
  }
  det = 1.0 / det;
  return [ad * det, -ab * det, -ac * det, aa * det, (ac * aty - ad * atx) * det, (ab * atx - aa * aty) * det];
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

/***/ }),
/* 20 */
/***/ (function(module) {

/**
 * Rotation matrix around origin.
 *
 * @link https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L256
 */
function matrix_rotate_origin(rads, cx, cy) {
  var cos = Math.cos(rads);
  var sin = Math.sin(rads);

  // translate(x, y)
  //     [1, 0, 0, 1, x, y]
  //
  // translate(x, y) * rotate(rads)
  //     [cos, sin, -sin, cos, x, y]
  //
  // translate(x, y) * rotate(rads) * translate(-x, -y)
  //     [cos, sin, -sin, cos, (cos*-x) + (-sin*-y) + x, (sin*-y) + (cos*-y) + y]

  return [cos, sin, -sin, cos, cx - cos * cx + sin * cy, cy - sin * cx - cos * cy];
}
module.exports = matrix_rotate_origin;

/***/ }),
/* 21 */
/***/ (function(module) {

/**
 * @link https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat2d.js#L256
 * @link http://stackoverflow.com/a/6714140/1478566
 **/
function matrix_scale_origin(scale, cx, cy) {
  // translate(x, y)
  //     [1, 0, 0, 1, x, y]
  //
  // translate(cx, cy) * scale(s)
  //     [s, 0, 0, s, x, y]
  //
  // translate(x, y) * scale(s) * translate(-x, -y)
  //     [s, 0, 0, s, (s * -x) + (0 * -y) + x, (0 * -x) + (s * -y) + cy]

  return [scale, 0, 0, scale, cx - scale * cx, cy - scale * cy];
}
module.exports = matrix_scale_origin;

/***/ }),
/* 22 */
/***/ (function(module) {

/**
 * Find a point on a circle, closest to another point.
 *
 * @link https://stackoverflow.com/a/300894
 */
function point_closest_on_circle(x, y, cx, cy, radius) {
  var dx = x - cx;
  var dy = y - cy;
  var len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) {
    return {
      x: x,
      y: y
    };
  }
  return {
    x: cx + dx / len * radius,
    y: cy + dy / len * radius
  };
}
module.exports = point_closest_on_circle;

/***/ }),
/* 23 */
/***/ (function(module) {

/**
 * Find a point on a line, closest to another point.
 *
 * @link http://paulbourke.net/geometry/pointlineplane/
 * @link https://www.metanetsoftware.com/technique/tutorialA.html#section1
 * @link https://www.youtube.com/watch?v=YbHOzJIHS1k
 */
function point_closest_on_line(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var denom = dx * dx + dy * dy;

  // 1. The only special testing for a software implementation
  //    is to ensure that P1 and P2 are not coincident
  //    (denominator in the equation for u is 0).
  if (denom === 0) {
    return {
      x: x1,
      y: y1
    };
  }
  var u = ((x - x1) * dx + (y - y1) * dy) / denom;
  return {
    x: x1 + u * dx,
    y: y1 + u * dy,
    // 2. If the distance of the point to a line segment is
    //    required then it is only necessary to test that u
    //    lies between 0 and 1.
    seg: u >= 0 && u <= 1
  };
}
module.exports = point_closest_on_line;

/***/ }),
/* 24 */
/***/ (function(module) {

/**
 * Scale a point around origin.
 */
function point_scale(x, y, cx, cy, sx) {
  var sy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : sx;
  // v => Vector.fromPoint(v).sub(center).mul(scale).add(center)
  return {
    x: (x - cx) * sx + cx,
    y: (y - cy) * sy + cy
  };
}
module.exports = point_scale;

/***/ }),
/* 25 */
/***/ (function(module) {

/**
 * Apply 2d transformation to a point.
 *
 * @link https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/vec2.js#L460
 * @link https://github.com/toji/gl-matrix/blob/87b1322e7faf4229fcbec69eb9f7e992235bbc1d/src/vec2.js#L407
 */
function point_transform(x, y, matrix) {
  var m = matrix;
  return {
    x: m[0] * x + m[2] * y + m[4],
    y: m[1] * x + m[3] * y + m[5]
  };
}
module.exports = point_transform;

/***/ }),
/* 26 */
/***/ (function(module) {

/**
 * Calculates bounding box surrounding all passed-in points.
 */
function points_bbox(points) {
  if (points.length === 0) {
    return {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
  }
  var tmp = points[0];
  var x0 = tmp.x;
  var y0 = tmp.y;
  var x1 = tmp.x;
  var y1 = tmp.y;
  for (var i = 1, end = points.length; i < end; ++i) {
    var _points$i = points[i],
      x = _points$i.x,
      y = _points$i.y;
    x0 = Math.min(x0, x);
    x1 = Math.max(x1, x);
    y0 = Math.min(y0, y);
    y1 = Math.max(y1, y);
  }
  var w = x1 - x0;
  var h = y1 - y0;
  if (w === 0 || h === 0) {
    return {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
  }
  return {
    x: x0,
    y: y0,
    w: w,
    h: h
  };
}
module.exports = points_bbox;

/***/ }),
/* 27 */
/***/ (function(module) {

/**
 * Find the first closest point to x,y not farther than radius.
 * Returns -1 if no such point was found.
 *
 * @param points
 * @param x
 * @param y
 * @param radius
 * @returns {number}
 */
function points_closest(points, x, y, radius) {
  var min = Number.MAX_VALUE;
  var out = -1;
  var rr = radius * radius;
  for (var i = 0, end = points.length; i < end; ++i) {
    var dx = points[i].x - x;
    var dy = points[i].y - y;
    var dd = dx * dx + dy * dy;
    if (min > dd && dd <= rr) {
      min = dd;
      out = i;
    }
  }
  return out;
}
module.exports = points_closest;

/***/ }),
/* 28 */
/***/ (function(module) {

/**
 * Calculates minimum area enclosing rectangle (aka oriented minimum bounding box)
 */
function points_ombb(points) {
  return {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  };
}
module.exports = points_ombb;

/***/ }),
/* 29 */
/***/ (function(module) {

/**
 * Convert degrees to radians.
 */
function rads_from_degs(degs) {
  return degs * Math.PI / 180;
}
module.exports = rads_from_degs;

/***/ }),
/* 30 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var rads_from_degs = __webpack_require__(29);
function rect_aabb(rotated_rect) {
  return rect_bbox(rotated_rect.width, rotated_rect.height, rads_from_degs(rotated_rect.rotate));
}
module.exports = rect_aabb;

/***/ }),
/* 31 */
/***/ (function(module) {

/**
 * Return `width` and `height` of an axis aligned bounding box of a rotated rectangle.
 *
 * @link https://math.stackexchange.com/a/592779
 * @link https://medium.com/@code-tips/width-and-height-of-rotated-elements-99f639572a57
 * @link https://stackoverflow.com/a/33867165
 */
function rect_bbox(width, height, rads) {
  var sin = Math.abs(Math.sin(rads));
  var cos = Math.abs(Math.cos(rads));
  return [width * cos + height * sin, width * sin + height * cos];
}
module.exports = rect_bbox;

/***/ }),
/* 32 */
/***/ (function(module) {

function rect_bbox2(rect) {
  var sin = Math.sin(rect.rads);
  var cos = Math.cos(rect.rads);
  var w = rect.w * cos + rect.h * sin;
  var h = rect.w * sin + rect.h * cos;
  return [rect.x, rect.y, w, h];
}
module.exports = rect_bbox2;

/***/ }),
/* 33 */
/***/ (function(module) {

function rect_center(rect, scene_rect) {
  var r = rect;
  var a = rotate(r.left, r.top, r.left, r.top, r.rotate);
  var b = rotate(r.left, r.top + r.height, r.left, r.top, r.rotate);
  var c = rotate(r.left + r.width, r.top, r.left, r.top, r.rotate);
  var d = rotate(r.left + r.width, r.top + r.height, r.left, r.top, r.rotate);
  var topmost = Math.min(a.y, b.y, c.y, d.y);
  var leftmost = Math.min(a.x, b.x, c.x, d.x);
  var rightmost = Math.max(a.x, b.x, c.x, d.x);
  var bottommost = Math.max(a.y, b.y, c.y, d.y);
  var dx = scene_rect.left + scene_rect.width / 2 - (leftmost + rightmost) / 2;
  var dy = scene_rect.top + scene_rect.height / 2 - (topmost + bottommost) / 2;
  return {
    dx: dx,
    dy: dy
  };
}
module.exports = rect_center;

/***/ }),
/* 34 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_b(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads_from_degs);
  rect.h += p.y;
  return rect;
}
module.exports = rect_resize_b;

/***/ }),
/* 35 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_bl(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads);
  rect.w -= p.x;
  rect.h += p.y;
  var tl = point_rotate(rect.x + p.x, rect.y, rect.x, rect.y, rect.rads);
  rect.x = tl.x;
  rect.y = tl.y;
  return rect;
}
module.exports = rect_resize_bl;

/***/ }),
/* 36 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_br(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads);
  rect.w += p.x;
  rect.h += p.y;
  return rect;
}
module.exports = rect_resize_br;

/***/ }),
/* 37 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_l(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads_from_degs);
  rect.w -= p.x;
  var tl = point_rotate(rect.x + p.x, rect.y, rect.x, rect.y, rect.rads);
  rect.x = tl.x;
  rect.y = tl.y;
  return rect;
}
module.exports = rect_resize_l;

/***/ }),
/* 38 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var matrix_from_oab_norot = __webpack_require__(15);
var rect_point = __webpack_require__(17);
var rect_transform = __webpack_require__(39);

/**
 * Resize rotated rectangle proportionally around origin.
 *
 * 1. Take any point on a rectangle [a].
 * 2. And make sure that on a new rectangle this point will correspond to [b].
 * 3. At the same time, ensure that point [o] is the same on both rectangles.
 */
function rect_resize_matrix(rect, a, b) {
  var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : rect_point(rect, 0.5, 0.5);
  // rect_transform(rect, matrix_from_oab_norot(o, a, b));
  return matrix_from_oab_norot(o, a, b);
}
module.exports = rect_resize_matrix;

/***/ }),
/* 39 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var angle = __webpack_require__(1);
var degs_from_rads = __webpack_require__(2);
var distance = __webpack_require__(4);
var point_rotate = __webpack_require__(18);
var point_transform = __webpack_require__(25);
var rads_from_degs = __webpack_require__(29);
var rect_point = __webpack_require__(17);

/**
 * Apply 2d transformation to a rotated rect.
 *
 * @param rect
 * @param matrix
 */
function rect_transform(rect, matrix) {
  var c = rect_point(rect, 0.5, 0.5);
  var tl = rect_point(rect, 0, 0);
  var tr = rect_point(rect, 1, 0);
  var bl = rect_point(rect, 0, 1);
  // const br = rect_point(rect, 1, 1);
  var tl2 = point_transform(tl.x, tl.y, matrix);
  var tr2 = point_transform(tr.x, tr.y, matrix);
  var bl2 = point_transform(bl.x, bl.y, matrix);
  // const br2 = point_transform(br.x, br.y, matrix);
  rect.x = tl2.x;
  rect.y = tl2.y;
  rect.degs = degs_from_rads(angle(tl2.x, tl2.y, tr2.x, tr2.y));
  rect.w = distance(tl2.x, tl2.y, tr2.x, tr2.y);
  rect.h = distance(tl2.x, tl2.y, bl2.x, bl2.y);
  // fix for parallelogram
  if (true) {
    // outer rect
    var _tl = tl2;
    var _tr = tr2;
    var _bl = bl2;
    var a = angle(_tl.x, _tl.y, _bl.x, _bl.y) - angle(_tl.x, _tl.y, _tr.x, _tr.y) - rads_from_degs(90);
    rect.x = 0 - Math.min(0, Math.sin(a) * rect.h);
    rect.y = 0;
    rect.w = rect.w + Math.abs(Math.sin(a) * rect.h);
    rect.h = Math.cos(a) * rect.h;
    var p = point_rotate(rect.x, rect.y + rect.h, 0, 0, rads_from_degs(rect.degs));
    rect.x = _bl.x - p.x;
    rect.y = _bl.y - p.y;
  } else { var _p, _a, _bl2, _tr2, _tl2; }
}
module.exports = rect_transform;

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _matrix_multiply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _matrix_multiply__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_matrix_multiply__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _matrix_rotate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _matrix_rotate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_matrix_rotate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _matrix_scale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _matrix_scale__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_matrix_scale__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _matrix_translate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _matrix_translate__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_matrix_translate__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _point_rotate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _point_rotate__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_point_rotate__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _rads_from_degs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);
/* harmony import */ var _rads_from_degs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_rads_from_degs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _rect_point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _rect_point__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_rect_point__WEBPACK_IMPORTED_MODULE_6__);
/* module decorator */ module = __webpack_require__.hmd(module);







function rect_resize_matrix_nonproportional(rect, a, b) {
  var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _rect_point__WEBPACK_IMPORTED_MODULE_6___default()(rect, 0.5, 0.5);
  var r = o;
  var oo = _point_rotate__WEBPACK_IMPORTED_MODULE_4___default()(o.x, o.y, r.x, r.y, -_rads_from_degs__WEBPACK_IMPORTED_MODULE_5___default()(rect.degs));
  var aa = _point_rotate__WEBPACK_IMPORTED_MODULE_4___default()(a.x, a.y, r.x, r.y, -_rads_from_degs__WEBPACK_IMPORTED_MODULE_5___default()(rect.degs));
  var bb = _point_rotate__WEBPACK_IMPORTED_MODULE_4___default()(b.x, b.y, r.x, r.y, -_rads_from_degs__WEBPACK_IMPORTED_MODULE_5___default()(rect.degs));
  return _matrix_multiply__WEBPACK_IMPORTED_MODULE_0___default()(_matrix_translate__WEBPACK_IMPORTED_MODULE_3___default()(oo.x, oo.y), _matrix_rotate__WEBPACK_IMPORTED_MODULE_1___default()(_rads_from_degs__WEBPACK_IMPORTED_MODULE_5___default()(rect.degs)), _matrix_scale__WEBPACK_IMPORTED_MODULE_2___default()((oo.x - bb.x) / (oo.x - aa.x), (oo.y - bb.y) / (oo.y - aa.y)), _matrix_rotate__WEBPACK_IMPORTED_MODULE_1___default()(-_rads_from_degs__WEBPACK_IMPORTED_MODULE_5___default()(rect.degs)), _matrix_translate__WEBPACK_IMPORTED_MODULE_3___default()(-oo.x, -oo.y));
  // rect_transform(rect, m);
}
module.exports = rect_resize_matrix_nonproportional;

/***/ }),
/* 41 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_r(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads);
  rect.w += p.x;
  return rect;
}
module.exports = rect_resize_r;

/***/ }),
/* 42 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_t(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads_from_degs);
  rect.h -= p.y;
  var tl = point_rotate(rect.x, rect.y + p.y, rect.x, rect.y, -rect.rads);
  rect.x = tl.x;
  rect.y = tl.y;
  return rect;
}
module.exports = rect_resize_t;

/***/ }),
/* 43 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_tl(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads);
  rect.x += dx;
  rect.y += dy;
  rect.w -= p.x;
  rect.h -= p.y;
  return rect;
}
module.exports = rect_resize_tl;

/***/ }),
/* 44 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);
function rect_resize_tr(rect, dx, dy) {
  var p = point_rotate(dx, dy, 0, 0, -rect.rads);
  rect.w += p.x;
  rect.h -= p.y;
  var tl = point_rotate(rect.x, rect.y + p.y, rect.x, rect.y, rect.rads);
  rect.x = tl.x;
  rect.y = tl.y;
  return rect;
}
module.exports = rect_resize_tr;

/***/ }),
/* 45 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var point_rotate = __webpack_require__(18);

/**
 * Rotate a rectangle `[x,y,w,h,rads]` around origin (cx,cy).
 */
function rect_rotate(rect, cx, cy, rads) {
  var p = point_rotate(rect.x, rect.y, cx, cy, rads);
  rect.x = p.x;
  rect.y = p.y;
  rect.rads += rads;
}
module.exports = rect_rotate;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.hmd = function(module) {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: function() {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	vb_math_helpers = __webpack_exports__;
/******/ 	
/******/ })()
;