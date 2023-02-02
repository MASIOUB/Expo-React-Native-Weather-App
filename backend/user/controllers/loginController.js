const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email});

    if (user && await bcrypt.compare(password, user.password)) {
        return res.status(200).json({
            user: user,
        })
    }
}

module.exports = loginUser;