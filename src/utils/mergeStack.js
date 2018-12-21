/**
 * 检查是否已存在该栈
 * @param {Array} orign 原数组
 * @param {Object} target 目标
 * @return {Boolean} 存在返回true，否则返回false
 */
const checkStack = (orign, target) =>
  Array.prototype.some.call(orign, ele => ele.path === target.path); // eslint-disable-line

/**
 * 是否安全添加栈，如果存在则放回false
 * @param {Array} origin 原数组，表示已存在的栈
 * @param {*} target 目标对象，表示要添加的栈
 * @return {Boolean} 存在返回false，否则返回true
 */
const isSafeToAddStack = (origin, target) => { // eslint-disable-line
  if (!Array.isArray(origin)) {
    console.error(`origin must be Array, but get ${typeof origin}`);
    return false;
  }
  if (Array.isArray(target)) {
    if (target.length === 0) {
      return true;
    }
    return !target.every(v => checkStack(origin, v));
  }
  if (Object.prototype.toString.call(target) === '[object Object]') {
    return !checkStack(origin, target);
  }
  console.error(`except target is array or object, but get ${typeof target}`);
};

/**
 * 浅拷贝栈
 * @param {Array} origin 原数组，表示已存在的栈
 * @param {*} target 目标对象，表示要添加的栈
 * @return {Array} 返回新的栈
 */
const mergeStack = (origin, target) => {
  // debugger // eslint-disable-line
  if (!isSafeToAddStack(origin, target)) {
    console.error('the stack is already exist!');
    return origin;
  }
  if (Array.isArray(target)) {
    return Array.prototype.concat.call(origin, target);
  }
  return [...origin, target];
};

export { checkStack, isSafeToAddStack, mergeStack };
