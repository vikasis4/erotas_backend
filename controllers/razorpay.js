const Razorpay = require('razorpay')
const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()

var rzp_key = process.env.rzp_test_id;
var rzp_secret = process.env.rzp_test_secret;

const createOrder = async (req, res) => {

    var instance = new Razorpay({
        key_id: rzp_key,
        key_secret: rzp_secret,
    });

    var options = {
        amount: 50000,
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        res.json({ order })
    });

}
const handlePayment = async (req, res) => {
    try {
        var { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const sha = crypto.createHmac("sha256", rzp_secret);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        if (digest !== razorpay_signature) {
            return res.json({ status: 'error' })
        }

        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = { createOrder, handlePayment }