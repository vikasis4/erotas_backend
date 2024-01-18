const Razorpay = require('razorpay')
const dotenv = require('dotenv')
dotenv.config()

const createOrder = async (req, res) => {
    var instance = new Razorpay({
        key_id: process.env.key_id,
        key_secret: process.env.key_secret,
    });

    var options = {
        amount: 100,
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    await instance.orders.create(options, function (err, order) {
        res.json({ order })
    });

}
const handlePayment = async (req, res) => {
    console.log(req.body);
    res.json({status: 'Payment was successful'})
}

module.exports = {createOrder, handlePayment}