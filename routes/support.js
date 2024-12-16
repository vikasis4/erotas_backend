const express = require('express');
const { addQuery, getQuery } = require('../controllers/support');
const router = express.Router();


router.route('/add').post(addQuery)
router.route('/get/:userId').get(getQuery)

module.exports = router;