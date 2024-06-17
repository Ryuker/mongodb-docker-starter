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
let status = { isConnected: dbStatus, msg: `<h1>Server Running, connection to database pending..</h1>`};

// Route files
const users = require('./routes/users.js');

//////////////
// db stuff

connectDB()
  .then(() => {
    status.msg = `<h1>Server Running with connection to database</h1>`;
  })
  .catch(() => {
    status.msg = `<h1>Server Running without connection to database</h1>`
  }).finally(() => status.isConnected = dbStatus );

/////////////////
/// Middleware //

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Mount Routers
app.get('/', (req, res) => res.status(200).send(status.msg));

// lock routes with status message when database is not connected
if(dbStatus !== 'connected')
  app.get('/*', (req, res) => res.status(200).send(status.msg));

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
