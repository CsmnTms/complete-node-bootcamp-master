const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //// Solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       res.writeHead(500, { "Content-Type": "text/plain" });
  //       res.end("Server error");
  //     } else {
  //       res.writeHead(200, { "Content-Type": "text/plain" });
  //       res.end(data);
  //     }
  //   });

  //// Solution 2
  //   const readable = fs.createReadStream("test-file.txt");

  //   readable.on("data", (chunk) => {
  //     res.write(chunk); // send data chunk by chunk
  //   });

  //   readable.on("end", () => {
  //     res.end(); // end the response when all data was sent, no data passed at it was already sent
  //   });

  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  //// Solution 3
  const readable = fs.createReadStream("test-file.txt");

  readable.pipe(res); // we basically write the readable stream to the response, which is a writable stream
  console.log("Pipe done");
});

server.listen(420, () => {
  console.log("Listening...");
});
