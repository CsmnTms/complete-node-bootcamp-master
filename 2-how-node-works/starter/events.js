const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9);

////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received!");
});

server.on("request", (req, res) => {
  console.log("Another request received!");
  // res.end("Another request received!"); // having this here will crash because the response is already sent
});

server.on("close", () => {
  console.log("Server closed!");
});

server.listen(420, "localhost", () => {
  console.log("Waiting for requests...");
});
