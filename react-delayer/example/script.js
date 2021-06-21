const compose = require('../src');

console.log(compose(a => a * 2, b => b + 2)(4));
