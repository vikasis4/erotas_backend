const express = require('express');
const router = express.Router();
const { login, register, otpVerify, otpGenrate, tokenVerify } = require('../controllers/auth')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/otp/verify').post(otpVerify)
router.route('/otp/genrate').post(otpGenrate)
router.route('/token/:token').get(tokenVerify)

module.exports = router