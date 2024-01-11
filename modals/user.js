const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: { type: 'string', required: true },
    name: { type: 'string' },
    otp: { type: 'number', default: 0 },
    cart: [{
        name: { type: 'string' },
        price: { type: 'number' },
        productId: { type: 'string' }
    }],
    tokens: [{
        token: { type: 'string' }
    }]
})

module.exports = mongoose.model('User', User)