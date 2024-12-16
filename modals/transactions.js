const mongoose = require('mongoose');

const Transaction = new mongoose.Schema({

    paymentId: { type: 'string', default: '' },
    orderId: { type: 'string' },
    hash: { type: 'string', default: '' },
    price: { type: 'number' },
    userId: { type: 'string' },
    addressId: { type: 'string' },
    paid: { type: 'boolean', default: false },
}, { timestamps: true })


module.exports = mongoose.model('Transaction', Transaction)