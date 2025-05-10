const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (request, response) => {
//   response.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
// });

// app.post('/', (request, response) => {
//   response.status(200).json({ message: 'You can post to this endpoint', app: 'Natours' });
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

// this is called a route handler:
app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    resultCount: toursObj.length,
    data: {
      tours
    },
  });
});

const port = 420;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});

