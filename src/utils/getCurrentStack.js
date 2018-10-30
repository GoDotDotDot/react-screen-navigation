/**
 * stack: Array
 *  {
 *    status: 'in' || 'out',
 *    key: '' // 当前screen名称,
 *  }
 */
const getCurrentStack = (screens, stack) =>
  screens.filter(ele => stack.some(e => e.key === ele.key)); // eslint-disable-line

export default getCurrentStack;
