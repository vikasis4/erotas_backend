const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number,
    description: [{
        heading: String,
        text: [String]
    }],
    imagesLink: [String],
    reviews: [String],
    searchWords: [String]
})

module.exports = mongoose.model('Products', Products)