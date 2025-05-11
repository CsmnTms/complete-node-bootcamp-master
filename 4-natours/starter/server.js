const app = require ('./app');

// START SERVER
const port = 420;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});