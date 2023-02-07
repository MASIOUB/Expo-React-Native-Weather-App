const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email});

    if (!user) {
        return res.status(400).json({
            message: "user not found",
        });
    };

    const validePassword = await bcrypt.compare(password, user.password);

    if (!validePassword) {
        return res.status(400).json({
            message: "invalid password",
        });
    };

    if (user && validePassword) {
        return res.status(200).json({
            user: user,
        })
    }
}

module.exports = loginUser;