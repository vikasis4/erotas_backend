const express = require('express');
const router = express.Router();
const {createOrder, handlePayment} = require('../controllers/razorpay');

router.route('/order').post(createOrder)
router.route('/handlePayment').post(handlePayment)

module.exports = router;