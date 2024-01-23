const Razorpay = require('razorpay')
const crypto = require('crypto')
const User = require('../modals/user')
const Order = require('../modals/order')
const getPrice = require('../utils/getPrice')
const Transaction = require('../modals/transactions');
const dotenv = require('dotenv');
dotenv.config()

var rzp_key = process.env.rzp_test_id;
var rzp_secret = process.env.rzp_test_secret;

const createOrder = async (req, res) => {

    const { addressId, userId } = req.body;

    var price = await getPrice(userId);

    var instance = new Razorpay({
        key_id: rzp_key,
        key_secret: rzp_secret,
    });
    
    var options = {
        amount: price*100,
        currency: "INR",
    };
    instance.orders.create(options, async function (err, order) {
        await Transaction.create({
            addressId,
            userId,
            orderId: order.id,
            price
        })
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

        var transaction = await Transaction.findOne({ orderId: razorpay_order_id });
        transaction.paymentId = razorpay_payment_id;
        transaction.hash = razorpay_signature;
        transaction.paid = true;
        await transaction.save();

        var user = await User.findById(transaction.userId);
        var address = user.address.filter((state)=> state._id.toString() === transaction.addressId);
        var products = user.cart;

        await Order.create({
            userId: transaction.userId,
            paymentId:razorpay_payment_id,
            orderId:razorpay_order_id,
            price: transaction.price,
            address:address[0],
            products
        })

        user.cart = [];
        await user.save()

        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = { createOrder, handlePayment }