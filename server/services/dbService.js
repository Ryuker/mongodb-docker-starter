const colors = require('colors');
const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// Set Up the Database connection
let URI = "mongodb://localhost:8080/";
const status = { isConnected: 'pending' };

const connectDB = async () => {
  try {
      // const conn = await mongoose.connect(`mongodb://127.0.0.1:8080/`);

      // with login
      const conn = await mongoose.connect(URI, {
        user: 'mongo_admin',
        pass: 'example_pass',
        dbName: 'AppDB'
      });

      // shorter version
      // const conn = await mongoose.connect(`mongodb://mongo_admin:example_pass@127.0.0.1:8080/`);
      if (conn.connection.host)
        status.isConnected = 'connected'; 

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch(err){
    console.log(err);
    console.log('Connection to mongodb refused');
    
    status.isConnected = 'not connected';
    throw new Error();
  }
};

const isDBConnected = asyncHandler( async(req, res, next) => {
  if (status.isConnected !== 'connected')
    return next(new ErrorResponse('Not connected to database', 503));
  
  return next();
})

module.exports = { connectDB, isDBConnected, status };