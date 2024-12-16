const express = require('express');
const router = express.Router();
const { login, register, otpVerify, otpGenrate, tokenVerify } = require('../controllers/auth')
const googleAuth = require('../controllers/googleAuth')

router.route('/login').post(login)
router.route('/google').post(googleAuth)
router.route('/register').post(register)
router.route('/otp/verify').post(otpVerify)
router.route('/otp/genrate').post(otpGenrate)
router.route('/token/:token').get(tokenVerify)

module.exports = router