/**
 * @param {String} date
 * @returns {Object}
 */

module.exports = function (date) {
    date = date
        .match(/[\d]+/g)
        .reduce((acc, val) => {
            acc.push(parseInt(val));
            return acc;
        }, []);
    date[1]--;
    date = new Date(...date);
    Object.defineProperty(date, 'coms', {
        value: {
            years: "FullYear",
            months: "Month",
            days: "Date",
            hours: "Hours",
            minutes: "Minutes"
        }
    });
    Object.defineProperty(date, 'add', {
        value: function (x, s) {
            if (this.coms.hasOwnProperty(s) && x >= 0) {
                this['set' + this.coms[s]](this['get' + this.coms[s]]() + x);
                // console.log(this.value);
                return this;
            } else {
                throw new TypeError();
            }
        }
    });
    Object.defineProperty(date, 'subtract', {
        value: function (x, s) {
            if (this.coms.hasOwnProperty(s) && x >= 0) {
                this['set' + this.coms[s]](this['get' + this.coms[s]]() - x);
                // console.log(this.value);
                return this;
            } else {
                throw new TypeError();
            }
        }
    });
    Object.defineProperty(date, 'value', {
        get: function () {
            return `${this.getFullYear()}-\
${this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1}-\
${this.getDate() < 10 ? '0' + this.getDate() : this.getDate()} \
${this.getHours() < 10 ? '0' + this.getHours() : this.getHours()}:\
${this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes()}`;
        }
    })
    // console.info(date);
    return date;
};