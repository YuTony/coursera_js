/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    return hashtags
        .reduce((acc, val) => {
            val = val.toLowerCase();
            if (acc.indexOf(val) === -1) acc.push(val);
            return acc;
        }, [])
        .join(", ");
};
