const bcrypt = require('bcryptjs');
const User = require('../models/userModel')

const registerUser = async(req, res) => {
    if(Object.keys(req.body).length > 0) {
        const { username, email, password } = req.body;

        // check fieilds 
        if (!username || !email || !password ) return console.log('all fields are required');

        // check email
        const isUserExist = await User.findOne({ email });

        if (isUserExist) return console.log('this email is already in use');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        user ? res.status(201).json({
            username: user.username,
            email: user.email,
            password: hashedPassword,
        })
        : null;
    }
}

module.exports = registerUser;