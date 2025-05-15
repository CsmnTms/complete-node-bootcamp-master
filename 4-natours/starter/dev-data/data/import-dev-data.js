import fs from 'fs';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import Tour from './../../models/tourModel.js';
config({ path: './../../config.env' });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successful!'));

const tours = JSON.parse(fs.readFileSync(`./tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}  

if (process.argv[2] === '--import') {
  importData();
}
else if (process.argv[2] === '--delete') {
  deleteData();
}