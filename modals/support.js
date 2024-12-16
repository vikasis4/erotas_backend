const mongoose = require('mongoose');

const Support = new mongoose.Schema({
    userId: { type: 'string' },
    phone: { type: 'number' }
})

module.exports = mongoose.model('Supoort', Support)