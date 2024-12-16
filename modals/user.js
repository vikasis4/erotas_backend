const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: { type: 'string', required: true },
    name: { type: 'string' },
    otp: { type: 'number', default: 0 },
    address:[{
        address: { type: 'string'},
        pincode: { type: 'number'},
        city: { type: 'string'},
        state: { type: 'string'},
        phone: { type: 'number'},
        landMark: { type: 'string', default: ''}
    }],
    wishList:[{
        name: { type: 'string' },
        price: { type: 'number' },
        productId: { type: 'string' },
        imageLink: { type: 'string' },
    }],
    cart: [{
        name: { type: 'string' },
        price: { type: 'number' },
        productId: { type: 'string' },
        imageLink: { type: 'string' },
        qty: { type: 'number', default: 1}
    }],
    tokens: [{
        token: { type: 'string' }
    }]
})

module.exports = mongoose.model('User', User)