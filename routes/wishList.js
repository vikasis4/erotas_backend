const express = require('express');
const router = express.Router();

const { GetWishList, RemoveFromWishList, AddToWishList } = require('../controllers/wishlist');

router.route('/get/:userId').get(GetWishList)
router.route('/add').post(AddToWishList)
router.route('/remove').post(RemoveFromWishList)

module.exports = router