module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this.val = [];
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.val;
};
// другие методы

Collection.prototype.at = function (n) { return this.val[n - 1]; };

Collection.prototype.append = function (x) {
    if (x instanceof Collection) {
        this.val = this.val.concat(x.values());
    } else {
        this.val.push(x);
    }
}

Collection.prototype.count = function () { return this.val.length; };

Collection.prototype.removeAt = function (i) {
    if (i > 0 && i <= this.count()) {
        this.val.splice(i - 1,1);
        return true;
    } else {
        return false;
    }
}

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (l) {
    var t = new Collection();
    t.val = l;
    return t;
};
