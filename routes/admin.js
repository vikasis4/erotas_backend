const express = require('express');
const router = express.Router();
const { getUsers, getOrders, getOrder, getQueries,updateOrder } = require('../controllers/admin')

router.route('/users/:id').get(getUsers)
router.route('/queries/:id').get(getQueries)
router.route('/orders/:id').get(getOrders)

router.route('/order/:orderId').get(getOrder)
router.route('/updateOrder').post(updateOrder)

module.exports = router