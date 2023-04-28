const express = require('express');
const { login, signup, refreshToken, logout } = require('../controller/auth');
const authRouter = express.Router(); 

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/signup', signup)
authRouter.post('/refresh', refreshToken)

module.exports = authRouter