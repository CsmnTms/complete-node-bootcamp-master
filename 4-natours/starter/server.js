const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // this loads the env vars from the config.env file into process.env
const app = require ('./app');

// console.log("app.get('env'): :", app.get('env')); // this is the express app env mode (development, production, etc)
// console.log(process.env); // this is the node process env vars

// START SERVER
const port = process.env.PORT || 420;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});