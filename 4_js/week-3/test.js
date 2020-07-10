var fs = require('fs');

// var promise = new Promise((resolve, reject) => {
//     fs.readFile(__dirname + '/data.jsons', {encoding: 'utf-8'}, (err, data) => {
//         err ? reject(err) : resolve(data);
//     })
// })

// // function getDefault() {
// //     return {name: 'Sergey'};
// // }

// // function getAvatar(data) {
// //     var name = data.name;
// //     return
// // }
// const add = require('./add.js');

// promise.then(console.log).catch(() => {console.log('error')});

fs.readFile(__filename,'utf-8',(err, data) => {
    err ? console.log("error") : console.log(data)
})
