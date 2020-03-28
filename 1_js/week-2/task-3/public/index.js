// Телефонная книга
var phoneBook = {};

function addContact(name, numbers) {
    if (phoneBook.hasOwnProperty(name)) {
        phoneBook[name].push(...numbers);
    } else {
        phoneBook[name] = numbers;
    }
}

function removePhone(number) {
    var haveNumber = false;
    Object.keys(phoneBook).forEach(name => {
        if (phoneBook[name].indexOf(number) != -1) {
            phoneBook[name].forEach((num, i) => {
                if (num === number) {
                    phoneBook[name].splice(i, 1);
                    haveNumber = true;
                    if (phoneBook[name].length === 0) {
                        delete phoneBook[name];
                    }
                    return true;
                }
            })
        }
    })
    return haveNumber;
}

function Show() {
    let ans = [];
    Object.keys(phoneBook).sort().forEach(name => {
        ans.push(`${name}: ${phoneBook[name].join(", ")}`)
    });
    return ans;
}

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    let arrayCommand = command.split(" ");
    if (arrayCommand[0] === "ADD") {
        addContact(arrayCommand[1], arrayCommand[2].split(","));
    } else if (arrayCommand[0] === "SHOW") {
        return Show();
    } else if (arrayCommand[0] === "REMOVE_PHONE") {
        return removePhone(arrayCommand[1]);
    }
};
