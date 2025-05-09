const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

setTimeout(() => console.log("Timeout 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("-----------------------------------");

  // these CALLBACKS execute in the event loop
  setTimeout(() => console.log("Timeout 2 finished"), 0); // #2
  setTimeout(() => console.log("Timeout 3 finished"), 1500); // #3
  setImmediate(() => console.log("Immediate 2 finished")); // #1

  process.nextTick(() => console.log("Process.nextTick 1 finished")); // #0

  // Cryptography is offloaded to the thread pool default size of thread
  // pool is 4 so running these 8 tasks will execute 4 at a time.
  //
  // If these were set to synchronous, the main thread would be blocked, and even the 0 second timer will not execute
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Top-level code executed");
