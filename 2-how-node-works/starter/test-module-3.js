// when this module is loaded, the top-level code is executed once at first load,
// and then the module is cached. So when we require it again, it doesn't run the top-level code again.
// so when we call it three times, as in mdoules.js, it will runs as such:
console.log("Hello from the module"); // ONLY ONCE

module.exports = () => {
  console.log("Exported function"); // THREE TIMES
};
