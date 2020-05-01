/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    let args = [].slice.call(arguments);
    let filters = args.filter(f => f.name === 'filterIn');
    let selects = args.filter(f => f.name === 'select');
    let ans = collection;
    filters.forEach(fil => ans = fil(ans));
    selects.forEach(sel => ans = sel(ans));
    return ans;
}

/**
 * @params {String[]}
 */
function select() {
    let fields = [].slice.call(arguments);
    return function select(collection) {
        return collection.reduce((acc, obj1) => {
            let obj2 = {};
            fields.forEach(prop => {
                if (obj1.hasOwnProperty(prop)) {
                    Object.defineProperty(obj2, prop, {
                        value: obj1[prop],
                        enumerable: true
                    });
                };
            });
            acc.push(obj2);
            return acc;
        }, []);
    };
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(collection) {
        return collection.reduce((acc, obj1) => {
            if (obj1.hasOwnProperty(property)) {
                if (values.includes(obj1[property])) {
                    acc.push(obj1);
                }
            };
            return acc;
        }, []);
    };
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
