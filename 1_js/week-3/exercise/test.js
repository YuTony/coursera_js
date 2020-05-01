var date = require('./index.js');

var t = date('2017-05-16 13:45');
console.info(t.value);
t.add(60*24*365, 'minutes');

// Object.getOwnPropertyDescriptor(date, 'add')
console.info(t.value);