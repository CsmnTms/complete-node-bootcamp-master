// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   subtract(a, b) {
//     return a - b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   divide(a, b) {
//     return a / b;
//   }
// }

// we use module.exports when we want to export a single class or function
module.exports = class {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }
};
