/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */

module.exports = function(hours, minutes, interval) {
  hours = (hours + (((minutes + interval) / 60) >> 0)) % 24;
  minutes = (minutes + interval) % 60;
  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
};


// solution
