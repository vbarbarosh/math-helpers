var vb_math_helpers;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var angle = __webpack_require__(1);
var degs_from_rads = __webpack_require__(2);
var distance = __webpack_require__(3);
var distance_point_ray = __webpack_require__(4);
var point_closest_on_line = __webpack_require__(5);
var point_closest_on_circle = __webpack_require__(6);
var points_bbox = __webpack_require__(7);
var rads_from_degs = __webpack_require__(8);
module.exports = {
  angle: angle,
  degs_from_rads: degs_from_rads,
  distance: distance,
  distance_point_ray: distance_point_ray,
  point_closest_on_circle: point_closest_on_circle,
  point_closest_on_line: point_closest_on_line,
  points_bbox: points_bbox,
  rads_from_degs: rads_from_degs
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
 * Calculate distance between two points.
 */
function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}
module.exports = distance;

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module) {

/**
 * Convert degrees to radians.
 */
function rads_from_degs(degs) {
  return degs * Math.PI / 180;
}
module.exports = rads_from_degs;

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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