const User = require('../modals/user')
const Order = require('../modals/order');
const Support = require('../modals/support');

const getUsers = async (req, res) => {
    try {
        const id = req.params.id;
        var toSkip = (parseInt(id) - 1) * 20;
        const users = await User.find({}).skip(toSkip).limit(20)
        res.json({ status: 'true', data: users });
    } catch (error) {
        res.json({ status: 'false' });
        console.log(error);
    }
}

const getOrders = async (req, res) => {
    try {
        const id = req.params.id;
        if (id.length > 5) {
            const orders = await Order.find({ userId: id })
            res.json({ status: 'true', data: orders });
            return
        }
        var toSkip = (parseInt(id) - 1) * 20;
        const orders = await Order.find({}).skip(toSkip).limit(20)
        res.json({ status: 'true', data: orders });
    } catch (error) {
        res.json({ status: 'false' });
        console.log(error);
    }
}
const getQueries = async (req, res) => {
    try {
        const id = req.params.id;
        if (id.length > 5) {
            const queries = await Support.find({ userId: id })
            res.json({ status: 'true', data: queries });
            return
        }
        var toSkip = (parseInt(id) - 1) * 20;
        const queries = await Support.find({}).skip(toSkip).limit(20)
        res.json({ status: 'true', data: queries });
    } catch (error) {
        res.json({ status: 'false' });
        console.log(error);
    }
}



const getOrder = async (req, res) => {
    try {
        var orderId = req.params.orderId;
        const order = await Order.findOne({ orderId });
        const user = await User.findById(order.userId);
        res.json({ status: 'true', data: { order, user } });
    } catch (error) {
        res.json({ status: 'false' });
        console.log(error);
    }
}
const updateOrder = async (req, res) => {
    try {
        var { orderId, url } = req.body;
        const order = await Order.findOne({ orderId });
        if (url == 'null') {
            order.shipmentCreated = false;
            order.trackingLink = '';
        } else {
            order.shipmentCreated = true;
            order.trackingLink = url;
        }
        await order.save()
        res.json({ status: 'true' });
    } catch (error) {
        res.json({ status: 'false' });
        console.log(error);
    }
}



module.exports = { updateOrder, getOrder, getUsers, getOrders, getQueries };