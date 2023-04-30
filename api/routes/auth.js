const express = require('express');
const { login, signup, refreshToken, logout } = require('../controller/auth');
const { protect } = require('../middleware/protect');
const authRouter = express.Router(); 

authRouter.post('/login', login)
authRouter.post('/logout', protect, logout)
authRouter.post('/signup', signup)
authRouter.post('/refresh', protect, refreshToken)

module.exports = authRouter