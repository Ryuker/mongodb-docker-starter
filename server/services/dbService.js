const colors = require('colors');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(`mongodb://127.0.0.1:8080/`);

      // with login
      // const conn = await mongoose.connect(`mongodb://127.0.0.1:8080/`, {
      //   user: 'mongo_admin',
      //   pass: 'example_pass'
      // });

      // shorter version
      // const conn = await mongoose.connect(`mongodb://mongo_admin:example_pass@127.0.0.1:8080/`);

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);

  } catch(err){
    console.log(err);
    console.log('Connection to mongodb refused');
  }
};

module.exports = connectDB;