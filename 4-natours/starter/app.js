const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
});

app.post('/', (request, response) => {
  response.status(200).json({ message: 'You can post to this endpoint', app: 'Natours' });
});

const port = 420;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});

