// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var addTime = require('./index.js');

assert.equal(addTime(12, 30, 30), '13:00', 'При добавлении 30 мин. к 12:30 получится 13:00');
assert.equal(addTime(23, 59, 31), '00:30', 'При добавлении 31 мин. к 23:59 получится 00:30');
assert.equal(addTime(11, 50, 61), '12:51', 'При добавлении 61 мин. к 11:50 получится 12:51');
assert.equal(addTime(23, 1, 80), '00:21', 'При добавлении 80 мин. к 23:01 получится 00:21');

// console.log(addTime(12,59,876))

console.info('OK!');
