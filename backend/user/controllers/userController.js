const User = require('../models/userModel');

// @route Get /users
const getAllUsers = async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
}

module.exports = { getAllUsers };