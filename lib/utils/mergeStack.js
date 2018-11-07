function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 检查是否已存在该栈
 * @param {Array} orign 原数组
 * @param {Object} target 目标
 * @return {Boolean} 存在返回true，否则返回false
 */
var checkStack = function checkStack(orign, target) {
  return Array.prototype.some.call(orign, function (ele) {
    return ele.key === target.key;
  });
}; // eslint-disable-line

/**
 * 是否安全添加栈，如果存在则放回false
 * @param {Array} origin 原数组，表示已存在的栈
 * @param {*} target 目标对象，表示要添加的栈
 * @return {Boolean} 存在返回false，否则返回true
 */


var isSafeToAddStack = function isSafeToAddStack(origin, target) {
  // eslint-disable-line
  if (!Array.isArray(origin)) {
    console.error("origin must be Array, but get ".concat(_typeof(origin)));
    return false;
  }

  if (Array.isArray(target)) {
    if (target.length === 0) {
      return true;
    }

    return !target.every(function (v) {
      return checkStack(origin, v);
    });
  }

  if (Object.prototype.toString.call(target) === '[object Object]') {
    return !checkStack(origin, target);
  }

  console.error("except target is array or object, but get ".concat(_typeof(target)));
};
/**
 * 浅拷贝栈
 * @param {Array} origin 原数组，表示已存在的栈
 * @param {*} target 目标对象，表示要添加的栈
 * @return {Array} 返回新的栈
 */


var mergeStack = function mergeStack(origin, target) {
  // debugger // eslint-disable-line
  if (!isSafeToAddStack(origin, target)) {
    console.error('the stack is already exist!');
    return false;
  }

  if (Array.isArray(target)) {
    return Array.prototype.concat.call(origin, target);
  }

  return _toConsumableArray(origin).concat([target]);
};

export { checkStack, isSafeToAddStack, mergeStack };