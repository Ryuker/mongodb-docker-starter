const colors = require('colors');
const express = require('express');

// middleware imports
const asyncHandler = require('./middleware/async');
const errorHandler = require('./middleware/error');
const connectDB = require('./services/dbService');

// utils
const ErrorResponse = require('./utils/errorResponse');

const app = express();

// Route files
const users = require('./routes/users.js');

//////////////
// db stuff
let status = { isConnected: false, msg: `<h1>Server Running, connection to database pending..</h1>`};

connectDB()
  .then(() => {
    status.isConnected = true;
    status.msg = `<h1>Server Running with connection to database</h1>`;
  })
  .catch(() => {
    status.isConnected = false;
    status.msg = `<h1>Server Running without connection to database</h1>`
  });

/////////////////
/// Middleware //

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Mount Routers
app.get('/', (req, res) => res.status(200).send(status.msg));

// lock routes with status message when database is not connected
if(!status.isConnected)
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
