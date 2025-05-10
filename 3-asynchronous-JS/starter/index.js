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

// this is basically syntactic sugar for the promise chain
// at least at the time of taking this course
const getDogPic = async () => {
  try 
  {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // by removing the await, we now save the promise to this variable
    const responsePromise1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const responsePromise2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const responsePromise3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    // exeucte all and get all the results as an array
    const all = await Promise.all([responsePromise1, responsePromise2, responsePromise3]);
    // console.log("<all> variable:", all); // bigass array of objects

    const imgs = all.map(res => res.body.message);
    console.log("imgs variable:", imgs);

    // console.log(response.body.message);

    const result = await writeFilePromise("dog-img.txt", imgs.join("\n"));
    console.log(result);
  } 
  catch (err) 
  {
    console.log("getDogPic internal error: ", err);
    throw(err);
  }

  return "2: DOG PIC WAS WRITTEN TO FILE!";
};

// this is a way to declare and call a unamed function
// it's also obivously the async/await way to do it
(async () => {
  try   
  {
    console.log("1: Will get dog pics!");
    let x = await getDogPic();
    console.log(x); // this will log "2: READY!" only after the async function is done
    console.log("3: Done getting dog pics!");
  }
  catch (err) 
  {
    console.log("error calling getDogPic - see internal error: ", err);
  }
})();

// console.log("1: Will get dog pics!");
// let x = getDogPic().then(x => {
//   console.log(x); // this will log "2: READY!" only after the async function is done
// }).catch(err => {
//   console.log("error calling getDogPic - see internal error: ", err);
// });
// console.log(x); // this will log a promise, as it executes immediately after STARTING the async function
// console.log("3: Done getting dog pics!");



// notice the chain of promises
// each promise returns another promise
// so we can chain them together
// readFilePromise(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//   })
//   .then((response) => {
//     console.log(response.body.message);
//     return writeFilePromise("dog-img.txt", response.body.message);
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });
