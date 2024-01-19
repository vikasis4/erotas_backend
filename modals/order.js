const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    userId: { type: 'string', required: true },
    paymentId: { type: 'string', required: true },
    price: { type: 'number', required: true },
    trackingLink: { type: 'string', default: '' },
    shipmentCreated: { type: 'boolean', default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    products: [{
        name: { type: 'string' },
        price: { type: 'number' },
        productId: { type: 'string' },
        imageLink: { type: 'string' },
        qty: { type: 'number', default: 1}
    }],
    address: {
        address: { type: 'string' },
        pincode: { type: 'number' },
        city: { type: 'string' },
        state: { type: 'string' },
        phone: { type: 'number' },
        landMark: { type: 'string', default: '' }
    },
})

Order.pre('save', function (next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('Order', Order)