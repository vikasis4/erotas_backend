const express = require('express');
const router = express.Router();
const {AddProduct, getProduct, getAll} = require('../controllers/products')

router.route('/addNew').post(AddProduct)
router.route('/getAll').get(getAll)
router.route('/getProduct/:id').get(getProduct)

module.exports = router