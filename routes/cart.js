const express = require('express');
const router = express.Router();

const { AddToCart, RemoveFromCart, GetCart } = require('../controllers/cart')

router.route('/add').post(AddToCart);
router.route('/remove').post(RemoveFromCart);
router.route('/fetch/:userId').get(GetCart);

module.exports = router;