/**
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
module.exports = function (a, b) {
    if (typeof a == 'string') {
        a = parseInt(a,10);
    }
    if (typeof b == 'string') {
        b = parseInt(b,10);
    }
    return a + b;
};
