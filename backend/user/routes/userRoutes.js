const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registerController');
const loginUser = require('../controllers/loginController');
const { getAllUsers } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);

module.exports = router;