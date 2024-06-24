const express = require('express');

const {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById
} = require('../controllers/users.js');

const router = express.Router();
const { isDBConnected, status: dbStatus } = require('../services/dbService');

// Anything below this will use this middleware
router.use(isDBConnected);

// All Users
router
  .route('/')
  .get(getUsers)
  .post(addUser)

// Single user
router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)

module.exports = router;