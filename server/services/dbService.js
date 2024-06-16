const colors = require('colors');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/AppDB`, {
        user: 'mongo_admin',
        pass: 'example_pass'
      }
    );

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    
  } catch(err){
    console.log('Connection to mongodb refused');
  }
};

module.exports = connectDB;