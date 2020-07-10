var obj = {}
var students = [];
console.log(Object.getPrototypeOf(students));
console.log();

var sleep = function () {};
console.log(Object.getPrototypeOf(sleep));
console.log();

var person = {
    type: 'person'
}
var danny = {
    name: 'Danny',
    type: undefined
}
Object.setPrototypeOf(danny, person);

var student = {};
Object.prototype.serialize = function () {};

console.log('serialize' in student);
console.log('serialize' in []);
console.log('serialize' in new Date());
console.log('serialize' in Object);
console.log('serialize' in Object.prototype); 
Object.prototype.serialize = function () {};
var student = {
  name: 'Ivan',
  getName: function () { return this.name; }
};

Object.defineProperty(student, 'type', {
  enumerable: false,
  value: 'student'
});

var obj = Object.create(null);

console.log(obj);

console.log();
