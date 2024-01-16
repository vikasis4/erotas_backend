const mongoose = require('mongoose');

const Transactions = new mongoose.Schema({
    ProductId: { type: 'string' },
    orderId: { type: 'string' },
    products: [{
        productId
    }],
    price: { type: 'number' }
})

module.exports = mongoose.model('Transactions', Transactions)