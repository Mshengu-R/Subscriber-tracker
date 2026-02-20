const express = require('express');
const authRouter = express.Router();
const {signUp, signIn, signOut } = require('../controllers/auth.controller')

// Path: /api/v1/auth/sign-up (POST)
authRouter.post('/sing-up', signUp )

// Path: /api/v1/auth/sign-in (POST)
authRouter.post('/sing-in',  signIn )

// Path: /api/v1/auth/sign-out (POST)
authRouter.post('/sing-out', signOut )


module.exports = authRouter;