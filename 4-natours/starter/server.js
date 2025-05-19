import './env.js';
import { connect } from 'mongoose';
import app from './app.js';

connect(process.env.DATABASE).then(() => {
  console.log('///_________________________ DB connection successful! _________________________///');
});

//await new Promise(resolve => setTimeout(resolve, 5000));
// START SERVER
const port = process.env.PORT || 420;
app.listen(port, () => {
  console.log(`///                  Server is running http://localhost:${port}...                  ///`);
});
