const express = require('express');
const { getAddress, addAddress } = require('../controllers/address');

const router = express.Router();

router.route('/fetch/:userId').get(getAddress);
router.route('/add').post(addAddress);

module.exports = router;