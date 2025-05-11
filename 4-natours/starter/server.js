const mongoose = require('mongoose');
const dotenv = require('dotenv'); dotenv.config({ path: './config.env' }); // this loads the env vars from the config.env file into process.env

const app = require('./app');

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connection successful!');
});

// console.log("app.get('env'): :", app.get('env')); // this is the express app env mode (development, production, etc)
// console.log(process.env); // this is the node process env vars

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

testTour
.save()
.then((doc) => {
  console.log(doc);
})
.catch((err) => {
  console.log('Error saving tour:', err);
});

// START SERVER
const port = process.env.PORT || 420;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}...`);
});
