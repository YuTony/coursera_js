/**
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */

var filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
  return NaN;
};

module.exports = function(a, b) {
  return filterInt(a) + filterInt(b)
};


// solution
// module.exports = function (a, b) {
//   // Выполняем приведение аргументов к числу и складываем
//   return Number(a) + Number(b);
// };