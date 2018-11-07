/**
 * stack: Array
 *  {
 *    status: 'in' || 'out',
 *    key: '' // 当前screen名称,
 *  }
 */
var getCurrentStack = function getCurrentStack(screens, stack) {
  return screens.filter(function (ele) {
    return stack.some(function (e) {
      return e.key === ele.key;
    });
  });
}; // eslint-disable-line


export default getCurrentStack;