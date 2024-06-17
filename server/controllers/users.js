const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /
// @access  Public
exports.getUsers = asyncHandler( async (req, res, next) => {
  const data = await User.find();

  console.log(data);

  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Get single user by id
// @route   GET /:id
// @access  Public
exports.getUserById = asyncHandler( async (req, res, next) => {

  const data = await User.findById(req.params.id);

  if (data.length === 0) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  console.log(data);
  
  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Create new user
// @route   POST /
// @access  Private
exports.addUser = asyncHandler( async (req, res, next) => {

  const data = await User.create(req.body);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error adding user to the database', 404));
  }

  console.log(data);
  
  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Update user by id
// @route   PUT /:id
// @access  Private
exports.updateUserById = asyncHandler( async (req, res, next) => {
  
  const data = await User.findByIdAndUpdate(req.params.id, req.body);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error updating user in the database', 404));
  }

  console.log(data);
  
  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Delete user by id
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteUserById = asyncHandler( async (req, res, next) => {
  const user = await User.findById(req.params.id);
  
  // check if there was an error f
  if (!user) {
    return next(new ErrorResponse('Error deleting user from the database', 404));
  }

  await user.deleteOne();

  console.log(user);
  
  res.status(200).json({
    success: true,
    message: `Deleted user ${user.username} with id ${user.id}`,
    data: {}
  });
});

