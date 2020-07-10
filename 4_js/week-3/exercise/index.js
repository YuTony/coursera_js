// const { resolve } = require("path");
// const { rejects } = require("assert");

/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    let proms = operations.reduce((acc, val) => {
        acc.push(new Promise((resolve, reject) => {
            val((err, data) => {
                err ? reject(err) : resolve(data)
            });
        }));
        return acc;
    }, []);
    // proms.forEach((prom) => {
    //     prom.then
    // });
    // console.log('check');
    return Promise.all(proms).then(
        val => {
            callback(null, val)
        },
        err => {
            callback(err)
        }
    );
};