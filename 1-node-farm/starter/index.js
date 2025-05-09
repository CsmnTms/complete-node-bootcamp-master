const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `this is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Non-blocking, asynchronous way
// fs.readFile('./txt/starttttt.txt', 'utf-8', (err, data1) => { // it is commonon in nodeJS for the error to be the first param in a callback, if there are any
//     if (err) return console.log('ERROR!'); // error handling

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("Your file has been written");
//             });
//         })
//     })
// })
// console.log("Started reading file"); // this executes first

////////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((request, response) => {
    const pathName = request.url;

    if (pathName === '/' || pathName === '/overview') {
        response.end('This is the OVERVIEW');
    } else if (pathName === '/product') {
        response.end('This is the PRODUCT');
    } else if (pathName === '/api') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(data);
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/html',
            'My-Own-Header': 'hello-world'
        });
        response.end('<h1>Page not found!<h1>');
    }
});

server.listen(420, '127.0.0.1', () => {
    console.log('Listening to requests on port 420');
});

