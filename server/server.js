const colors = require('colors');
const express = require('express');

// middleware imports
const asyncHandler = require('./middleware/async');
const errorHandler = require('./middleware/error');
const { connectDB, status: dbStatus } = require('./services/dbService');

// utils
const ErrorResponse = require('./utils/errorResponse');

//////////////////
// instance server
const app = express();
let status = { isConnected: dbStatus.isConnected, msg: `<h1>Server Running, connection to database pending..</h1>`};

// Route files
const users = require('./routes/users.js');

/////////////////
/// Middleware //

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//////////////
// db stuff
connectDB()
  .then(() => {
    status.msg = `<h1>Server Running with connection to database</h1>`;
  })
  .catch(() => {
    status.msg = `<h1>Server Running without connection to database</h1>`
  }).finally(() => status.isConnected = dbStatus.isConnected );


// Mount Routers
app.get('/', (req, res) => res.status(200).send(status.msg));

app.use('/api/users', users);

// - Error Handler
app.use(errorHandler);

///////////
/// run the server
server = app.listen(
  5000,
  (() => {
    console.log('Server running on port 5000');
  })
);

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  
  // Close server & exit process
  server.close(() => process.exit(1));
});
