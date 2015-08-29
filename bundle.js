/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _ramdaSrcCurry = __webpack_require__(1);
	
	var _ramdaSrcCurry2 = _interopRequireDefault(_ramdaSrcCurry);
	
	var _ramdaSrcPipe = __webpack_require__(7);
	
	var _ramdaSrcPipe2 = _interopRequireDefault(_ramdaSrcPipe);
	
	var _ramdaSrcMap = __webpack_require__(20);
	
	var _ramdaSrcMap2 = _interopRequireDefault(_ramdaSrcMap);
	
	var _ramdaSrcLift = __webpack_require__(26);
	
	var _ramdaSrcLift2 = _interopRequireDefault(_ramdaSrcLift);
	
	var _ramdaSrcTap = __webpack_require__(31);
	
	var _ramdaSrcTap2 = _interopRequireDefault(_ramdaSrcTap);
	
	var _ramdaSrcProp = __webpack_require__(32);
	
	var _ramdaSrcProp2 = _interopRequireDefault(_ramdaSrcProp);
	
	var _ramdaSrcCompose = __webpack_require__(33);
	
	var _ramdaSrcCompose2 = _interopRequireDefault(_ramdaSrcCompose);
	
	var _ramdaSrcFlip = __webpack_require__(35);
	
	var _ramdaSrcFlip2 = _interopRequireDefault(_ramdaSrcFlip);
	
	var _baconjs = __webpack_require__(36);
	
	var _baconjs2 = _interopRequireDefault(_baconjs);
	
	var _dataFuture = __webpack_require__(40);
	
	var _dataFuture2 = _interopRequireDefault(_dataFuture);
	
	var _io = __webpack_require__(43);
	
	var _colors = __webpack_require__(44);
	
	(0, _io.extendFn)();
	
	// HELPERS
	
	var listen = (0, _ramdaSrcCurry2['default'])(function (event, target) {
	    return _baconjs2['default'].fromEventTarget(target, event);
	});
	
	var log = function log(x) {
	    console.log(x);
	    return x;
	};
	
	var fork = (0, _ramdaSrcCurry2['default'])(function (f, future) {
	    return future.fork(log, f);
	});
	
	var chain = (0, _ramdaSrcCurry2['default'])(function (f, functor) {
	    return functor.chain(f);
	});
	
	var setHtml = (0, _ramdaSrcCurry2['default'])(function (el, x) {
	    el.innerHtml = x;
	    return el;
	});
	
	var setBackgroundColor = (0, _ramdaSrcCurry2['default'])(function (el, color) {
	    el.style.backgroundColor = color;
	    return el;
	});
	
	var setColor = (0, _ramdaSrcCurry2['default'])(function (el, color) {
	    el.style.color = color;
	    return el;
	});
	
	// PURE
	
	var eventTarget = (0, _ramdaSrcProp2['default'])('target');
	
	var clickStream = (0, _ramdaSrcCompose2['default'])((0, _ramdaSrcMap2['default'])(eventTarget), listen('click'));
	
	var setBgColorAndContrastColor = (0, _ramdaSrcCurry2['default'])(function (el, color) {
	    var setColorEl = setColor(el).toIO();
	    var setBackgroundColorEl = (0, _ramdaSrcTap2['default'])(setBackgroundColor(el)).toIO();
	
	    return (0, _ramdaSrcCompose2['default'])(chain(setColorEl), (0, _ramdaSrcMap2['default'])(_colors.contrastColor), setBackgroundColorEl)(color);
	});
	
	var setRandomBgColorAndContrastColor = function setRandomBgColorAndContrastColor(el) {
	    return setBgColorAndContrastColor(el, (0, _colors.getRandomColor)());
	};
	
	// UNPURE
	
	var el = document.getElementById('container');
	
	var randCol = (0, _ramdaSrcCompose2['default'])(_io.runIO, setRandomBgColorAndContrastColor);
	
	clickStream(el).onValue(randCol);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(2);
	var curryN = __webpack_require__(3);
	
	
	/**
	 * Returns a curried equivalent of the provided function. The curried
	 * function has two unusual capabilities. First, its arguments needn't
	 * be provided one at a time. If `f` is a ternary function and `g` is
	 * `R.curry(f)`, the following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`,
	 * the following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig (* -> a) -> (* -> a)
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curryN
	 * @example
	 *
	 *      var addFourNumbers = function(a, b, c, d) {
	 *        return a + b + c + d;
	 *      };
	 *
	 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry1(function curry(fn) {
	  return curryN(fn.length, fn);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0) {
	      return f1;
	    } else if (a != null && a['@@functional/placeholder'] === true) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(4);
	var _curry1 = __webpack_require__(2);
	var _curry2 = __webpack_require__(5);
	var _curryN = __webpack_require__(6);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the
	 * specified arity. The curried function has two unusual capabilities.
	 * First, its arguments needn't be provided one at a time. If `g` is
	 * `R.curryN(3, f)`, the following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`,
	 * the following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var addFourNumbers = function() {
	 *        return R.sum([].slice.call(arguments, 0, 4));
	 *      };
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  // jshint unused:vars
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(2);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f2;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 1) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
	                          b != null && b['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function(a) { return fn(a, b); });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else {
	      return fn(a, b);
	    }
	  };
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(4);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @return {array} An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (received[combinedIdx] == null ||
	           received[combinedIdx]['@@functional/placeholder'] !== true ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (result == null || result['@@functional/placeholder'] !== true) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _pipe = __webpack_require__(8);
	var curryN = __webpack_require__(3);
	var reduce = __webpack_require__(9);
	var tail = __webpack_require__(16);
	
	
	/**
	 * Performs left-to-right function composition. The leftmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * In some libraries this function is named `sequence`.
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> (a -> b -> ... -> n -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.compose
	 * @example
	 *
	 *      var f = R.pipe(Math.pow, R.negate, R.inc);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function pipe() {
	  if (arguments.length === 0) {
	    throw new Error('pipe requires at least one argument');
	  }
	  return curryN(arguments[0].length,
	                reduce(_pipe, arguments[0], tail(arguments)));
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function _pipe(f, g) {
	  return function() {
	    return g.call(this, f.apply(this, arguments));
	  };
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(10);
	var _reduce = __webpack_require__(11);
	
	
	/**
	 * Returns a single item by iterating through the list, successively calling the iterator
	 * function and passing it an accumulator value and the current value from the array, and
	 * then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*.  It may use `R.reduced` to
	 * shortcut the iteration.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse arrays), unlike
	 * the native `Array.prototype.reduce` method. For more details on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 * @see R.reduced
	 *
	 * @func
	 * @memberOf R
	 * @category List
	 * @sig (a,b -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @example
	 *
	 *      var numbers = [1, 2, 3];
	 *      var add = function(a, b) {
	 *        return a + b;
	 *      };
	 *
	 *      R.reduce(add, 10, numbers); //=> 16
	 */
	module.exports = _curry3(_reduce);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(2);
	var _curry2 = __webpack_require__(5);
	
	
	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f3;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f3;
	    } else if (n === 1) {
	      return _curry2(function(b, c) { return fn(a, b, c); });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
	                          b != null && b['@@functional/placeholder'] === true) {
	      return f3;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry2(function(a, c) { return fn(a, b, c); });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry2(function(b, c) { return fn(a, b, c); });
	    } else if (n === 2) {
	      return _curry1(function(c) { return fn(a, b, c); });
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true &&
	                          b != null && b['@@functional/placeholder'] === true &&
	                          c != null && c['@@functional/placeholder'] === true) {
	      return f3;
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true &&
	                          b != null && b['@@functional/placeholder'] === true) {
	      return _curry2(function(a, b) { return fn(a, b, c); });
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true &&
	                          c != null && c['@@functional/placeholder'] === true) {
	      return _curry2(function(a, c) { return fn(a, b, c); });
	    } else if (n === 3 && b != null && b['@@functional/placeholder'] === true &&
	                          c != null && c['@@functional/placeholder'] === true) {
	      return _curry2(function(b, c) { return fn(a, b, c); });
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function(a) { return fn(a, b, c); });
	    } else if (n === 3 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function(b) { return fn(a, b, c); });
	    } else if (n === 3 && c != null && c['@@functional/placeholder'] === true) {
	      return _curry1(function(c) { return fn(a, b, c); });
	    } else {
	      return fn(a, b, c);
	    }
	  };
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _xwrap = __webpack_require__(12);
	var bind = __webpack_require__(13);
	var isArrayLike = __webpack_require__(14);
	
	
	module.exports = (function() {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0, len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _methodReduce(xf, acc, obj) {
	    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	  }
	
	  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list);
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	})();


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = (function() {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function() {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
	  XWrap.prototype['@@transducer/step'] = function(acc, x) {
	    return this.f(acc, x);
	  };
	
	  return function _xwrap(fn) { return new XWrap(fn); };
	}());


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(4);
	var _curry2 = __webpack_require__(5);
	
	
	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @category Object
	 * @see R.partial
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function() {
	    return fn.apply(thisObj, arguments);
	  });
	});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(2);
	var _isArray = __webpack_require__(15);
	
	
	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @func
	 * @memberOf R
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      R.isArrayLike([]); //=> true
	 *      R.isArrayLike(true); //=> false
	 *      R.isArrayLike({}); //=> false
	 *      R.isArrayLike({length: 10}); //=> false
	 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) { return true; }
	  if (!x) { return false; }
	  if (typeof x !== 'object') { return false; }
	  if (x instanceof String) { return false; }
	  if (x.nodeType === 1) { return !!x.length; }
	  if (x.length === 0) { return true; }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return (val != null &&
	          val.length >= 0 &&
	          Object.prototype.toString.call(val) === '[object Array]');
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(17);
	var slice = __webpack_require__(19);
	
	
	/**
	 * Returns all but the first element of the given list or string (or object
	 * with a `tail` method).
	 *
	 * @func
	 * @memberOf R
	 * @category List
	 * @see R.head, R.init, R.last
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.tail([1, 2, 3]);  //=> [2, 3]
	 *      R.tail([1, 2]);     //=> [2]
	 *      R.tail([1]);        //=> []
	 *      R.tail([]);         //=> []
	 *
	 *      R.tail('abc');  //=> 'bc'
	 *      R.tail('ab');   //=> 'b'
	 *      R.tail('a');    //=> ''
	 *      R.tail('');     //=> ''
	 */
	module.exports = _checkForMethod('tail', slice(1, Infinity));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(15);
	var _slice = __webpack_require__(18);
	
	
	/**
	 * Similar to hasMethod, this checks whether a function has a [methodname]
	 * function. If it isn't an array it will execute that function otherwise it will
	 * default to the ramda implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
	      fn.apply(this, arguments) :
	      obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	  };
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * An optimized, private array `slice` implementation.
	 *
	 * @private
	 * @param {Arguments|Array} args The array or arguments object to consider.
	 * @param {Number} [from=0] The array index to slice from, inclusive.
	 * @param {Number} [to=args.length] The array index to slice to, exclusive.
	 * @return {Array} A new, sliced array.
	 * @example
	 *
	 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	 *
	 *      var firstThreeArgs = function(a, b, c, d) {
	 *        return _slice(arguments, 0, 3);
	 *      };
	 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	 */
	module.exports = function _slice(args, from, to) {
	  switch (arguments.length) {
	    case 1: return _slice(args, 0, args.length);
	    case 2: return _slice(args, from, args.length);
	    default:
	      var list = [];
	      var idx = 0;
	      var len = Math.max(0, Math.min(args.length, to) - from);
	      while (idx < len) {
	        list[idx] = args[from + idx];
	        idx += 1;
	      }
	      return list;
	  }
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(17);
	var _curry3 = __webpack_require__(10);
	
	
	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * @func
	 * @memberOf R
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @sig Number -> Number -> String -> String
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	 */
	module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	  return Array.prototype.slice.call(list, fromIndex, toIndex);
	}));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(5);
	var _dispatchable = __webpack_require__(21);
	var _map = __webpack_require__(23);
	var _xmap = __webpack_require__(24);
	
	
	/**
	 * Returns a new list, constructed by applying the supplied function to every element of the
	 * supplied list.
	 *
	 * Note: `R.map` does not skip deleted or unassigned indices (sparse arrays), unlike the
	 * native `Array.prototype.map` method. For more details on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
	 *
	 * Acts as a transducer if a transformer is given in list position.
	 * @see R.transduce
	 *
	 * @func
	 * @memberOf R
	 * @category List
	 * @sig (a -> b) -> [a] -> [b]
	 * @param {Function} fn The function to be called on every element of the input `list`.
	 * @param {Array} list The list to be iterated over.
	 * @return {Array} The new list.
	 * @example
	 *
	 *      var double = function(x) {
	 *        return x * 2;
	 *      };
	 *
	 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	 */
	module.exports = _curry2(_dispatchable('map', _xmap, _map));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(15);
	var _isTransformer = __webpack_require__(22);
	var _slice = __webpack_require__(18);
	
	
	/**
	 * Returns a function that dispatches with different strategies based on the
	 * object in list position (last argument). If it is an array, executes [fn].
	 * Otherwise, if it has a  function with [methodname], it will execute that
	 * function (functor case). Otherwise, if it is a transformer, uses transducer
	 * [xf] to return a new transformer (transducer case). Otherwise, it will
	 * default to executing [fn].
	 *
	 * @private
	 * @param {String} methodname property to check for a custom implementation
	 * @param {Function} xf transducer to initialize if object is transformer
	 * @param {Function} fn default ramda implementation
	 * @return {Function} A function that dispatches on object in list position
	 */
	module.exports = function _dispatchable(methodname, xf, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    if (!_isArray(obj)) {
	      var args = _slice(arguments, 0, length - 1);
	      if (typeof obj[methodname] === 'function') {
	        return obj[methodname].apply(obj, args);
	      }
	      if (_isTransformer(obj)) {
	        var transducer = xf.apply(null, args);
	        return transducer(obj);
	      }
	    }
	    return fn.apply(this, arguments);
	  };
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function _isTransformer(obj) {
	  return typeof obj['@@transducer/step'] === 'function';
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function _map(fn, list) {
	  var idx = 0, len = list.length, result = Array(len);
	  while (idx < len) {
	    result[idx] = fn(list[idx]);
	    idx += 1;
	  }
	  return result;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(5);
	var _xfBase = __webpack_require__(25);
	
	
	module.exports = (function() {
	  function XMap(f, xf) {
	    this.xf = xf;
	    this.f = f;
	  }
	  XMap.prototype['@@transducer/init'] = _xfBase.init;
	  XMap.prototype['@@transducer/result'] = _xfBase.result;
	  XMap.prototype['@@transducer/step'] = function(result, input) {
	    return this.xf['@@transducer/step'](result, this.f(input));
	  };
	
	  return _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
	})();


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {
	  init: function() {
	    return this.xf['@@transducer/init']();
	  },
	  result: function(result) {
	    return this.xf['@@transducer/result'](result);
	  }
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(2);
	var liftN = __webpack_require__(27);
	
	
	/**
	 * "lifts" a function of arity > 1 so that it may "map over" an Array or
	 * other Functor.
	 *
	 * @func
	 * @memberOf R
	 * @see R.liftN
	 * @category Function
	 * @sig (*... -> *) -> ([*]... -> [*])
	 * @param {Function} fn The function to lift into higher context
	 * @return {Function} The function `fn` applicable to mappable objects.
	 * @example
	 *
	 *      var madd3 = R.lift(R.curry(function(a, b, c) {
	 *        return a + b + c;
	 *      }));
	 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	 *
	 *      var madd5 = R.lift(R.curry(function(a, b, c, d, e) {
	 *        return a + b + c + d + e;
	 *      }));
	 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
	 */
	module.exports = _curry1(function lift(fn) {
	  return liftN(fn.length, fn);
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(5);
	var _reduce = __webpack_require__(11);
	var _slice = __webpack_require__(18);
	var ap = __webpack_require__(28);
	var curryN = __webpack_require__(3);
	var map = __webpack_require__(20);
	
	
	/**
	 * "lifts" a function to be the specified arity, so that it may "map over" that many
	 * lists (or other Functors).
	 *
	 * @func
	 * @memberOf R
	 * @see R.lift
	 * @category Function
	 * @sig Number -> (*... -> *) -> ([*]... -> [*])
	 * @param {Function} fn The function to lift into higher context
	 * @return {Function} The function `fn` applicable to mappable objects.
	 * @example
	 *
	 *      var madd3 = R.liftN(3, R.curryN(3, function() {
	 *        return R.reduce(R.add, 0, arguments);
	 *      }));
	 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	 */
	module.exports = _curry2(function liftN(arity, fn) {
	  var lifted = curryN(arity, fn);
	  return curryN(arity, function() {
	    return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
	  });
	});


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _concat = __webpack_require__(29);
	var _curry2 = __webpack_require__(5);
	var _hasMethod = __webpack_require__(30);
	var _reduce = __webpack_require__(11);
	var map = __webpack_require__(20);
	
	
	/**
	 * ap applies a list of functions to a list of values.
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig [f] -> [a] -> [f a]
	 * @param {Array} fns An array of functions
	 * @param {Array} vs An array of values
	 * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
	 * @example
	 *
	 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
	 */
	module.exports = _curry2(function ap(fns, vs) {
	  return _hasMethod('ap', fns) ? fns.ap(vs) : _reduce(function(acc, fn) {
	    return _concat(acc, map(fn, vs));
	  }, [], fns);
	});


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Private `concat` function to merge two array-like objects.
	 *
	 * @private
	 * @param {Array|Arguments} [set1=[]] An array-like object.
	 * @param {Array|Arguments} [set2=[]] An array-like object.
	 * @return {Array} A new, merged array.
	 * @example
	 *
	 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	 */
	module.exports = function _concat(set1, set2) {
	  set1 = set1 || [];
	  set2 = set2 || [];
	  var idx;
	  var len1 = set1.length;
	  var len2 = set2.length;
	  var result = [];
	
	  idx = 0;
	  while (idx < len1) {
	    result[result.length] = set1[idx];
	    idx += 1;
	  }
	  idx = 0;
	  while (idx < len2) {
	    result[result.length] = set2[idx];
	    idx += 1;
	  }
	  return result;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(15);
	
	
	/**
	 * Private function that determines whether or not a provided object has a given method.
	 * Does not ignore methods stored on the object's prototype chain. Used for dynamically
	 * dispatching Ramda methods to non-Array objects.
	 *
	 * @private
	 * @param {String} methodName The name of the method to check for.
	 * @param {Object} obj The object to test.
	 * @return {Boolean} `true` has a given method, `false` otherwise.
	 * @example
	 *
	 *      var person = { name: 'John' };
	 *      person.shout = function() { alert(this.name); };
	 *
	 *      _hasMethod('shout', person); //=> true
	 *      _hasMethod('foo', person); //=> false
	 */
	module.exports = function _hasMethod(methodName, obj) {
	  return obj != null && !_isArray(obj) && typeof obj[methodName] === 'function';
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(5);
	
	
	/**
	 * Runs the given function with the supplied object, then returns the object.
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig (a -> *) -> a -> a
	 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
	 * @param {*} x
	 * @return {*} `x`.
	 * @example
	 *
	 *      var sayX = function(x) { console.log('x is ' + x); };
	 *      R.tap(sayX, 100); //=> 100
	 *      //-> 'x is 100'
	 */
	module.exports = _curry2(function tap(fn, x) {
	  fn(x);
	  return x;
	});


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(5);
	
	
	/**
	 * Returns a function that when supplied an object returns the indicated property of that object, if it exists.
	 *
	 * @func
	 * @memberOf R
	 * @category Object
	 * @sig s -> {s: a} -> a | Undefined
	 * @param {String} p The property name
	 * @param {Object} obj The object to query
	 * @return {*} The value at `obj.p`.
	 * @example
	 *
	 *      R.prop('x', {x: 100}); //=> 100
	 *      R.prop('x', {}); //=> undefined
	 */
	module.exports = _curry2(function prop(p, obj) { return obj[p]; });


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var pipe = __webpack_require__(7);
	var reverse = __webpack_require__(34);
	
	
	/**
	 * Performs right-to-left function composition. The rightmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> (a -> b -> ... -> n -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.pipe
	 * @example
	 *
	 *      var f = R.compose(R.inc, R.negate, Math.pow);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function compose() {
	  if (arguments.length === 0) {
	    throw new Error('compose requires at least one argument');
	  }
	  return pipe.apply(this, reverse(arguments));
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(2);
	var _slice = __webpack_require__(18);
	
	
	/**
	 * Returns a new list with the same elements as the original list, just
	 * in the reverse order.
	 *
	 * @func
	 * @memberOf R
	 * @category List
	 * @sig [a] -> [a]
	 * @param {Array} list The list to reverse.
	 * @return {Array} A copy of the list in reverse order.
	 * @example
	 *
	 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	 *      R.reverse([1, 2]);     //=> [2, 1]
	 *      R.reverse([1]);        //=> [1]
	 *      R.reverse([]);         //=> []
	 */
	module.exports = _curry1(function reverse(list) {
	  return _slice(list).reverse();
	});


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(2);
	var _slice = __webpack_require__(18);
	var curry = __webpack_require__(1);
	
	
	/**
	 * Returns a new function much like the supplied one, except that the first two arguments'
	 * order is reversed.
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
	 * @param {Function} fn The function to invoke with its first two parameters reversed.
	 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
	 * @example
	 *
	 *      var mergeThree = function(a, b, c) {
	 *        return ([]).concat(a, b, c);
	 *      };
	 *
	 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
	 *
	 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
	 */
	module.exports = _curry1(function flip(fn) {
	  return curry(function(a, b) {
	    var args = _slice(arguments);
	    args[0] = b;
	    args[1] = a;
	    return fn.apply(this, args);
	  });
	});


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {(function() {
	  var Bacon, BufferingSource, Bus, CompositeUnsubscribe, ConsumingSource, Desc, Dispatcher, End, Error, Event, EventStream, Exception, Initial, Next, None, Observable, Property, PropertyDispatcher, Some, Source, UpdateBarrier, _, addPropertyInitValueToStream, argumentsToObservables, argumentsToObservablesAndFunction, assert, assertArray, assertEventStream, assertFunction, assertNoArguments, assertObservable, assertObservableIsProperty, assertString, cloneArray, constantToFunction, containsDuplicateDeps, convertArgsToFunction, describe, endEvent, eventIdCounter, eventMethods, findDeps, findHandlerMethods, flatMap_, former, idCounter, initialEvent, isArray, isFieldKey, isObservable, latter, liftCallback, makeFunction, makeFunctionArgs, makeFunction_, makeObservable, makeSpawner, nextEvent, nop, partiallyApplied, recursionDepth, ref, registerObs, spys, toCombinator, toEvent, toFieldExtractor, toFieldKey, toOption, toSimpleExtractor, valueAndEnd, withDesc, withMethodCallSupport,
	    hasProp = {}.hasOwnProperty,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    slice = [].slice,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	  Bacon = {
	    toString: function() {
	      return "Bacon";
	    }
	  };
	
	  Bacon.version = '0.7.71';
	
	  Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;
	
	  nop = function() {};
	
	  latter = function(_, x) {
	    return x;
	  };
	
	  former = function(x, _) {
	    return x;
	  };
	
	  cloneArray = function(xs) {
	    return xs.slice(0);
	  };
	
	  assert = function(message, condition) {
	    if (!condition) {
	      throw new Exception(message);
	    }
	  };
	
	  assertObservableIsProperty = function(x) {
	    if (x instanceof Observable && !(x instanceof Property)) {
	      throw new Exception("Observable is not a Property : " + x);
	    }
	  };
	
	  assertEventStream = function(event) {
	    if (!(event instanceof EventStream)) {
	      throw new Exception("not an EventStream : " + event);
	    }
	  };
	
	  assertObservable = function(event) {
	    if (!(event instanceof Observable)) {
	      throw new Exception("not an Observable : " + event);
	    }
	  };
	
	  assertFunction = function(f) {
	    return assert("not a function : " + f, _.isFunction(f));
	  };
	
	  isArray = function(xs) {
	    return xs instanceof Array;
	  };
	
	  isObservable = function(x) {
	    return x instanceof Observable;
	  };
	
	  assertArray = function(xs) {
	    if (!isArray(xs)) {
	      throw new Exception("not an array : " + xs);
	    }
	  };
	
	  assertNoArguments = function(args) {
	    return assert("no arguments supported", args.length === 0);
	  };
	
	  assertString = function(x) {
	    if (typeof x !== "string") {
	      throw new Exception("not a string : " + x);
	    }
	  };
	
	  _ = {
	    indexOf: Array.prototype.indexOf ? function(xs, x) {
	      return xs.indexOf(x);
	    } : function(xs, x) {
	      var i, j, len1, y;
	      for (i = j = 0, len1 = xs.length; j < len1; i = ++j) {
	        y = xs[i];
	        if (x === y) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    indexWhere: function(xs, f) {
	      var i, j, len1, y;
	      for (i = j = 0, len1 = xs.length; j < len1; i = ++j) {
	        y = xs[i];
	        if (f(y)) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    head: function(xs) {
	      return xs[0];
	    },
	    always: function(x) {
	      return function() {
	        return x;
	      };
	    },
	    negate: function(f) {
	      return function(x) {
	        return !f(x);
	      };
	    },
	    empty: function(xs) {
	      return xs.length === 0;
	    },
	    tail: function(xs) {
	      return xs.slice(1, xs.length);
	    },
	    filter: function(f, xs) {
	      var filtered, j, len1, x;
	      filtered = [];
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        if (f(x)) {
	          filtered.push(x);
	        }
	      }
	      return filtered;
	    },
	    map: function(f, xs) {
	      var j, len1, results, x;
	      results = [];
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        results.push(f(x));
	      }
	      return results;
	    },
	    each: function(xs, f) {
	      var key, value;
	      for (key in xs) {
	        if (!hasProp.call(xs, key)) continue;
	        value = xs[key];
	        f(key, value);
	      }
	      return void 0;
	    },
	    toArray: function(xs) {
	      if (isArray(xs)) {
	        return xs;
	      } else {
	        return [xs];
	      }
	    },
	    contains: function(xs, x) {
	      return _.indexOf(xs, x) !== -1;
	    },
	    id: function(x) {
	      return x;
	    },
	    last: function(xs) {
	      return xs[xs.length - 1];
	    },
	    all: function(xs, f) {
	      var j, len1, x;
	      if (f == null) {
	        f = _.id;
	      }
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        if (!f(x)) {
	          return false;
	        }
	      }
	      return true;
	    },
	    any: function(xs, f) {
	      var j, len1, x;
	      if (f == null) {
	        f = _.id;
	      }
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        if (f(x)) {
	          return true;
	        }
	      }
	      return false;
	    },
	    without: function(x, xs) {
	      return _.filter((function(y) {
	        return y !== x;
	      }), xs);
	    },
	    remove: function(x, xs) {
	      var i;
	      i = _.indexOf(xs, x);
	      if (i >= 0) {
	        return xs.splice(i, 1);
	      }
	    },
	    fold: function(xs, seed, f) {
	      var j, len1, x;
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        seed = f(seed, x);
	      }
	      return seed;
	    },
	    flatMap: function(f, xs) {
	      return _.fold(xs, [], (function(ys, x) {
	        return ys.concat(f(x));
	      }));
	    },
	    cached: function(f) {
	      var value;
	      value = None;
	      return function() {
	        if (value === None) {
	          value = f();
	          f = void 0;
	        }
	        return value;
	      };
	    },
	    isFunction: function(f) {
	      return typeof f === "function";
	    },
	    toString: function(obj) {
	      var ex, internals, key, value;
	      try {
	        recursionDepth++;
	        if (obj == null) {
	          return "undefined";
	        } else if (_.isFunction(obj)) {
	          return "function";
	        } else if (isArray(obj)) {
	          if (recursionDepth > 5) {
	            return "[..]";
	          }
	          return "[" + _.map(_.toString, obj).toString() + "]";
	        } else if (((obj != null ? obj.toString : void 0) != null) && obj.toString !== Object.prototype.toString) {
	          return obj.toString();
	        } else if (typeof obj === "object") {
	          if (recursionDepth > 5) {
	            return "{..}";
	          }
	          internals = (function() {
	            var results;
	            results = [];
	            for (key in obj) {
	              if (!hasProp.call(obj, key)) continue;
	              value = (function() {
	                try {
	                  return obj[key];
	                } catch (_error) {
	                  ex = _error;
	                  return ex;
	                }
	              })();
	              results.push(_.toString(key) + ":" + _.toString(value));
	            }
	            return results;
	          })();
	          return "{" + internals + "}";
	        } else {
	          return obj;
	        }
	      } finally {
	        recursionDepth--;
	      }
	    }
	  };
	
	  recursionDepth = 0;
	
	  Bacon._ = _;
	
	  UpdateBarrier = Bacon.UpdateBarrier = (function() {
	    var afterTransaction, afters, aftersIndex, currentEventId, flush, flushDepsOf, flushWaiters, hasWaiters, inTransaction, rootEvent, waiterObs, waiters, whenDoneWith, wrappedSubscribe;
	    rootEvent = void 0;
	    waiterObs = [];
	    waiters = {};
	    afters = [];
	    aftersIndex = 0;
	    afterTransaction = function(f) {
	      if (rootEvent) {
	        return afters.push(f);
	      } else {
	        return f();
	      }
	    };
	    whenDoneWith = function(obs, f) {
	      var obsWaiters;
	      if (rootEvent) {
	        obsWaiters = waiters[obs.id];
	        if (obsWaiters == null) {
	          obsWaiters = waiters[obs.id] = [f];
	          return waiterObs.push(obs);
	        } else {
	          return obsWaiters.push(f);
	        }
	      } else {
	        return f();
	      }
	    };
	    flush = function() {
	      while (waiterObs.length > 0) {
	        flushWaiters(0);
	      }
	      return void 0;
	    };
	    flushWaiters = function(index) {
	      var f, j, len1, obs, obsId, obsWaiters;
	      obs = waiterObs[index];
	      obsId = obs.id;
	      obsWaiters = waiters[obsId];
	      waiterObs.splice(index, 1);
	      delete waiters[obsId];
	      flushDepsOf(obs);
	      for (j = 0, len1 = obsWaiters.length; j < len1; j++) {
	        f = obsWaiters[j];
	        f();
	      }
	      return void 0;
	    };
	    flushDepsOf = function(obs) {
	      var dep, deps, index, j, len1;
	      deps = obs.internalDeps();
	      for (j = 0, len1 = deps.length; j < len1; j++) {
	        dep = deps[j];
	        flushDepsOf(dep);
	        if (waiters[dep.id]) {
	          index = _.indexOf(waiterObs, dep);
	          flushWaiters(index);
	        }
	      }
	      return void 0;
	    };
	    inTransaction = function(event, context, f, args) {
	      var after, result;
	      if (rootEvent) {
	        return f.apply(context, args);
	      } else {
	        rootEvent = event;
	        try {
	          result = f.apply(context, args);
	          flush();
	        } finally {
	          rootEvent = void 0;
	          while (aftersIndex < afters.length) {
	            after = afters[aftersIndex];
	            aftersIndex++;
	            after();
	          }
	          aftersIndex = 0;
	          afters = [];
	        }
	        return result;
	      }
	    };
	    currentEventId = function() {
	      if (rootEvent) {
	        return rootEvent.id;
	      } else {
	        return void 0;
	      }
	    };
	    wrappedSubscribe = function(obs, sink) {
	      var doUnsub, shouldUnsub, unsub, unsubd;
	      unsubd = false;
	      shouldUnsub = false;
	      doUnsub = function() {
	        return shouldUnsub = true;
	      };
	      unsub = function() {
	        unsubd = true;
	        return doUnsub();
	      };
	      doUnsub = obs.dispatcher.subscribe(function(event) {
	        return afterTransaction(function() {
	          var reply;
	          if (!unsubd) {
	            reply = sink(event);
	            if (reply === Bacon.noMore) {
	              return unsub();
	            }
	          }
	        });
	      });
	      if (shouldUnsub) {
	        doUnsub();
	      }
	      return unsub;
	    };
	    hasWaiters = function() {
	      return waiterObs.length > 0;
	    };
	    return {
	      whenDoneWith: whenDoneWith,
	      hasWaiters: hasWaiters,
	      inTransaction: inTransaction,
	      currentEventId: currentEventId,
	      wrappedSubscribe: wrappedSubscribe,
	      afterTransaction: afterTransaction
	    };
	  })();
	
	  Source = (function() {
	    function Source(obs1, sync, lazy1) {
	      this.obs = obs1;
	      this.sync = sync;
	      this.lazy = lazy1 != null ? lazy1 : false;
	      this.queue = [];
	    }
	
	    Source.prototype.subscribe = function(sink) {
	      return this.obs.dispatcher.subscribe(sink);
	    };
	
	    Source.prototype.toString = function() {
	      return this.obs.toString();
	    };
	
	    Source.prototype.markEnded = function() {
	      return this.ended = true;
	    };
	
	    Source.prototype.consume = function() {
	      if (this.lazy) {
	        return {
	          value: _.always(this.queue[0])
	        };
	      } else {
	        return this.queue[0];
	      }
	    };
	
	    Source.prototype.push = function(x) {
	      return this.queue = [x];
	    };
	
	    Source.prototype.mayHave = function() {
	      return true;
	    };
	
	    Source.prototype.hasAtLeast = function() {
	      return this.queue.length;
	    };
	
	    Source.prototype.flatten = true;
	
	    return Source;
	
	  })();
	
	  ConsumingSource = (function(superClass) {
	    extend(ConsumingSource, superClass);
	
	    function ConsumingSource() {
	      return ConsumingSource.__super__.constructor.apply(this, arguments);
	    }
	
	    ConsumingSource.prototype.consume = function() {
	      return this.queue.shift();
	    };
	
	    ConsumingSource.prototype.push = function(x) {
	      return this.queue.push(x);
	    };
	
	    ConsumingSource.prototype.mayHave = function(c) {
	      return !this.ended || this.queue.length >= c;
	    };
	
	    ConsumingSource.prototype.hasAtLeast = function(c) {
	      return this.queue.length >= c;
	    };
	
	    ConsumingSource.prototype.flatten = false;
	
	    return ConsumingSource;
	
	  })(Source);
	
	  BufferingSource = (function(superClass) {
	    extend(BufferingSource, superClass);
	
	    function BufferingSource(obs) {
	      BufferingSource.__super__.constructor.call(this, obs, true);
	    }
	
	    BufferingSource.prototype.consume = function() {
	      var values;
	      values = this.queue;
	      this.queue = [];
	      return {
	        value: function() {
	          return values;
	        }
	      };
	    };
	
	    BufferingSource.prototype.push = function(x) {
	      return this.queue.push(x.value());
	    };
	
	    BufferingSource.prototype.hasAtLeast = function() {
	      return true;
	    };
	
	    return BufferingSource;
	
	  })(Source);
	
	  Source.isTrigger = function(s) {
	    if (s instanceof Source) {
	      return s.sync;
	    } else {
	      return s instanceof EventStream;
	    }
	  };
	
	  Source.fromObservable = function(s) {
	    if (s instanceof Source) {
	      return s;
	    } else if (s instanceof Property) {
	      return new Source(s, false);
	    } else {
	      return new ConsumingSource(s, true);
	    }
	  };
	
	  Desc = (function() {
	    function Desc(context1, method1, args1) {
	      this.context = context1;
	      this.method = method1;
	      this.args = args1;
	    }
	
	    Desc.prototype.deps = function() {
	      return this.cached || (this.cached = findDeps([this.context].concat(this.args)));
	    };
	
	    Desc.prototype.toString = function() {
	      return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
	    };
	
	    return Desc;
	
	  })();
	
	  describe = function() {
	    var args, context, method;
	    context = arguments[0], method = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
	    if ((context || method) instanceof Desc) {
	      return context || method;
	    } else {
	      return new Desc(context, method, args);
	    }
	  };
	
	  withDesc = function(desc, obs) {
	    obs.desc = desc;
	    return obs;
	  };
	
	  findDeps = function(x) {
	    if (isArray(x)) {
	      return _.flatMap(findDeps, x);
	    } else if (isObservable(x)) {
	      return [x];
	    } else if (x instanceof Source) {
	      return [x.obs];
	    } else {
	      return [];
	    }
	  };
	
	  Bacon.Desc = Desc;
	
	  Bacon.Desc.empty = new Bacon.Desc("", "", []);
	
	  withMethodCallSupport = function(wrapped) {
	    return function() {
	      var args, context, f, methodName;
	      f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      if (typeof f === "object" && args.length) {
	        context = f;
	        methodName = args[0];
	        f = function() {
	          return context[methodName].apply(context, arguments);
	        };
	        args = args.slice(1);
	      }
	      return wrapped.apply(null, [f].concat(slice.call(args)));
	    };
	  };
	
	  makeFunctionArgs = function(args) {
	    args = Array.prototype.slice.call(args);
	    return makeFunction_.apply(null, args);
	  };
	
	  partiallyApplied = function(f, applied) {
	    return function() {
	      var args;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return f.apply(null, applied.concat(args));
	    };
	  };
	
	  toSimpleExtractor = function(args) {
	    return function(key) {
	      return function(value) {
	        var fieldValue;
	        if (value == null) {
	          return void 0;
	        } else {
	          fieldValue = value[key];
	          if (_.isFunction(fieldValue)) {
	            return fieldValue.apply(value, args);
	          } else {
	            return fieldValue;
	          }
	        }
	      };
	    };
	  };
	
	  toFieldExtractor = function(f, args) {
	    var partFuncs, parts;
	    parts = f.slice(1).split(".");
	    partFuncs = _.map(toSimpleExtractor(args), parts);
	    return function(value) {
	      var j, len1;
	      for (j = 0, len1 = partFuncs.length; j < len1; j++) {
	        f = partFuncs[j];
	        value = f(value);
	      }
	      return value;
	    };
	  };
	
	  isFieldKey = function(f) {
	    return (typeof f === "string") && f.length > 1 && f.charAt(0) === ".";
	  };
	
	  makeFunction_ = withMethodCallSupport(function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (_.isFunction(f)) {
	      if (args.length) {
	        return partiallyApplied(f, args);
	      } else {
	        return f;
	      }
	    } else if (isFieldKey(f)) {
	      return toFieldExtractor(f, args);
	    } else {
	      return _.always(f);
	    }
	  });
	
	  makeFunction = function(f, args) {
	    return makeFunction_.apply(null, [f].concat(slice.call(args)));
	  };
	
	  convertArgsToFunction = function(obs, f, args, method) {
	    var sampled;
	    if (f instanceof Property) {
	      sampled = f.sampledBy(obs, function(p, s) {
	        return [p, s];
	      });
	      return method.call(sampled, function(arg) {
	        var p, s;
	        p = arg[0], s = arg[1];
	        return p;
	      }).map(function(arg) {
	        var p, s;
	        p = arg[0], s = arg[1];
	        return s;
	      });
	    } else {
	      f = makeFunction(f, args);
	      return method.call(obs, f);
	    }
	  };
	
	  toCombinator = function(f) {
	    var key;
	    if (_.isFunction(f)) {
	      return f;
	    } else if (isFieldKey(f)) {
	      key = toFieldKey(f);
	      return function(left, right) {
	        return left[key](right);
	      };
	    } else {
	      throw new Exception("not a function or a field key: " + f);
	    }
	  };
	
	  toFieldKey = function(f) {
	    return f.slice(1);
	  };
	
	  Some = (function() {
	    function Some(value1) {
	      this.value = value1;
	    }
	
	    Some.prototype.getOrElse = function() {
	      return this.value;
	    };
	
	    Some.prototype.get = function() {
	      return this.value;
	    };
	
	    Some.prototype.filter = function(f) {
	      if (f(this.value)) {
	        return new Some(this.value);
	      } else {
	        return None;
	      }
	    };
	
	    Some.prototype.map = function(f) {
	      return new Some(f(this.value));
	    };
	
	    Some.prototype.forEach = function(f) {
	      return f(this.value);
	    };
	
	    Some.prototype.isDefined = true;
	
	    Some.prototype.toArray = function() {
	      return [this.value];
	    };
	
	    Some.prototype.inspect = function() {
	      return "Some(" + this.value + ")";
	    };
	
	    Some.prototype.toString = function() {
	      return this.inspect();
	    };
	
	    return Some;
	
	  })();
	
	  None = {
	    getOrElse: function(value) {
	      return value;
	    },
	    filter: function() {
	      return None;
	    },
	    map: function() {
	      return None;
	    },
	    forEach: function() {},
	    isDefined: false,
	    toArray: function() {
	      return [];
	    },
	    inspect: function() {
	      return "None";
	    },
	    toString: function() {
	      return this.inspect();
	    }
	  };
	
	  toOption = function(v) {
	    if (v instanceof Some || v === None) {
	      return v;
	    } else {
	      return new Some(v);
	    }
	  };
	
	  Bacon.noMore = ["<no-more>"];
	
	  Bacon.more = ["<more>"];
	
	  eventIdCounter = 0;
	
	  Event = (function() {
	    function Event() {
	      this.id = ++eventIdCounter;
	    }
	
	    Event.prototype.isEvent = function() {
	      return true;
	    };
	
	    Event.prototype.isEnd = function() {
	      return false;
	    };
	
	    Event.prototype.isInitial = function() {
	      return false;
	    };
	
	    Event.prototype.isNext = function() {
	      return false;
	    };
	
	    Event.prototype.isError = function() {
	      return false;
	    };
	
	    Event.prototype.hasValue = function() {
	      return false;
	    };
	
	    Event.prototype.filter = function() {
	      return true;
	    };
	
	    Event.prototype.inspect = function() {
	      return this.toString();
	    };
	
	    Event.prototype.log = function() {
	      return this.toString();
	    };
	
	    return Event;
	
	  })();
	
	  Next = (function(superClass) {
	    extend(Next, superClass);
	
	    function Next(valueF, eager) {
	      Next.__super__.constructor.call(this);
	      if (!eager && _.isFunction(valueF) || valueF instanceof Next) {
	        this.valueF = valueF;
	        this.valueInternal = void 0;
	      } else {
	        this.valueF = void 0;
	        this.valueInternal = valueF;
	      }
	    }
	
	    Next.prototype.isNext = function() {
	      return true;
	    };
	
	    Next.prototype.hasValue = function() {
	      return true;
	    };
	
	    Next.prototype.value = function() {
	      if (this.valueF instanceof Next) {
	        this.valueInternal = this.valueF.value();
	        this.valueF = void 0;
	      } else if (this.valueF) {
	        this.valueInternal = this.valueF();
	        this.valueF = void 0;
	      }
	      return this.valueInternal;
	    };
	
	    Next.prototype.fmap = function(f) {
	      var event, value;
	      if (this.valueInternal) {
	        value = this.valueInternal;
	        return this.apply(function() {
	          return f(value);
	        });
	      } else {
	        event = this;
	        return this.apply(function() {
	          return f(event.value());
	        });
	      }
	    };
	
	    Next.prototype.apply = function(value) {
	      return new Next(value);
	    };
	
	    Next.prototype.filter = function(f) {
	      return f(this.value());
	    };
	
	    Next.prototype.toString = function() {
	      return _.toString(this.value());
	    };
	
	    Next.prototype.log = function() {
	      return this.value();
	    };
	
	    return Next;
	
	  })(Event);
	
	  Initial = (function(superClass) {
	    extend(Initial, superClass);
	
	    function Initial() {
	      return Initial.__super__.constructor.apply(this, arguments);
	    }
	
	    Initial.prototype.isInitial = function() {
	      return true;
	    };
	
	    Initial.prototype.isNext = function() {
	      return false;
	    };
	
	    Initial.prototype.apply = function(value) {
	      return new Initial(value);
	    };
	
	    Initial.prototype.toNext = function() {
	      return new Next(this);
	    };
	
	    return Initial;
	
	  })(Next);
	
	  End = (function(superClass) {
	    extend(End, superClass);
	
	    function End() {
	      return End.__super__.constructor.apply(this, arguments);
	    }
	
	    End.prototype.isEnd = function() {
	      return true;
	    };
	
	    End.prototype.fmap = function() {
	      return this;
	    };
	
	    End.prototype.apply = function() {
	      return this;
	    };
	
	    End.prototype.toString = function() {
	      return "<end>";
	    };
	
	    return End;
	
	  })(Event);
	
	  Error = (function(superClass) {
	    extend(Error, superClass);
	
	    function Error(error1) {
	      this.error = error1;
	    }
	
	    Error.prototype.isError = function() {
	      return true;
	    };
	
	    Error.prototype.fmap = function() {
	      return this;
	    };
	
	    Error.prototype.apply = function() {
	      return this;
	    };
	
	    Error.prototype.toString = function() {
	      return "<error> " + _.toString(this.error);
	    };
	
	    return Error;
	
	  })(Event);
	
	  Bacon.Event = Event;
	
	  Bacon.Initial = Initial;
	
	  Bacon.Next = Next;
	
	  Bacon.End = End;
	
	  Bacon.Error = Error;
	
	  initialEvent = function(value) {
	    return new Initial(value, true);
	  };
	
	  nextEvent = function(value) {
	    return new Next(value, true);
	  };
	
	  endEvent = function() {
	    return new End();
	  };
	
	  toEvent = function(x) {
	    if (x instanceof Event) {
	      return x;
	    } else {
	      return nextEvent(x);
	    }
	  };
	
	  idCounter = 0;
	
	  registerObs = function() {};
	
	  Observable = (function() {
	    function Observable(desc1) {
	      this.desc = desc1;
	      this.id = ++idCounter;
	      this.initialDesc = this.desc;
	    }
	
	    Observable.prototype.subscribe = function(sink) {
	      return UpdateBarrier.wrappedSubscribe(this, sink);
	    };
	
	    Observable.prototype.subscribeInternal = function(sink) {
	      return this.dispatcher.subscribe(sink);
	    };
	
	    Observable.prototype.onValue = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.hasValue()) {
	          return f(event.value());
	        }
	      });
	    };
	
	    Observable.prototype.onValues = function(f) {
	      return this.onValue(function(args) {
	        return f.apply(null, args);
	      });
	    };
	
	    Observable.prototype.onError = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.isError()) {
	          return f(event.error);
	        }
	      });
	    };
	
	    Observable.prototype.onEnd = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.isEnd()) {
	          return f();
	        }
	      });
	    };
	
	    Observable.prototype.name = function(name) {
	      this._name = name;
	      return this;
	    };
	
	    Observable.prototype.withDescription = function() {
	      this.desc = describe.apply(null, arguments);
	      return this;
	    };
	
	    Observable.prototype.toString = function() {
	      if (this._name) {
	        return this._name;
	      } else {
	        return this.desc.toString();
	      }
	    };
	
	    Observable.prototype.internalDeps = function() {
	      return this.initialDesc.deps();
	    };
	
	    return Observable;
	
	  })();
	
	  Observable.prototype.assign = Observable.prototype.onValue;
	
	  Observable.prototype.forEach = Observable.prototype.onValue;
	
	  Observable.prototype.inspect = Observable.prototype.toString;
	
	  Bacon.Observable = Observable;
	
	  CompositeUnsubscribe = (function() {
	    function CompositeUnsubscribe(ss) {
	      var j, len1, s;
	      if (ss == null) {
	        ss = [];
	      }
	      this.unsubscribe = bind(this.unsubscribe, this);
	      this.unsubscribed = false;
	      this.subscriptions = [];
	      this.starting = [];
	      for (j = 0, len1 = ss.length; j < len1; j++) {
	        s = ss[j];
	        this.add(s);
	      }
	    }
	
	    CompositeUnsubscribe.prototype.add = function(subscription) {
	      var ended, unsub, unsubMe;
	      if (this.unsubscribed) {
	        return;
	      }
	      ended = false;
	      unsub = nop;
	      this.starting.push(subscription);
	      unsubMe = (function(_this) {
	        return function() {
	          if (_this.unsubscribed) {
	            return;
	          }
	          ended = true;
	          _this.remove(unsub);
	          return _.remove(subscription, _this.starting);
	        };
	      })(this);
	      unsub = subscription(this.unsubscribe, unsubMe);
	      if (!(this.unsubscribed || ended)) {
	        this.subscriptions.push(unsub);
	      } else {
	        unsub();
	      }
	      _.remove(subscription, this.starting);
	      return unsub;
	    };
	
	    CompositeUnsubscribe.prototype.remove = function(unsub) {
	      if (this.unsubscribed) {
	        return;
	      }
	      if ((_.remove(unsub, this.subscriptions)) !== void 0) {
	        return unsub();
	      }
	    };
	
	    CompositeUnsubscribe.prototype.unsubscribe = function() {
	      var j, len1, ref, s;
	      if (this.unsubscribed) {
	        return;
	      }
	      this.unsubscribed = true;
	      ref = this.subscriptions;
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        s = ref[j];
	        s();
	      }
	      this.subscriptions = [];
	      return this.starting = [];
	    };
	
	    CompositeUnsubscribe.prototype.count = function() {
	      if (this.unsubscribed) {
	        return 0;
	      }
	      return this.subscriptions.length + this.starting.length;
	    };
	
	    CompositeUnsubscribe.prototype.empty = function() {
	      return this.count() === 0;
	    };
	
	    return CompositeUnsubscribe;
	
	  })();
	
	  Bacon.CompositeUnsubscribe = CompositeUnsubscribe;
	
	  Dispatcher = (function() {
	    Dispatcher.prototype.pushing = false;
	
	    Dispatcher.prototype.ended = false;
	
	    Dispatcher.prototype.prevError = void 0;
	
	    Dispatcher.prototype.unsubSrc = void 0;
	
	    function Dispatcher(_subscribe, _handleEvent) {
	      this._subscribe = _subscribe;
	      this._handleEvent = _handleEvent;
	      this.subscribe = bind(this.subscribe, this);
	      this.handleEvent = bind(this.handleEvent, this);
	      this.subscriptions = [];
	      this.queue = [];
	    }
	
	    Dispatcher.prototype.hasSubscribers = function() {
	      return this.subscriptions.length > 0;
	    };
	
	    Dispatcher.prototype.removeSub = function(subscription) {
	      return this.subscriptions = _.without(subscription, this.subscriptions);
	    };
	
	    Dispatcher.prototype.push = function(event) {
	      if (event.isEnd()) {
	        this.ended = true;
	      }
	      return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
	    };
	
	    Dispatcher.prototype.pushToSubscriptions = function(event) {
	      var e, j, len1, reply, sub, tmp;
	      try {
	        tmp = this.subscriptions;
	        for (j = 0, len1 = tmp.length; j < len1; j++) {
	          sub = tmp[j];
	          reply = sub.sink(event);
	          if (reply === Bacon.noMore || event.isEnd()) {
	            this.removeSub(sub);
	          }
	        }
	        return true;
	      } catch (_error) {
	        e = _error;
	        this.pushing = false;
	        this.queue = [];
	        throw e;
	      }
	    };
	
	    Dispatcher.prototype.pushIt = function(event) {
	      if (!this.pushing) {
	        if (event === this.prevError) {
	          return;
	        }
	        if (event.isError()) {
	          this.prevError = event;
	        }
	        this.pushing = true;
	        this.pushToSubscriptions(event);
	        this.pushing = false;
	        while (this.queue.length) {
	          event = this.queue.shift();
	          this.push(event);
	        }
	        if (this.hasSubscribers()) {
	          return Bacon.more;
	        } else {
	          this.unsubscribeFromSource();
	          return Bacon.noMore;
	        }
	      } else {
	        this.queue.push(event);
	        return Bacon.more;
	      }
	    };
	
	    Dispatcher.prototype.handleEvent = function(event) {
	      if (this._handleEvent) {
	        return this._handleEvent(event);
	      } else {
	        return this.push(event);
	      }
	    };
	
	    Dispatcher.prototype.unsubscribeFromSource = function() {
	      if (this.unsubSrc) {
	        this.unsubSrc();
	      }
	      return this.unsubSrc = void 0;
	    };
	
	    Dispatcher.prototype.subscribe = function(sink) {
	      var subscription;
	      if (this.ended) {
	        sink(endEvent());
	        return nop;
	      } else {
	        assertFunction(sink);
	        subscription = {
	          sink: sink
	        };
	        this.subscriptions.push(subscription);
	        if (this.subscriptions.length === 1) {
	          this.unsubSrc = this._subscribe(this.handleEvent);
	          assertFunction(this.unsubSrc);
	        }
	        return (function(_this) {
	          return function() {
	            _this.removeSub(subscription);
	            if (!_this.hasSubscribers()) {
	              return _this.unsubscribeFromSource();
	            }
	          };
	        })(this);
	      }
	    };
	
	    return Dispatcher;
	
	  })();
	
	  Bacon.Dispatcher = Dispatcher;
	
	  EventStream = (function(superClass) {
	    extend(EventStream, superClass);
	
	    function EventStream(desc, subscribe, handler) {
	      if (_.isFunction(desc)) {
	        handler = subscribe;
	        subscribe = desc;
	        desc = Desc.empty;
	      }
	      EventStream.__super__.constructor.call(this, desc);
	      assertFunction(subscribe);
	      this.dispatcher = new Dispatcher(subscribe, handler);
	      registerObs(this);
	    }
	
	    EventStream.prototype.toProperty = function(initValue_) {
	      var disp, initValue;
	      initValue = arguments.length === 0 ? None : toOption(function() {
	        return initValue_;
	      });
	      disp = this.dispatcher;
	      return new Property(new Bacon.Desc(this, "toProperty", [initValue_]), function(sink) {
	        var initSent, reply, sendInit, unsub;
	        initSent = false;
	        unsub = nop;
	        reply = Bacon.more;
	        sendInit = function() {
	          if (!initSent) {
	            return initValue.forEach(function(value) {
	              initSent = true;
	              reply = sink(new Initial(value));
	              if (reply === Bacon.noMore) {
	                unsub();
	                return unsub = nop;
	              }
	            });
	          }
	        };
	        unsub = disp.subscribe(function(event) {
	          if (event.hasValue()) {
	            if (initSent && event.isInitial()) {
	              return Bacon.more;
	            } else {
	              if (!event.isInitial()) {
	                sendInit();
	              }
	              initSent = true;
	              initValue = new Some(event);
	              return sink(event);
	            }
	          } else {
	            if (event.isEnd()) {
	              reply = sendInit();
	            }
	            if (reply !== Bacon.noMore) {
	              return sink(event);
	            }
	          }
	        });
	        sendInit();
	        return unsub;
	      });
	    };
	
	    EventStream.prototype.toEventStream = function() {
	      return this;
	    };
	
	    EventStream.prototype.withHandler = function(handler) {
	      return new EventStream(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
	    };
	
	    return EventStream;
	
	  })(Observable);
	
	  Bacon.EventStream = EventStream;
	
	  Bacon.never = function() {
	    return new EventStream(describe(Bacon, "never"), function(sink) {
	      sink(endEvent());
	      return nop;
	    });
	  };
	
	  Bacon.when = function() {
	    var f, i, index, ix, j, k, len, len1, len2, needsBarrier, pat, patSources, pats, patterns, ref, resultStream, s, sources, triggerFound, usage;
	    if (arguments.length === 0) {
	      return Bacon.never();
	    }
	    len = arguments.length;
	    usage = "when: expecting arguments in the form (Observable+,function)+";
	    assert(usage, len % 2 === 0);
	    sources = [];
	    pats = [];
	    i = 0;
	    patterns = [];
	    while (i < len) {
	      patterns[i] = arguments[i];
	      patterns[i + 1] = arguments[i + 1];
	      patSources = _.toArray(arguments[i]);
	      f = constantToFunction(arguments[i + 1]);
	      pat = {
	        f: f,
	        ixs: []
	      };
	      triggerFound = false;
	      for (j = 0, len1 = patSources.length; j < len1; j++) {
	        s = patSources[j];
	        index = _.indexOf(sources, s);
	        if (!triggerFound) {
	          triggerFound = Source.isTrigger(s);
	        }
	        if (index < 0) {
	          sources.push(s);
	          index = sources.length - 1;
	        }
	        ref = pat.ixs;
	        for (k = 0, len2 = ref.length; k < len2; k++) {
	          ix = ref[k];
	          if (ix.index === index) {
	            ix.count++;
	          }
	        }
	        pat.ixs.push({
	          index: index,
	          count: 1
	        });
	      }
	      assert("At least one EventStream required", triggerFound || (!patSources.length));
	      if (patSources.length > 0) {
	        pats.push(pat);
	      }
	      i = i + 2;
	    }
	    if (!sources.length) {
	      return Bacon.never();
	    }
	    sources = _.map(Source.fromObservable, sources);
	    needsBarrier = (_.any(sources, function(s) {
	      return s.flatten;
	    })) && (containsDuplicateDeps(_.map((function(s) {
	      return s.obs;
	    }), sources)));
	    return resultStream = new EventStream(new Bacon.Desc(Bacon, "when", patterns), function(sink) {
	      var cannotMatch, cannotSync, ends, match, nonFlattened, part, triggers;
	      triggers = [];
	      ends = false;
	      match = function(p) {
	        var l, len3, ref1;
	        ref1 = p.ixs;
	        for (l = 0, len3 = ref1.length; l < len3; l++) {
	          i = ref1[l];
	          if (!sources[i.index].hasAtLeast(i.count)) {
	            return false;
	          }
	        }
	        return true;
	      };
	      cannotSync = function(source) {
	        return !source.sync || source.ended;
	      };
	      cannotMatch = function(p) {
	        var l, len3, ref1;
	        ref1 = p.ixs;
	        for (l = 0, len3 = ref1.length; l < len3; l++) {
	          i = ref1[l];
	          if (!sources[i.index].mayHave(i.count)) {
	            return true;
	          }
	        }
	      };
	      nonFlattened = function(trigger) {
	        return !trigger.source.flatten;
	      };
	      part = function(source) {
	        return function(unsubAll) {
	          var flush, flushLater, flushWhileTriggers;
	          flushLater = function() {
	            return UpdateBarrier.whenDoneWith(resultStream, flush);
	          };
	          flushWhileTriggers = function() {
	            var events, l, len3, p, reply, trigger;
	            if (triggers.length > 0) {
	              reply = Bacon.more;
	              trigger = triggers.pop();
	              for (l = 0, len3 = pats.length; l < len3; l++) {
	                p = pats[l];
	                if (match(p)) {
	                  events = (function() {
	                    var len4, m, ref1, results;
	                    ref1 = p.ixs;
	                    results = [];
	                    for (m = 0, len4 = ref1.length; m < len4; m++) {
	                      i = ref1[m];
	                      results.push(sources[i.index].consume());
	                    }
	                    return results;
	                  })();
	                  reply = sink(trigger.e.apply(function() {
	                    var event, values;
	                    values = (function() {
	                      var len4, m, results;
	                      results = [];
	                      for (m = 0, len4 = events.length; m < len4; m++) {
	                        event = events[m];
	                        results.push(event.value());
	                      }
	                      return results;
	                    })();
	                    return p.f.apply(p, values);
	                  }));
	                  if (triggers.length) {
	                    triggers = _.filter(nonFlattened, triggers);
	                  }
	                  if (reply === Bacon.noMore) {
	                    return reply;
	                  } else {
	                    return flushWhileTriggers();
	                  }
	                }
	              }
	            } else {
	              return Bacon.more;
	            }
	          };
	          flush = function() {
	            var reply;
	            reply = flushWhileTriggers();
	            if (ends) {
	              if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
	                reply = Bacon.noMore;
	                sink(endEvent());
	              }
	            }
	            if (reply === Bacon.noMore) {
	              unsubAll();
	            }
	            return reply;
	          };
	          return source.subscribe(function(e) {
	            var reply;
	            if (e.isEnd()) {
	              ends = true;
	              source.markEnded();
	              flushLater();
	            } else if (e.isError()) {
	              reply = sink(e);
	            } else {
	              source.push(e);
	              if (source.sync) {
	                triggers.push({
	                  source: source,
	                  e: e
	                });
	                if (needsBarrier || UpdateBarrier.hasWaiters()) {
	                  flushLater();
	                } else {
	                  flush();
	                }
	              }
	            }
	            if (reply === Bacon.noMore) {
	              unsubAll();
	            }
	            return reply || Bacon.more;
	          });
	        };
	      };
	      return new Bacon.CompositeUnsubscribe((function() {
	        var l, len3, results;
	        results = [];
	        for (l = 0, len3 = sources.length; l < len3; l++) {
	          s = sources[l];
	          results.push(part(s));
	        }
	        return results;
	      })()).unsubscribe;
	    });
	  };
	
	  containsDuplicateDeps = function(observables, state) {
	    var checkObservable;
	    if (state == null) {
	      state = [];
	    }
	    checkObservable = function(obs) {
	      var deps;
	      if (_.contains(state, obs)) {
	        return true;
	      } else {
	        deps = obs.internalDeps();
	        if (deps.length) {
	          state.push(obs);
	          return _.any(deps, checkObservable);
	        } else {
	          state.push(obs);
	          return false;
	        }
	      }
	    };
	    return _.any(observables, checkObservable);
	  };
	
	  constantToFunction = function(f) {
	    if (_.isFunction(f)) {
	      return f;
	    } else {
	      return _.always(f);
	    }
	  };
	
	  Bacon.groupSimultaneous = function() {
	    var s, sources, streams;
	    streams = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (streams.length === 1 && isArray(streams[0])) {
	      streams = streams[0];
	    }
	    sources = (function() {
	      var j, len1, results;
	      results = [];
	      for (j = 0, len1 = streams.length; j < len1; j++) {
	        s = streams[j];
	        results.push(new BufferingSource(s));
	      }
	      return results;
	    })();
	    return withDesc(new Bacon.Desc(Bacon, "groupSimultaneous", streams), Bacon.when(sources, (function() {
	      var xs;
	      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return xs;
	    })));
	  };
	
	  PropertyDispatcher = (function(superClass) {
	    extend(PropertyDispatcher, superClass);
	
	    function PropertyDispatcher(property1, subscribe, handleEvent) {
	      this.property = property1;
	      this.subscribe = bind(this.subscribe, this);
	      PropertyDispatcher.__super__.constructor.call(this, subscribe, handleEvent);
	      this.current = None;
	      this.currentValueRootId = void 0;
	      this.propertyEnded = false;
	    }
	
	    PropertyDispatcher.prototype.push = function(event) {
	      if (event.isEnd()) {
	        this.propertyEnded = true;
	      }
	      if (event.hasValue()) {
	        this.current = new Some(event);
	        this.currentValueRootId = UpdateBarrier.currentEventId();
	      }
	      return PropertyDispatcher.__super__.push.call(this, event);
	    };
	
	    PropertyDispatcher.prototype.maybeSubSource = function(sink, reply) {
	      if (reply === Bacon.noMore) {
	        return nop;
	      } else if (this.propertyEnded) {
	        sink(endEvent());
	        return nop;
	      } else {
	        return Dispatcher.prototype.subscribe.call(this, sink);
	      }
	    };
	
	    PropertyDispatcher.prototype.subscribe = function(sink) {
	      var dispatchingId, initSent, reply, valId;
	      initSent = false;
	      reply = Bacon.more;
	      if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
	        dispatchingId = UpdateBarrier.currentEventId();
	        valId = this.currentValueRootId;
	        if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
	          UpdateBarrier.whenDoneWith(this.property, (function(_this) {
	            return function() {
	              if (_this.currentValueRootId === valId) {
	                return sink(initialEvent(_this.current.get().value()));
	              }
	            };
	          })(this));
	          return this.maybeSubSource(sink, reply);
	        } else {
	          UpdateBarrier.inTransaction(void 0, this, (function() {
	            return reply = sink(initialEvent(this.current.get().value()));
	          }), []);
	          return this.maybeSubSource(sink, reply);
	        }
	      } else {
	        return this.maybeSubSource(sink, reply);
	      }
	    };
	
	    return PropertyDispatcher;
	
	  })(Dispatcher);
	
	  Property = (function(superClass) {
	    extend(Property, superClass);
	
	    function Property(desc, subscribe, handler) {
	      Property.__super__.constructor.call(this, desc);
	      assertFunction(subscribe);
	      this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
	      registerObs(this);
	    }
	
	    Property.prototype.changes = function() {
	      return new EventStream(new Bacon.Desc(this, "changes", []), (function(_this) {
	        return function(sink) {
	          return _this.dispatcher.subscribe(function(event) {
	            if (!event.isInitial()) {
	              return sink(event);
	            }
	          });
	        };
	      })(this));
	    };
	
	    Property.prototype.withHandler = function(handler) {
	      return new Property(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
	    };
	
	    Property.prototype.toProperty = function() {
	      assertNoArguments(arguments);
	      return this;
	    };
	
	    Property.prototype.toEventStream = function() {
	      return new EventStream(new Bacon.Desc(this, "toEventStream", []), (function(_this) {
	        return function(sink) {
	          return _this.dispatcher.subscribe(function(event) {
	            if (event.isInitial()) {
	              event = event.toNext();
	            }
	            return sink(event);
	          });
	        };
	      })(this));
	    };
	
	    return Property;
	
	  })(Observable);
	
	  Bacon.Property = Property;
	
	  Bacon.constant = function(value) {
	    return new Property(new Bacon.Desc(Bacon, "constant", [value]), function(sink) {
	      sink(initialEvent(value));
	      sink(endEvent());
	      return nop;
	    });
	  };
	
	  Bacon.fromBinder = function(binder, eventTransformer) {
	    if (eventTransformer == null) {
	      eventTransformer = _.id;
	    }
	    return new EventStream(new Bacon.Desc(Bacon, "fromBinder", [binder, eventTransformer]), function(sink) {
	      var shouldUnbind, unbind, unbinder, unbound;
	      unbound = false;
	      shouldUnbind = false;
	      unbind = function() {
	        if (!unbound) {
	          if (typeof unbinder !== "undefined" && unbinder !== null) {
	            unbinder();
	            return unbound = true;
	          } else {
	            return shouldUnbind = true;
	          }
	        }
	      };
	      unbinder = binder(function() {
	        var args, event, j, len1, reply, value;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        value = eventTransformer.apply(this, args);
	        if (!(isArray(value) && _.last(value) instanceof Event)) {
	          value = [value];
	        }
	        reply = Bacon.more;
	        for (j = 0, len1 = value.length; j < len1; j++) {
	          event = value[j];
	          reply = sink(event = toEvent(event));
	          if (reply === Bacon.noMore || event.isEnd()) {
	            unbind();
	            return reply;
	          }
	        }
	        return reply;
	      });
	      if (shouldUnbind) {
	        unbind();
	      }
	      return unbind;
	    });
	  };
	
	  eventMethods = [["addEventListener", "removeEventListener"], ["addListener", "removeListener"], ["on", "off"], ["bind", "unbind"]];
	
	  findHandlerMethods = function(target) {
	    var j, len1, methodPair, pair;
	    for (j = 0, len1 = eventMethods.length; j < len1; j++) {
	      pair = eventMethods[j];
	      methodPair = [target[pair[0]], target[pair[1]]];
	      if (methodPair[0] && methodPair[1]) {
	        return methodPair;
	      }
	    }
	    throw new Error("No suitable event methods in " + target);
	  };
	
	  Bacon.fromEventTarget = function(target, eventName, eventTransformer) {
	    var ref, sub, unsub;
	    ref = findHandlerMethods(target), sub = ref[0], unsub = ref[1];
	    return withDesc(new Bacon.Desc(Bacon, "fromEvent", [target, eventName]), Bacon.fromBinder(function(handler) {
	      sub.call(target, eventName, handler);
	      return function() {
	        return unsub.call(target, eventName, handler);
	      };
	    }, eventTransformer));
	  };
	
	  Bacon.fromEvent = Bacon.fromEventTarget;
	
	  Bacon.Observable.prototype.map = function() {
	    var args, p;
	    p = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return convertArgsToFunction(this, p, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function(event) {
	        return this.push(event.fmap(f));
	      }));
	    });
	  };
	
	  argumentsToObservables = function(args) {
	    if (isArray(args[0])) {
	      return args[0];
	    } else {
	      return Array.prototype.slice.call(args);
	    }
	  };
	
	  argumentsToObservablesAndFunction = function(args) {
	    if (_.isFunction(args[0])) {
	      return [argumentsToObservables(Array.prototype.slice.call(args, 1)), args[0]];
	    } else {
	      return [argumentsToObservables(Array.prototype.slice.call(args, 0, args.length - 1)), _.last(args)];
	    }
	  };
	
	  Bacon.combineAsArray = function() {
	    var index, j, len1, s, sources, stream, streams;
	    streams = argumentsToObservables(arguments);
	    for (index = j = 0, len1 = streams.length; j < len1; index = ++j) {
	      stream = streams[index];
	      if (!(isObservable(stream))) {
	        streams[index] = Bacon.constant(stream);
	      }
	    }
	    if (streams.length) {
	      sources = (function() {
	        var k, len2, results;
	        results = [];
	        for (k = 0, len2 = streams.length; k < len2; k++) {
	          s = streams[k];
	          results.push(new Source(s, true));
	        }
	        return results;
	      })();
	      return withDesc(new Bacon.Desc(Bacon, "combineAsArray", streams), Bacon.when(sources, (function() {
	        var xs;
	        xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        return xs;
	      })).toProperty());
	    } else {
	      return Bacon.constant([]);
	    }
	  };
	
	  Bacon.onValues = function() {
	    var f, j, streams;
	    streams = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), f = arguments[j++];
	    return Bacon.combineAsArray(streams).onValues(f);
	  };
	
	  Bacon.combineWith = function() {
	    var f, ref, streams;
	    ref = argumentsToObservablesAndFunction(arguments), streams = ref[0], f = ref[1];
	    return withDesc(new Bacon.Desc(Bacon, "combineWith", [f].concat(slice.call(streams))), Bacon.combineAsArray(streams).map(function(values) {
	      return f.apply(null, values);
	    }));
	  };
	
	  Bacon.Observable.prototype.combine = function(other, f) {
	    var combinator;
	    combinator = toCombinator(f);
	    return withDesc(new Bacon.Desc(this, "combine", [other, f]), Bacon.combineAsArray(this, other).map(function(values) {
	      return combinator(values[0], values[1]);
	    }));
	  };
	
	  Bacon.Observable.prototype.withStateMachine = function(initState, f) {
	    var state;
	    state = initState;
	    return withDesc(new Bacon.Desc(this, "withStateMachine", [initState, f]), this.withHandler(function(event) {
	      var fromF, j, len1, newState, output, outputs, reply;
	      fromF = f(state, event);
	      newState = fromF[0], outputs = fromF[1];
	      state = newState;
	      reply = Bacon.more;
	      for (j = 0, len1 = outputs.length; j < len1; j++) {
	        output = outputs[j];
	        reply = this.push(output);
	        if (reply === Bacon.noMore) {
	          return reply;
	        }
	      }
	      return reply;
	    }));
	  };
	
	  Bacon.Observable.prototype.skipDuplicates = function(isEqual) {
	    if (isEqual == null) {
	      isEqual = function(a, b) {
	        return a === b;
	      };
	    }
	    return withDesc(new Bacon.Desc(this, "skipDuplicates", []), this.withStateMachine(None, function(prev, event) {
	      if (!event.hasValue()) {
	        return [prev, [event]];
	      } else if (event.isInitial() || prev === None || !isEqual(prev.get(), event.value())) {
	        return [new Some(event.value()), [event]];
	      } else {
	        return [prev, []];
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.awaiting = function(other) {
	    return withDesc(new Bacon.Desc(this, "awaiting", [other]), Bacon.groupSimultaneous(this, other).map(function(arg) {
	      var myValues, otherValues;
	      myValues = arg[0], otherValues = arg[1];
	      return otherValues.length === 0;
	    }).toProperty(false).skipDuplicates());
	  };
	
	  Bacon.Observable.prototype.not = function() {
	    return withDesc(new Bacon.Desc(this, "not", []), this.map(function(x) {
	      return !x;
	    }));
	  };
	
	  Bacon.Property.prototype.and = function(other) {
	    return withDesc(new Bacon.Desc(this, "and", [other]), this.combine(other, function(x, y) {
	      return x && y;
	    }));
	  };
	
	  Bacon.Property.prototype.or = function(other) {
	    return withDesc(new Bacon.Desc(this, "or", [other]), this.combine(other, function(x, y) {
	      return x || y;
	    }));
	  };
	
	  Bacon.scheduler = {
	    setTimeout: function(f, d) {
	      return setTimeout(f, d);
	    },
	    setInterval: function(f, i) {
	      return setInterval(f, i);
	    },
	    clearInterval: function(id) {
	      return clearInterval(id);
	    },
	    clearTimeout: function(id) {
	      return clearTimeout(id);
	    },
	    now: function() {
	      return new Date().getTime();
	    }
	  };
	
	  Bacon.EventStream.prototype.bufferWithTime = function(delay) {
	    return withDesc(new Bacon.Desc(this, "bufferWithTime", [delay]), this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
	  };
	
	  Bacon.EventStream.prototype.bufferWithCount = function(count) {
	    return withDesc(new Bacon.Desc(this, "bufferWithCount", [count]), this.bufferWithTimeOrCount(void 0, count));
	  };
	
	  Bacon.EventStream.prototype.bufferWithTimeOrCount = function(delay, count) {
	    var flushOrSchedule;
	    flushOrSchedule = function(buffer) {
	      if (buffer.values.length === count) {
	        return buffer.flush();
	      } else if (delay !== void 0) {
	        return buffer.schedule();
	      }
	    };
	    return withDesc(new Bacon.Desc(this, "bufferWithTimeOrCount", [delay, count]), this.buffer(delay, flushOrSchedule, flushOrSchedule));
	  };
	
	  Bacon.EventStream.prototype.buffer = function(delay, onInput, onFlush) {
	    var buffer, delayMs, reply;
	    if (onInput == null) {
	      onInput = nop;
	    }
	    if (onFlush == null) {
	      onFlush = nop;
	    }
	    buffer = {
	      scheduled: null,
	      end: void 0,
	      values: [],
	      flush: function() {
	        var reply, valuesToPush;
	        if (this.scheduled) {
	          Bacon.scheduler.clearTimeout(this.scheduled);
	          this.scheduled = null;
	        }
	        if (this.values.length > 0) {
	          valuesToPush = this.values;
	          this.values = [];
	          reply = this.push(nextEvent(valuesToPush));
	          if (this.end != null) {
	            return this.push(this.end);
	          } else if (reply !== Bacon.noMore) {
	            return onFlush(this);
	          }
	        } else {
	          if (this.end != null) {
	            return this.push(this.end);
	          }
	        }
	      },
	      schedule: function() {
	        if (!this.scheduled) {
	          return this.scheduled = delay((function(_this) {
	            return function() {
	              return _this.flush();
	            };
	          })(this));
	        }
	      }
	    };
	    reply = Bacon.more;
	    if (!_.isFunction(delay)) {
	      delayMs = delay;
	      delay = function(f) {
	        return Bacon.scheduler.setTimeout(f, delayMs);
	      };
	    }
	    return withDesc(new Bacon.Desc(this, "buffer", []), this.withHandler(function(event) {
	      buffer.push = (function(_this) {
	        return function(event) {
	          return _this.push(event);
	        };
	      })(this);
	      if (event.isError()) {
	        reply = this.push(event);
	      } else if (event.isEnd()) {
	        buffer.end = event;
	        if (!buffer.scheduled) {
	          buffer.flush();
	        }
	      } else {
	        buffer.values.push(event.value());
	        onInput(buffer);
	      }
	      return reply;
	    }));
	  };
	
	  Bacon.Observable.prototype.filter = function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    assertObservableIsProperty(f);
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "filter", [f]), this.withHandler(function(event) {
	        if (event.filter(f)) {
	          return this.push(event);
	        } else {
	          return Bacon.more;
	        }
	      }));
	    });
	  };
	
	  Bacon.once = function(value) {
	    return new EventStream(new Desc(Bacon, "once", [value]), function(sink) {
	      sink(toEvent(value));
	      sink(endEvent());
	      return nop;
	    });
	  };
	
	  Bacon.EventStream.prototype.concat = function(right) {
	    var left;
	    left = this;
	    return new EventStream(new Bacon.Desc(left, "concat", [right]), function(sink) {
	      var unsubLeft, unsubRight;
	      unsubRight = nop;
	      unsubLeft = left.dispatcher.subscribe(function(e) {
	        if (e.isEnd()) {
	          return unsubRight = right.dispatcher.subscribe(sink);
	        } else {
	          return sink(e);
	        }
	      });
	      return function() {
	        unsubLeft();
	        return unsubRight();
	      };
	    });
	  };
	
	  Bacon.Observable.prototype.flatMap = function() {
	    return flatMap_(this, makeSpawner(arguments));
	  };
	
	  Bacon.Observable.prototype.flatMapFirst = function() {
	    return flatMap_(this, makeSpawner(arguments), true);
	  };
	
	  flatMap_ = function(root, f, firstOnly, limit) {
	    var childDeps, result, rootDep;
	    rootDep = [root];
	    childDeps = [];
	    result = new EventStream(new Bacon.Desc(root, "flatMap" + (firstOnly ? "First" : ""), [f]), function(sink) {
	      var checkEnd, checkQueue, composite, queue, spawn;
	      composite = new CompositeUnsubscribe();
	      queue = [];
	      spawn = function(event) {
	        var child;
	        child = makeObservable(f(event.value()));
	        childDeps.push(child);
	        return composite.add(function(unsubAll, unsubMe) {
	          return child.dispatcher.subscribe(function(event) {
	            var reply;
	            if (event.isEnd()) {
	              _.remove(child, childDeps);
	              checkQueue();
	              checkEnd(unsubMe);
	              return Bacon.noMore;
	            } else {
	              if (event instanceof Initial) {
	                event = event.toNext();
	              }
	              reply = sink(event);
	              if (reply === Bacon.noMore) {
	                unsubAll();
	              }
	              return reply;
	            }
	          });
	        });
	      };
	      checkQueue = function() {
	        var event;
	        event = queue.shift();
	        if (event) {
	          return spawn(event);
	        }
	      };
	      checkEnd = function(unsub) {
	        unsub();
	        if (composite.empty()) {
	          return sink(endEvent());
	        }
	      };
	      composite.add(function(__, unsubRoot) {
	        return root.dispatcher.subscribe(function(event) {
	          if (event.isEnd()) {
	            return checkEnd(unsubRoot);
	          } else if (event.isError()) {
	            return sink(event);
	          } else if (firstOnly && composite.count() > 1) {
	            return Bacon.more;
	          } else {
	            if (composite.unsubscribed) {
	              return Bacon.noMore;
	            }
	            if (limit && composite.count() > limit) {
	              return queue.push(event);
	            } else {
	              return spawn(event);
	            }
	          }
	        });
	      });
	      return composite.unsubscribe;
	    });
	    result.internalDeps = function() {
	      if (childDeps.length) {
	        return rootDep.concat(childDeps);
	      } else {
	        return rootDep;
	      }
	    };
	    return result;
	  };
	
	  makeSpawner = function(args) {
	    if (args.length === 1 && isObservable(args[0])) {
	      return _.always(args[0]);
	    } else {
	      return makeFunctionArgs(args);
	    }
	  };
	
	  makeObservable = function(x) {
	    if (isObservable(x)) {
	      return x;
	    } else {
	      return Bacon.once(x);
	    }
	  };
	
	  Bacon.Observable.prototype.flatMapWithConcurrencyLimit = function() {
	    var args, limit;
	    limit = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return withDesc(new Bacon.Desc(this, "flatMapWithConcurrencyLimit", [limit].concat(slice.call(args))), flatMap_(this, makeSpawner(args), false, limit));
	  };
	
	  Bacon.Observable.prototype.flatMapConcat = function() {
	    return withDesc(new Bacon.Desc(this, "flatMapConcat", Array.prototype.slice.call(arguments, 0)), this.flatMapWithConcurrencyLimit.apply(this, [1].concat(slice.call(arguments))));
	  };
	
	  Bacon.later = function(delay, value) {
	    return withDesc(new Bacon.Desc(Bacon, "later", [delay, value]), Bacon.fromBinder(function(sink) {
	      var id, sender;
	      sender = function() {
	        return sink([value, endEvent()]);
	      };
	      id = Bacon.scheduler.setTimeout(sender, delay);
	      return function() {
	        return Bacon.scheduler.clearTimeout(id);
	      };
	    }));
	  };
	
	  Bacon.Observable.prototype.bufferingThrottle = function(minimumInterval) {
	    return withDesc(new Bacon.Desc(this, "bufferingThrottle", [minimumInterval]), this.flatMapConcat(function(x) {
	      return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
	    }));
	  };
	
	  Bacon.Property.prototype.bufferingThrottle = function() {
	    return Bacon.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
	  };
	
	  Bus = (function(superClass) {
	    extend(Bus, superClass);
	
	    function Bus() {
	      this.guardedSink = bind(this.guardedSink, this);
	      this.subscribeAll = bind(this.subscribeAll, this);
	      this.unsubAll = bind(this.unsubAll, this);
	      this.sink = void 0;
	      this.subscriptions = [];
	      this.ended = false;
	      Bus.__super__.constructor.call(this, new Bacon.Desc(Bacon, "Bus", []), this.subscribeAll);
	    }
	
	    Bus.prototype.unsubAll = function() {
	      var j, len1, ref, sub;
	      ref = this.subscriptions;
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        sub = ref[j];
	        if (typeof sub.unsub === "function") {
	          sub.unsub();
	        }
	      }
	      return void 0;
	    };
	
	    Bus.prototype.subscribeAll = function(newSink) {
	      var j, len1, ref, subscription;
	      if (this.ended) {
	        newSink(endEvent());
	      } else {
	        this.sink = newSink;
	        ref = cloneArray(this.subscriptions);
	        for (j = 0, len1 = ref.length; j < len1; j++) {
	          subscription = ref[j];
	          this.subscribeInput(subscription);
	        }
	      }
	      return this.unsubAll;
	    };
	
	    Bus.prototype.guardedSink = function(input) {
	      return (function(_this) {
	        return function(event) {
	          if (event.isEnd()) {
	            _this.unsubscribeInput(input);
	            return Bacon.noMore;
	          } else {
	            return _this.sink(event);
	          }
	        };
	      })(this);
	    };
	
	    Bus.prototype.subscribeInput = function(subscription) {
	      return subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
	    };
	
	    Bus.prototype.unsubscribeInput = function(input) {
	      var i, j, len1, ref, sub;
	      ref = this.subscriptions;
	      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	        sub = ref[i];
	        if (sub.input === input) {
	          if (typeof sub.unsub === "function") {
	            sub.unsub();
	          }
	          this.subscriptions.splice(i, 1);
	          return;
	        }
	      }
	    };
	
	    Bus.prototype.plug = function(input) {
	      var sub;
	      assertObservable(input);
	      if (this.ended) {
	        return;
	      }
	      sub = {
	        input: input
	      };
	      this.subscriptions.push(sub);
	      if ((this.sink != null)) {
	        this.subscribeInput(sub);
	      }
	      return (function(_this) {
	        return function() {
	          return _this.unsubscribeInput(input);
	        };
	      })(this);
	    };
	
	    Bus.prototype.end = function() {
	      this.ended = true;
	      this.unsubAll();
	      return typeof this.sink === "function" ? this.sink(endEvent()) : void 0;
	    };
	
	    Bus.prototype.push = function(value) {
	      if (!this.ended) {
	        return typeof this.sink === "function" ? this.sink(nextEvent(value)) : void 0;
	      }
	    };
	
	    Bus.prototype.error = function(error) {
	      return typeof this.sink === "function" ? this.sink(new Error(error)) : void 0;
	    };
	
	    return Bus;
	
	  })(EventStream);
	
	  Bacon.Bus = Bus;
	
	  liftCallback = function(desc, wrapped) {
	    return withMethodCallSupport(function() {
	      var args, f, stream;
	      f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      stream = partiallyApplied(wrapped, [
	        function(values, callback) {
	          return f.apply(null, slice.call(values).concat([callback]));
	        }
	      ]);
	      return withDesc(new Bacon.Desc(Bacon, desc, [f].concat(slice.call(args))), Bacon.combineAsArray(args).flatMap(stream));
	    });
	  };
	
	  Bacon.fromCallback = liftCallback("fromCallback", function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return Bacon.fromBinder(function(handler) {
	      makeFunction(f, args)(handler);
	      return nop;
	    }, (function(value) {
	      return [value, endEvent()];
	    }));
	  });
	
	  Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return Bacon.fromBinder(function(handler) {
	      makeFunction(f, args)(handler);
	      return nop;
	    }, function(error, value) {
	      if (error) {
	        return [new Error(error), endEvent()];
	      }
	      return [value, endEvent()];
	    });
	  });
	
	  Bacon.combineTemplate = function(template) {
	    var applyStreamValue, combinator, compile, compileTemplate, constantValue, current, funcs, mkContext, pushContext, setValue, streams;
	    funcs = [];
	    streams = [];
	    current = function(ctxStack) {
	      return ctxStack[ctxStack.length - 1];
	    };
	    setValue = function(ctxStack, key, value) {
	      return current(ctxStack)[key] = value;
	    };
	    applyStreamValue = function(key, index) {
	      return function(ctxStack, values) {
	        return setValue(ctxStack, key, values[index]);
	      };
	    };
	    constantValue = function(key, value) {
	      return function(ctxStack) {
	        return setValue(ctxStack, key, value);
	      };
	    };
	    mkContext = function(template) {
	      if (isArray(template)) {
	        return [];
	      } else {
	        return {};
	      }
	    };
	    pushContext = function(key, value) {
	      return function(ctxStack) {
	        var newContext;
	        newContext = mkContext(value);
	        setValue(ctxStack, key, newContext);
	        return ctxStack.push(newContext);
	      };
	    };
	    compile = function(key, value) {
	      var popContext;
	      if (isObservable(value)) {
	        streams.push(value);
	        return funcs.push(applyStreamValue(key, streams.length - 1));
	      } else if (value === Object(value) && typeof value !== "function" && !(value instanceof RegExp) && !(value instanceof Date)) {
	        popContext = function(ctxStack) {
	          return ctxStack.pop();
	        };
	        funcs.push(pushContext(key, value));
	        compileTemplate(value);
	        return funcs.push(popContext);
	      } else {
	        return funcs.push(constantValue(key, value));
	      }
	    };
	    compileTemplate = function(template) {
	      return _.each(template, compile);
	    };
	    compileTemplate(template);
	    combinator = function(values) {
	      var ctxStack, f, j, len1, rootContext;
	      rootContext = mkContext(template);
	      ctxStack = [rootContext];
	      for (j = 0, len1 = funcs.length; j < len1; j++) {
	        f = funcs[j];
	        f(ctxStack, values);
	      }
	      return rootContext;
	    };
	    return withDesc(new Bacon.Desc(Bacon, "combineTemplate", [template]), Bacon.combineAsArray(streams).map(combinator));
	  };
	
	  addPropertyInitValueToStream = function(property, stream) {
	    var justInitValue;
	    justInitValue = new EventStream(describe(property, "justInitValue"), function(sink) {
	      var unsub, value;
	      value = void 0;
	      unsub = property.dispatcher.subscribe(function(event) {
	        if (!event.isEnd()) {
	          value = event;
	        }
	        return Bacon.noMore;
	      });
	      UpdateBarrier.whenDoneWith(justInitValue, function() {
	        if (value != null) {
	          sink(value);
	        }
	        return sink(endEvent());
	      });
	      return unsub;
	    });
	    return justInitValue.concat(stream).toProperty();
	  };
	
	  Bacon.Observable.prototype.mapEnd = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "mapEnd", [f]), this.withHandler(function(event) {
	      if (event.isEnd()) {
	        this.push(nextEvent(f(event)));
	        this.push(endEvent());
	        return Bacon.noMore;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.skipErrors = function() {
	    return withDesc(new Bacon.Desc(this, "skipErrors", []), this.withHandler(function(event) {
	      if (event.isError()) {
	        return Bacon.more;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	
	  Bacon.EventStream.prototype.takeUntil = function(stopper) {
	    var endMarker;
	    endMarker = {};
	    return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function(event) {
	      var data, j, len1, ref, reply, value;
	      if (!event.hasValue()) {
	        return this.push(event);
	      } else {
	        ref = event.value(), data = ref[0], stopper = ref[1];
	        if (stopper.length) {
	          return this.push(endEvent());
	        } else {
	          reply = Bacon.more;
	          for (j = 0, len1 = data.length; j < len1; j++) {
	            value = data[j];
	            if (value === endMarker) {
	              reply = this.push(endEvent());
	            } else {
	              reply = this.push(nextEvent(value));
	            }
	          }
	          return reply;
	        }
	      }
	    }));
	  };
	
	  Bacon.Property.prototype.takeUntil = function(stopper) {
	    var changes;
	    changes = this.changes().takeUntil(stopper);
	    return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), addPropertyInitValueToStream(this, changes));
	  };
	
	  Bacon.Observable.prototype.flatMapLatest = function() {
	    var f, stream;
	    f = makeSpawner(arguments);
	    stream = this.toEventStream();
	    return withDesc(new Bacon.Desc(this, "flatMapLatest", [f]), stream.flatMap(function(value) {
	      return makeObservable(f(value)).takeUntil(stream);
	    }));
	  };
	
	  Bacon.Property.prototype.delayChanges = function(desc, f) {
	    return withDesc(desc, addPropertyInitValueToStream(this, f(this.changes())));
	  };
	
	  Bacon.EventStream.prototype.delay = function(delay) {
	    return withDesc(new Bacon.Desc(this, "delay", [delay]), this.flatMap(function(value) {
	      return Bacon.later(delay, value);
	    }));
	  };
	
	  Bacon.Property.prototype.delay = function(delay) {
	    return this.delayChanges(new Bacon.Desc(this, "delay", [delay]), function(changes) {
	      return changes.delay(delay);
	    });
	  };
	
	  Bacon.EventStream.prototype.debounce = function(delay) {
	    return withDesc(new Bacon.Desc(this, "debounce", [delay]), this.flatMapLatest(function(value) {
	      return Bacon.later(delay, value);
	    }));
	  };
	
	  Bacon.Property.prototype.debounce = function(delay) {
	    return this.delayChanges(new Bacon.Desc(this, "debounce", [delay]), function(changes) {
	      return changes.debounce(delay);
	    });
	  };
	
	  Bacon.EventStream.prototype.debounceImmediate = function(delay) {
	    return withDesc(new Bacon.Desc(this, "debounceImmediate", [delay]), this.flatMapFirst(function(value) {
	      return Bacon.once(value).concat(Bacon.later(delay).filter(false));
	    }));
	  };
	
	  Bacon.Observable.prototype.decode = function(cases) {
	    return withDesc(new Bacon.Desc(this, "decode", [cases]), this.combine(Bacon.combineTemplate(cases), function(key, values) {
	      return values[key];
	    }));
	  };
	
	  Bacon.Observable.prototype.scan = function(seed, f) {
	    var acc, initHandled, resultProperty, subscribe;
	    f = toCombinator(f);
	    acc = toOption(seed);
	    initHandled = false;
	    subscribe = (function(_this) {
	      return function(sink) {
	        var initSent, reply, sendInit, unsub;
	        initSent = false;
	        unsub = nop;
	        reply = Bacon.more;
	        sendInit = function() {
	          if (!initSent) {
	            return acc.forEach(function(value) {
	              initSent = initHandled = true;
	              reply = sink(new Initial(function() {
	                return value;
	              }));
	              if (reply === Bacon.noMore) {
	                unsub();
	                return unsub = nop;
	              }
	            });
	          }
	        };
	        unsub = _this.dispatcher.subscribe(function(event) {
	          var next, prev;
	          if (event.hasValue()) {
	            if (initHandled && event.isInitial()) {
	              return Bacon.more;
	            } else {
	              if (!event.isInitial()) {
	                sendInit();
	              }
	              initSent = initHandled = true;
	              prev = acc.getOrElse(void 0);
	              next = f(prev, event.value());
	              acc = new Some(next);
	              return sink(event.apply(function() {
	                return next;
	              }));
	            }
	          } else {
	            if (event.isEnd()) {
	              reply = sendInit();
	            }
	            if (reply !== Bacon.noMore) {
	              return sink(event);
	            }
	          }
	        });
	        UpdateBarrier.whenDoneWith(resultProperty, sendInit);
	        return unsub;
	      };
	    })(this);
	    return resultProperty = new Property(new Bacon.Desc(this, "scan", [seed, f]), subscribe);
	  };
	
	  Bacon.Observable.prototype.diff = function(start, f) {
	    f = toCombinator(f);
	    return withDesc(new Bacon.Desc(this, "diff", [start, f]), this.scan([start], function(prevTuple, next) {
	      return [next, f(prevTuple[0], next)];
	    }).filter(function(tuple) {
	      return tuple.length === 2;
	    }).map(function(tuple) {
	      return tuple[1];
	    }));
	  };
	
	  Bacon.Observable.prototype.doAction = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "doAction", [f]), this.withHandler(function(event) {
	      if (event.hasValue()) {
	        f(event.value());
	      }
	      return this.push(event);
	    }));
	  };
	
	  Bacon.Observable.prototype.doError = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "doError", [f]), this.withHandler(function(event) {
	      if (event.isError()) {
	        f(event.error);
	      }
	      return this.push(event);
	    }));
	  };
	
	  Bacon.Observable.prototype.doLog = function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return withDesc(new Bacon.Desc(this, "doLog", args), this.withHandler(function(event) {
	      if (typeof console !== "undefined" && console !== null) {
	        if (typeof console.log === "function") {
	          console.log.apply(console, slice.call(args).concat([event.log()]));
	        }
	      }
	      return this.push(event);
	    }));
	  };
	
	  Bacon.Observable.prototype.endOnError = function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (f == null) {
	      f = true;
	    }
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "endOnError", []), this.withHandler(function(event) {
	        if (event.isError() && f(event.error)) {
	          this.push(event);
	          return this.push(endEvent());
	        } else {
	          return this.push(event);
	        }
	      }));
	    });
	  };
	
	  Observable.prototype.errors = function() {
	    return withDesc(new Bacon.Desc(this, "errors", []), this.filter(function() {
	      return false;
	    }));
	  };
	
	  valueAndEnd = (function(value) {
	    return [value, endEvent()];
	  });
	
	  Bacon.fromPromise = function(promise, abort, eventTransformer) {
	    if (eventTransformer == null) {
	      eventTransformer = valueAndEnd;
	    }
	    return withDesc(new Bacon.Desc(Bacon, "fromPromise", [promise]), Bacon.fromBinder(function(handler) {
	      var ref;
	      if ((ref = promise.then(handler, function(e) {
	        return handler(new Error(e));
	      })) != null) {
	        if (typeof ref.done === "function") {
	          ref.done();
	        }
	      }
	      return function() {
	        if (abort) {
	          return typeof promise.abort === "function" ? promise.abort() : void 0;
	        }
	      };
	    }, eventTransformer));
	  };
	
	  Bacon.Observable.prototype.mapError = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "mapError", [f]), this.withHandler(function(event) {
	      if (event.isError()) {
	        return this.push(nextEvent(f(event.error)));
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.flatMapError = function(fn) {
	    return withDesc(new Bacon.Desc(this, "flatMapError", [fn]), this.mapError(function(err) {
	      return new Error(err);
	    }).flatMap(function(x) {
	      if (x instanceof Error) {
	        return fn(x.error);
	      } else {
	        return Bacon.once(x);
	      }
	    }));
	  };
	
	  Bacon.EventStream.prototype.sampledBy = function(sampler, combinator) {
	    return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), this.toProperty().sampledBy(sampler, combinator));
	  };
	
	  Bacon.Property.prototype.sampledBy = function(sampler, combinator) {
	    var lazy, result, samplerSource, stream, thisSource;
	    if (combinator != null) {
	      combinator = toCombinator(combinator);
	    } else {
	      lazy = true;
	      combinator = function(f) {
	        return f.value();
	      };
	    }
	    thisSource = new Source(this, false, lazy);
	    samplerSource = new Source(sampler, true, lazy);
	    stream = Bacon.when([thisSource, samplerSource], combinator);
	    result = sampler instanceof Property ? stream.toProperty() : stream;
	    return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), result);
	  };
	
	  Bacon.Property.prototype.sample = function(interval) {
	    return withDesc(new Bacon.Desc(this, "sample", [interval]), this.sampledBy(Bacon.interval(interval, {})));
	  };
	
	  Bacon.Observable.prototype.map = function() {
	    var args, p;
	    p = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (p instanceof Property) {
	      return p.sampledBy(this, former);
	    } else {
	      return convertArgsToFunction(this, p, args, function(f) {
	        return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function(event) {
	          return this.push(event.fmap(f));
	        }));
	      });
	    }
	  };
	
	  Bacon.Observable.prototype.fold = function(seed, f) {
	    return withDesc(new Bacon.Desc(this, "fold", [seed, f]), this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
	  };
	
	  Observable.prototype.reduce = Observable.prototype.fold;
	
	  Bacon.fromPoll = function(delay, poll) {
	    return withDesc(new Bacon.Desc(Bacon, "fromPoll", [delay, poll]), Bacon.fromBinder((function(handler) {
	      var id;
	      id = Bacon.scheduler.setInterval(handler, delay);
	      return function() {
	        return Bacon.scheduler.clearInterval(id);
	      };
	    }), poll));
	  };
	
	  Bacon.Observable.prototype.groupBy = function(keyF, limitF) {
	    var src, streams;
	    if (limitF == null) {
	      limitF = Bacon._.id;
	    }
	    streams = {};
	    src = this;
	    return src.filter(function(x) {
	      return !streams[keyF(x)];
	    }).map(function(x) {
	      var data, key, limited, similar;
	      key = keyF(x);
	      similar = src.filter(function(x) {
	        return keyF(x) === key;
	      });
	      data = Bacon.once(x).concat(similar);
	      limited = limitF(data, x).withHandler(function(event) {
	        this.push(event);
	        if (event.isEnd()) {
	          return delete streams[key];
	        }
	      });
	      return streams[key] = limited;
	    });
	  };
	
	  Bacon.fromArray = function(values) {
	    var i;
	    assertArray(values);
	    if (!values.length) {
	      return withDesc(new Bacon.Desc(Bacon, "fromArray", values), Bacon.never());
	    } else {
	      i = 0;
	      return new EventStream(new Bacon.Desc(Bacon, "fromArray", [values]), function(sink) {
	        var push, pushNeeded, pushing, reply, unsubd;
	        unsubd = false;
	        reply = Bacon.more;
	        pushing = false;
	        pushNeeded = false;
	        push = function() {
	          var value;
	          pushNeeded = true;
	          if (pushing) {
	            return;
	          }
	          pushing = true;
	          while (pushNeeded) {
	            pushNeeded = false;
	            if ((reply !== Bacon.noMore) && !unsubd) {
	              value = values[i++];
	              reply = sink(toEvent(value));
	              if (reply !== Bacon.noMore) {
	                if (i === values.length) {
	                  sink(endEvent());
	                } else {
	                  UpdateBarrier.afterTransaction(push);
	                }
	              }
	            }
	          }
	          return pushing = false;
	        };
	        push();
	        return function() {
	          return unsubd = true;
	        };
	      });
	    }
	  };
	
	  Bacon.EventStream.prototype.holdWhen = function(valve) {
	    var bufferedValues, onHold, src;
	    onHold = false;
	    bufferedValues = [];
	    src = this;
	    return new EventStream(new Bacon.Desc(this, "holdWhen", [valve]), function(sink) {
	      var composite, endIfBothEnded, subscribed;
	      composite = new CompositeUnsubscribe();
	      subscribed = false;
	      endIfBothEnded = function(unsub) {
	        if (typeof unsub === "function") {
	          unsub();
	        }
	        if (composite.empty() && subscribed) {
	          return sink(endEvent());
	        }
	      };
	      composite.add(function(unsubAll, unsubMe) {
	        return valve.subscribeInternal(function(event) {
	          var j, len1, results, toSend, value;
	          if (event.hasValue()) {
	            onHold = event.value();
	            if (!onHold) {
	              toSend = bufferedValues;
	              bufferedValues = [];
	              results = [];
	              for (j = 0, len1 = toSend.length; j < len1; j++) {
	                value = toSend[j];
	                results.push(sink(nextEvent(value)));
	              }
	              return results;
	            }
	          } else if (event.isEnd()) {
	            return endIfBothEnded(unsubMe);
	          } else {
	            return sink(event);
	          }
	        });
	      });
	      composite.add(function(unsubAll, unsubMe) {
	        return src.subscribeInternal(function(event) {
	          if (onHold && event.hasValue()) {
	            return bufferedValues.push(event.value());
	          } else if (event.isEnd() && bufferedValues.length) {
	            return endIfBothEnded(unsubMe);
	          } else {
	            return sink(event);
	          }
	        });
	      });
	      subscribed = true;
	      endIfBothEnded();
	      return composite.unsubscribe;
	    });
	  };
	
	  Bacon.interval = function(delay, value) {
	    if (value == null) {
	      value = {};
	    }
	    return withDesc(new Bacon.Desc(Bacon, "interval", [delay, value]), Bacon.fromPoll(delay, function() {
	      return nextEvent(value);
	    }));
	  };
	
	  Bacon.$ = {};
	
	  Bacon.$.asEventStream = function(eventName, selector, eventTransformer) {
	    var ref;
	    if (_.isFunction(selector)) {
	      ref = [selector, void 0], eventTransformer = ref[0], selector = ref[1];
	    }
	    return withDesc(new Bacon.Desc(this.selector || this, "asEventStream", [eventName]), Bacon.fromBinder((function(_this) {
	      return function(handler) {
	        _this.on(eventName, selector, handler);
	        return function() {
	          return _this.off(eventName, selector, handler);
	        };
	      };
	    })(this), eventTransformer));
	  };
	
	  if ((ref = typeof jQuery !== "undefined" && jQuery !== null ? jQuery : typeof Zepto !== "undefined" && Zepto !== null ? Zepto : void 0) != null) {
	    ref.fn.asEventStream = Bacon.$.asEventStream;
	  }
	
	  Bacon.Observable.prototype.log = function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    this.subscribe(function(event) {
	      return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log.apply(console, slice.call(args).concat([event.log()])) : void 0 : void 0;
	    });
	    return this;
	  };
	
	  Bacon.EventStream.prototype.merge = function(right) {
	    var left;
	    assertEventStream(right);
	    left = this;
	    return withDesc(new Bacon.Desc(left, "merge", [right]), Bacon.mergeAll(this, right));
	  };
	
	  Bacon.mergeAll = function() {
	    var streams;
	    streams = argumentsToObservables(arguments);
	    if (streams.length) {
	      return new EventStream(new Bacon.Desc(Bacon, "mergeAll", streams), function(sink) {
	        var ends, sinks, smartSink;
	        ends = 0;
	        smartSink = function(obs) {
	          return function(unsubBoth) {
	            return obs.dispatcher.subscribe(function(event) {
	              var reply;
	              if (event.isEnd()) {
	                ends++;
	                if (ends === streams.length) {
	                  return sink(endEvent());
	                } else {
	                  return Bacon.more;
	                }
	              } else {
	                reply = sink(event);
	                if (reply === Bacon.noMore) {
	                  unsubBoth();
	                }
	                return reply;
	              }
	            });
	          };
	        };
	        sinks = _.map(smartSink, streams);
	        return new Bacon.CompositeUnsubscribe(sinks).unsubscribe;
	      });
	    } else {
	      return Bacon.never();
	    }
	  };
	
	  Bacon.repeatedly = function(delay, values) {
	    var index;
	    index = 0;
	    return withDesc(new Bacon.Desc(Bacon, "repeatedly", [delay, values]), Bacon.fromPoll(delay, function() {
	      return values[index++ % values.length];
	    }));
	  };
	
	  Bacon.repeat = function(generator) {
	    var index;
	    index = 0;
	    return Bacon.fromBinder(function(sink) {
	      var flag, handleEvent, reply, subscribeNext, unsub;
	      flag = false;
	      reply = Bacon.more;
	      unsub = function() {};
	      handleEvent = function(event) {
	        if (event.isEnd()) {
	          if (!flag) {
	            return flag = true;
	          } else {
	            return subscribeNext();
	          }
	        } else {
	          return reply = sink(event);
	        }
	      };
	      subscribeNext = function() {
	        var next;
	        flag = true;
	        while (flag && reply !== Bacon.noMore) {
	          next = generator(index++);
	          flag = false;
	          if (next) {
	            unsub = next.subscribeInternal(handleEvent);
	          } else {
	            sink(endEvent());
	          }
	        }
	        return flag = true;
	      };
	      subscribeNext();
	      return function() {
	        return unsub();
	      };
	    });
	  };
	
	  Bacon.retry = function(options) {
	    var delay, error, finished, isRetryable, maxRetries, retries, source;
	    if (!_.isFunction(options.source)) {
	      throw new Exception("'source' option has to be a function");
	    }
	    source = options.source;
	    retries = options.retries || 0;
	    maxRetries = options.maxRetries || retries;
	    delay = options.delay || function() {
	      return 0;
	    };
	    isRetryable = options.isRetryable || function() {
	      return true;
	    };
	    finished = false;
	    error = null;
	    return withDesc(new Bacon.Desc(Bacon, "retry", [options]), Bacon.repeat(function() {
	      var context, pause, valueStream;
	      if (finished) {
	        return null;
	      } else {
	        valueStream = function() {
	          return source().endOnError().withHandler(function(event) {
	            if (event.isError()) {
	              error = event;
	              if (isRetryable(error.error) && retries > 0) {
	
	              } else {
	                finished = true;
	                return this.push(event);
	              }
	            } else {
	              if (event.hasValue()) {
	                error = null;
	                finished = true;
	              }
	              return this.push(event);
	            }
	          });
	        };
	        if (error) {
	          context = {
	            error: error.error,
	            retriesDone: maxRetries - retries
	          };
	          pause = Bacon.later(delay(context)).filter(false);
	          retries = retries - 1;
	          return pause.concat(Bacon.once().flatMap(valueStream));
	        } else {
	          return valueStream();
	        }
	      }
	    }));
	  };
	
	  Bacon.sequentially = function(delay, values) {
	    var index;
	    index = 0;
	    return withDesc(new Bacon.Desc(Bacon, "sequentially", [delay, values]), Bacon.fromPoll(delay, function() {
	      var value;
	      value = values[index++];
	      if (index < values.length) {
	        return value;
	      } else if (index === values.length) {
	        return [value, endEvent()];
	      } else {
	        return endEvent();
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.skip = function(count) {
	    return withDesc(new Bacon.Desc(this, "skip", [count]), this.withHandler(function(event) {
	      if (!event.hasValue()) {
	        return this.push(event);
	      } else if (count > 0) {
	        count--;
	        return Bacon.more;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.take = function(count) {
	    if (count <= 0) {
	      return Bacon.never();
	    }
	    return withDesc(new Bacon.Desc(this, "take", [count]), this.withHandler(function(event) {
	      if (!event.hasValue()) {
	        return this.push(event);
	      } else {
	        count--;
	        if (count > 0) {
	          return this.push(event);
	        } else {
	          if (count === 0) {
	            this.push(event);
	          }
	          this.push(endEvent());
	          return Bacon.noMore;
	        }
	      }
	    }));
	  };
	
	  Bacon.EventStream.prototype.skipUntil = function(starter) {
	    var started;
	    started = starter.take(1).map(true).toProperty(false);
	    return withDesc(new Bacon.Desc(this, "skipUntil", [starter]), this.filter(started));
	  };
	
	  Bacon.EventStream.prototype.skipWhile = function() {
	    var args, f, ok;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    assertObservableIsProperty(f);
	    ok = false;
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "skipWhile", [f]), this.withHandler(function(event) {
	        if (ok || !event.hasValue() || !f(event.value())) {
	          if (event.hasValue()) {
	            ok = true;
	          }
	          return this.push(event);
	        } else {
	          return Bacon.more;
	        }
	      }));
	    });
	  };
	
	  Bacon.Observable.prototype.slidingWindow = function(n, minValues) {
	    if (minValues == null) {
	      minValues = 0;
	    }
	    return withDesc(new Bacon.Desc(this, "slidingWindow", [n, minValues]), this.scan([], (function(window, value) {
	      return window.concat([value]).slice(-n);
	    })).filter((function(values) {
	      return values.length >= minValues;
	    })));
	  };
	
	  Bacon.spy = function(spy) {
	    return spys.push(spy);
	  };
	
	  spys = [];
	
	  registerObs = function(obs) {
	    var j, len1, spy;
	    if (spys.length) {
	      if (!registerObs.running) {
	        try {
	          registerObs.running = true;
	          for (j = 0, len1 = spys.length; j < len1; j++) {
	            spy = spys[j];
	            spy(obs);
	          }
	        } finally {
	          delete registerObs.running;
	        }
	      }
	    }
	    return void 0;
	  };
	
	  Bacon.Property.prototype.startWith = function(seed) {
	    return withDesc(new Bacon.Desc(this, "startWith", [seed]), this.scan(seed, function(prev, next) {
	      return next;
	    }));
	  };
	
	  Bacon.EventStream.prototype.startWith = function(seed) {
	    return withDesc(new Bacon.Desc(this, "startWith", [seed]), Bacon.once(seed).concat(this));
	  };
	
	  Bacon.Observable.prototype.takeWhile = function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    assertObservableIsProperty(f);
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "takeWhile", [f]), this.withHandler(function(event) {
	        if (event.filter(f)) {
	          return this.push(event);
	        } else {
	          this.push(endEvent());
	          return Bacon.noMore;
	        }
	      }));
	    });
	  };
	
	  Bacon.update = function() {
	    var i, initial, lateBindFirst, patterns;
	    initial = arguments[0], patterns = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    lateBindFirst = function(f) {
	      return function() {
	        var args;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        return function(i) {
	          return f.apply(null, [i].concat(args));
	        };
	      };
	    };
	    i = patterns.length - 1;
	    while (i > 0) {
	      if (!(patterns[i] instanceof Function)) {
	        patterns[i] = (function(x) {
	          return function() {
	            return x;
	          };
	        })(patterns[i]);
	      }
	      patterns[i] = lateBindFirst(patterns[i]);
	      i = i - 2;
	    }
	    return withDesc(new Bacon.Desc(Bacon, "update", [initial].concat(slice.call(patterns))), Bacon.when.apply(Bacon, patterns).scan(initial, (function(x, f) {
	      return f(x);
	    })));
	  };
	
	  Bacon.zipAsArray = function() {
	    var streams;
	    streams = argumentsToObservables(arguments);
	    return withDesc(new Bacon.Desc(Bacon, "zipAsArray", streams), Bacon.zipWith(streams, function() {
	      var xs;
	      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return xs;
	    }));
	  };
	
	  Bacon.zipWith = function() {
	    var f, ref1, streams;
	    ref1 = argumentsToObservablesAndFunction(arguments), streams = ref1[0], f = ref1[1];
	    streams = _.map((function(s) {
	      return s.toEventStream();
	    }), streams);
	    return withDesc(new Bacon.Desc(Bacon, "zipWith", [f].concat(slice.call(streams))), Bacon.when(streams, f));
	  };
	
	  Bacon.Observable.prototype.zip = function(other, f) {
	    if (f == null) {
	      f = Array;
	    }
	    return withDesc(new Bacon.Desc(this, "zip", [other]), Bacon.zipWith([this, other], f));
	  };
	
	  
	
	Bacon.Observable.prototype.first = function () {
	  return withDesc(new Bacon.Desc(this, "first", []), this.take(1));
	};
	
	Bacon.Observable.prototype.last = function () {
	  var lastEvent;
	
	  return withDesc(new Bacon.Desc(this, "last", []), this.withHandler(function (event) {
	    if (event.isEnd()) {
	      if (lastEvent) {
	        this.push(lastEvent);
	      }
	      this.push(endEvent());
	      return Bacon.noMore;
	    } else {
	      lastEvent = event;
	    }
	  }));
	};
	
	Bacon.EventStream.prototype.throttle = function (delay) {
	  return withDesc(new Bacon.Desc(this, "throttle", [delay]), this.bufferWithTime(delay).map(function (values) {
	    return values[values.length - 1];
	  }));
	};
	
	Bacon.Property.prototype.throttle = function (delay) {
	  return this.delayChanges(new Bacon.Desc(this, "throttle", [delay]), function (changes) {
	    return changes.throttle(delay);
	  });
	};
	
	Observable.prototype.firstToPromise = function (PromiseCtr) {
	  var _this = this;
	
	  if (typeof PromiseCtr !== "function") {
	    if (typeof Promise === "function") {
	      PromiseCtr = Promise;
	    } else {
	      throw new Exception("There isn't default Promise, use shim or parameter");
	    }
	  }
	
	  return new PromiseCtr(function (resolve, reject) {
	    return _this.subscribe(function (event) {
	      if (event.hasValue()) {
	        resolve(event.value());
	      }
	      if (event.isError()) {
	        reject(event.error);
	      }
	
	      return Bacon.noMore;
	    });
	  });
	};
	
	Observable.prototype.toPromise = function (PromiseCtr) {
	  return this.last().firstToPromise(PromiseCtr);
	};
	
	if (("function" !== "undefined" && __webpack_require__(38) !== null) && (__webpack_require__(39) != null)) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Bacon;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    this.Bacon = Bacon;
	  } else if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
	    module.exports = Bacon;
	    Bacon.Bacon = Bacon;
	  } else {
	    this.Bacon = Bacon;
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(37)(module)))

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 39 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
	//
	// Permission is hereby granted, free of charge, to any person
	// obtaining a copy of this software and associated documentation files
	// (the "Software"), to deal in the Software without restriction,
	// including without limitation the rights to use, copy, modify, merge,
	// publish, distribute, sublicense, and/or sell copies of the Software,
	// and to permit persons to whom the Software is furnished to do so,
	// subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be
	// included in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = __webpack_require__(41)

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
	//
	// Permission is hereby granted, free of charge, to any person
	// obtaining a copy of this software and associated documentation files
	// (the "Software"), to deal in the Software without restriction,
	// including without limitation the rights to use, copy, modify, merge,
	// publish, distribute, sublicense, and/or sell copies of the Software,
	// and to permit persons to whom the Software is furnished to do so,
	// subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be
	// included in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	/**
	 * @module lib/future
	 */
	module.exports = Future
	
	
	// -- Dependencies -----------------------------------------------------
	var memoisedFork = __webpack_require__(42).memoisedFork
	
	
	// -- Implementation ---------------------------------------------------
	
	/**
	 * The `Future[α, β]` structure represents values that depend on time. This
	 * allows one to model time-based effects explicitly, such that one can have
	 * full knowledge of when they're dealing with delayed computations, latency,
	 * or anything that can not be computed immediately.
	 *
	 * A common use for this structure is to replace the usual Continuation-Passing
	 * Style form of programming, in order to be able to compose and sequence
	 * time-dependent effects using the generic and powerful monadic operations.
	 *
	 * @class
	 * @summary
	 * ((α → Void), (β → Void) → Void), (Void → Void) → Future[α, β]
	 *
	 * Future[α, β] <: Chain[β]
	 *               , Monad[β]
	 *               , Functor[β]
	 *               , Applicative[β]
	 *               , Semigroup[β]
	 *               , Monoid[β]
	 *               , Show
	 */
	function Future(computation, cleanup) {
	  this.fork    = computation
	  this.cleanup = cleanup || function(){ }
	}
	
	/**
	 * Creates a `Future[α, β]` that computes the action at most once.
	 *
	 * Since this function will remember the resolved value of the future, **it's
	 * expected to be used only for pure actions,** otherwise you may not be able
	 * to observe the effects.
	 *
	 * @summary ((α → Void), (β → Void) → Void) → Future[α, β]
	 */
	Future.prototype.memoise = function _memoise(f) {
	  if (typeof console !== 'undefined')
	    console.warn("Future#memoise is deprecated. Use control.async's memoise() function instead.")
	
	  var future  = new Future()
	  future.fork = memoisedFork(f, future)
	  return future
	}
	Future.memoise = Future.prototype.memoise
	
	
	/**
	 * Constructs a new `Future[α, β]` containing the single value `β`.
	 *
	 * `β` can be any value, including `null`, `undefined`, or another
	 * `Future[α, β]` structure.
	 *
	 * @summary β → Future[α, β]
	 */
	Future.prototype.of = function _of(b) {
	  return new Future(function(_, resolve){ return resolve(b) })
	}
	Future.of = Future.prototype.of
	
	
	/**
	 * Constructs a new `Future[α, β]` containing the single value `α`.
	 * 
	 * `α` can be any value, including `null`, `undefined`, or another 
	 * `Future[α, β]` structure.
	 * 
	 * @summary α → Future[α, β]
	 */
	Future.prototype.rejected = function _rejected(a) {
	  return new Future(function(reject, _){ return reject(a) })
	}
	Future.rejected = Future.prototype.rejected
	
	
	// -- Functor ----------------------------------------------------------
	
	/**
	 * Transforms the successful value of the `Future[α, β]` using a regular unary
	 * function.
	 *
	 * @summary @Future[α, β] => (β → γ) → Future[α, γ]
	 */
	Future.prototype.map = function _map(f) {
	  return this.chain(function(a){
	                      var result = Future.of(f(a))
	                      result.cleanup = this.cleanup || function(){ }
	                      return result
	                    }.bind(this))
	}
	
	
	// -- Chain ------------------------------------------------------------
	
	/**
	 * Transforms the succesful value of the `Future[α, β]` using a function to a
	 * monad.
	 *
	 * @summary @Future[α, β] => (β → Future[α, γ]) → Future[α, γ]
	 */
	Future.prototype.chain = function _chain(f) {
	  return new Future(function(reject, resolve) {
	                      return this.fork( function(a){
	                                          return reject(a) }
	                                      , function(b){
	                                          return f(b).fork(reject, resolve) })
	                    }.bind(this), this.cleanup)
	}
	
	
	// -- Apply ------------------------------------------------------------
	
	/**
	 * Applys the successful value of the `Future[α, (β → γ)]` to the successful
	 * value of the `Future[α, β]`
	 *
	 * @summary @Future[α, (β → γ)] => Future[α, β] → Future[α, γ]
	 */
	
	Future.prototype.ap = function _ap(f2) {
	  return this.chain(function(f) { return f2.map(f) })
	}
	
	
	// -- Semigroup ------------------------------------------------------------
	
	/**
	 * Selects the earlier of the two futures `Future[α, β]`
	 *
	 * @summary @Future[α, β] => Future[α, β] → Future[α, β]
	 */
	
	Future.prototype.concat = function _concat(f2) {
	  var done    = false
	
	  return new Future(function(reject, resolve) {
	    return this.fork(runIfNotDone(reject, f2), runIfNotDone(resolve, f2))
	        || f2.fork(runIfNotDone(reject, this), runIfNotDone(resolve, this))
	  }.bind(this), cleanupAll.bind(this))
	
	  function cleanupAll() {
	    this.cleanup()
	    f2.cleanup()
	  }
	
	  function runIfNotDone(f, other){ return function(x) {
	    if (!done) {
	      done = true
	      other.cleanup()
	      return f(x) }}}
	}
	
	
	// -- Monoid ------------------------------------------------------------
	
	/**
	 * Returns a Future that will never resolve
	 *
	 * @summary Void → Future[α, _]
	 */
	Future.empty = function _empty() {
	  return new Future(function(rej, res){ /* never resolve */ })
	}
	
	Future.prototype.empty = Future.empty
	
	
	// -- Show -------------------------------------------------------------
	
	/**
	 * Returns a textual representation of the `Future[α, β]`
	 *
	 * @summary @Future[α, β] => Void → String
	 */
	Future.prototype.toString = function _toString() {
	  return 'Future'
	}
	
	
	// -- Extracting and recovering ----------------------------------------
	
	/**
	 * Transforms a failure value into a new `Future[α, β]`. Does nothing if the
	 * structure already contains a successful value.
	 *
	 * @summary @Future[α, β] => (α → Future[γ, β]) → Future[γ, β]
	 */
	Future.prototype.orElse = function _orElse(f) {
	  return new Future(function(reject, resolve) {
	                      return this.fork( function(a){
	                                          return f(a).fork(reject, resolve) }
	                                      , function(b){
	                                          return resolve(b) })
	                    }.bind(this), this.cleanup)
	}
	
	
	// -- Folds and extended transformations -------------------------------
	
	/**
	 * Catamorphism. Takes two functions, applies the leftmost one to the failure
	 * value, and the rightmost one to the successful value, depending on which one
	 * is present.
	 *
	 * @summary @Future[α, β] => (α → γ), (β → γ) → Future[δ, γ]
	 */
	Future.prototype.fold = function _fold(f, g) {
	  return new Future(function(reject, resolve) {
	                      return this.fork( function(a){
	                                          return resolve(f(a)) }
	                                      , function(b){
	                                          return resolve(g(b)) })
	                    }.bind(this), this.cleanup)
	}
	
	/**
	 * Catamorphism.
	 * 
	 * @summary @Future[α, β] => { Rejected: α → γ, Resolved: β → γ } → Future[δ, γ]
	 */
	Future.prototype.cata = function _cata(pattern) {
	  return this.fold(pattern.Rejected, pattern.Resolved)
	}
	
	/**
	 * Swaps the disjunction values.
	 *
	 * @summary @Future[α, β] => Void → Future[β, α]
	 */
	Future.prototype.swap = function _swap() {
	  return new Future(function(reject, resolve) {
	                      return this.fork( function(a){
	                                          return resolve(a) }
	                                      , function(b){
	                                          return reject(b) })
	                    }.bind(this), this.cleanup)
	}
	
	/**
	 * Maps both sides of the disjunction.
	 *
	 * @summary @Future[α, β] => (α → γ), (β → δ) → Future[γ, δ]
	 */
	Future.prototype.bimap = function _bimap(f, g) {
	  return new Future(function(reject, resolve) {
	                      return this.fork( function(a){
	                                          return reject(f(a)) }
	                                      , function(b){
	                                          return resolve(g(b)) })
	                    }.bind(this), this.cleanup)
	}
	
	/**
	 * Maps the left side of the disjunction (failure).
	 *
	 * @summary @Future[α, β] => (α → γ) → Future[γ, β]
	 */
	Future.prototype.rejectedMap = function _rejectedMap(f) {
	  return new Future(function(reject, resolve) {
	                      return this.fork( function(a){
	                                          return reject(f(a)) }
	                                      , function(b){
	                                          return resolve(b) })
	                    }.bind(this), this.cleanup)
	}


/***/ },
/* 42 */
/***/ function(module, exports) {

	// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
	//
	// Permission is hereby granted, free of charge, to any person
	// obtaining a copy of this software and associated documentation files
	// (the "Software"), to deal in the Software without restriction,
	// including without limitation the rights to use, copy, modify, merge,
	// publish, distribute, sublicense, and/or sell copies of the Software,
	// and to permit persons to whom the Software is furnished to do so,
	// subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be
	// included in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	/**
	 * @module lib/memoised
	 */
	
	/**
	 * A function that memoises the result of a future operation, for performance
	 * of pure futures.
	 *
	 * @method
	 * @summary ((α → Void), (β → Void) → Void), Future[α, β] → ((α → Void), (β → Void) → Void)
	 */
	exports.memoisedFork = memoisedFork
	function memoisedFork(f, future) {
	  var pending  = []
	  var started  = false
	  var resolved = false
	  var rejected = false
	  var value    = null
	
	  return fold
	
	  // The fold applies the correct operation to the future's value, if the
	  // future has been resolved. Or we run the operation instead.
	  //
	  // For optimisation purposes, we cache the result of the operation, so
	  // if we started an operation before, we mark it as started and push
	  // any subsequent forks into a pending queue that will be invoked once
	  // the original fork returns.
	  function fold(g, h) {
	    return resolved?        h(value)
	    :      rejected?        g(value)
	    :      started?         addToPendingOperations(g, h)
	    :      /* otherwise */  resolveFuture(g, h)
	  }
	
	  // Remembers some operation to fire at a later point in time, when the
	  // future gets resolved
	  function addToPendingOperations(g, h) {
	    pending.push({ rejected: g, resolved: h })
	  }
	
	  // Resolves the future, and memorises its value and resolution strategy
	  function resolveFuture(g, h) {
	    started = true
	    return f( function(a) { rejected     = true
	                            value = a
	                            invokePending('rejected', a)
	                            return g(a) }
	
	            , function(b) { resolved     = true
	                            value = b
	                            invokePending('resolved', b)
	                            return h(b) })
	  }
	
	  // Invokes operations that were added before the future got a value
	  function invokePending(kind, value) {
	    var xs = pending
	    started        = false
	    pending.length = 0
	
	    for (var i = 0; i < xs.length; ++i)  xs[i][kind](value)
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var runIO = function runIO(io) {
	    return io.val();
	};
	
	exports.runIO = runIO;
	var IOType = function IOType(fn) {
	    this.val = fn;
	    this.runIO = this.val;
	};
	
	exports.IOType = IOType;
	var IO = function IO(fn) {
	    return new IOType(fn);
	};
	
	exports.IO = IO;
	IOType.of = function (x) {
	    return IO(function () {
	        return x;
	    });
	};
	IOType.prototype.of = IOType.of;
	
	IOType.prototype.chain = function (g) {
	    var io = this;
	    return IO(function () {
	        return g(io.val()).val();
	    });
	};
	
	// Derived
	IOType.prototype.map = function (f) {
	    return this.chain(function (a) {
	        return IOType.of(f(a));
	    });
	};
	IOType.prototype.ap = function (a) {
	    return this.chain(function (f) {
	        return a.map(f);
	    });
	};
	
	var extendFn = function extendFn() {
	    Function.prototype.toIO = function () {
	        var self = this;
	        return function (x) {
	            return IO(function () {
	                return self(x);
	            });
	        };
	    };
	};
	exports.extendFn = extendFn;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getRandomColor = getRandomColor;
	exports.contrastColor = contrastColor;
	
	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
	
	function contrastColor(hexColor) {
	    return hexdec(hexColor) > 0xffffff / 2 ? '#000000' : '#FFFFFF';
	}
	
	function hexdec(hex_string) {
	    //  discuss at: http://phpjs.org/functions/hexdec/
	    // original by: Philippe Baumann
	    //   example 1: hexdec('that');
	    //   returns 1: 10
	    //   example 2: hexdec('a0');
	    //   returns 2: 160
	
	    hex_string = (hex_string + '').replace(/[^a-f0-9]/gi, '');
	    return parseInt(hex_string, 16);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map