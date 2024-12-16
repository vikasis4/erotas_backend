const express = require('express');
const getOrder = require('../controllers/order')
const router = express.Router();

router.route('/fetch/:userId').get(getOrder)

module.exports = router;