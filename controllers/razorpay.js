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
        console.log(order);
        res.json({ order })
    });

}

module.exports = createOrder