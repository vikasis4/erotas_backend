const Order = require('../modals/order');

const getOrder = async (req, res) => {
    try {
        var { userId } = req.params;
        const orders = await Order.find({ userId })
        res.json({ status: 'true', orders })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = getOrder;