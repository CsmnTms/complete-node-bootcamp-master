// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log("------------------------------------");
console.log(calc1.add(2, 5));
console.log("------------------------------------");

// exports
// const calc2 = require("./test-module-2");
const { add, multiply } = require("./test-module-2");
console.log("------------------------------------");
console.log(multiply(2, 5));
console.log("------------------------------------");

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
