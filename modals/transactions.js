const mongoose = require('mongoose');

const Transaction = new mongoose.Schema({

    paymentId: { type: 'string', default: '' },
    orderId: { type: 'string' },
    hash: { type: 'string', default: '' },
    price: { type: 'number' },
    userId: { type: 'string' },
    addressId: { type: 'string' },
    paid: { type: 'boolean', default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

})

Transaction.pre('save', function (next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('Transaction', Transaction)