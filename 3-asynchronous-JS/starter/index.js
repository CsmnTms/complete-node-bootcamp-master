const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
}

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Could not write to file");
      resolve("File written successfully");
    });
  });
}

// notice the chain of promises
// each promise returns another promise
// so we can chain them together
readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then((response) => {
    console.log(response.body.message);
    return writeFilePromise("dog-img.txt", response.body.message);
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

