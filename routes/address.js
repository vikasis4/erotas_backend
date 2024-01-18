const express = require('express');
const { getAddress, addAddress, deleteAddress, editAddress } = require('../controllers/address');

const router = express.Router();

router.route('/fetch/:userId').get(getAddress);
router.route('/add').post(addAddress);
router.route('/delete').post(deleteAddress);
router.route('/edit').post(editAddress);

module.exports = router;