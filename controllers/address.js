const User = require('../modals/user');

const getAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId.length < 10) { res.json({ status: 'empty' }); return };

        const user = await User.findById(userId);
        res.json({ status: 'true', address: user.address })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}
const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        if (userId.length < 10) { res.json({ status: 'empty' }); return };

        const user = await User.findById(userId);
        user.address.push(address);
        await user.save()
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.body;
        if (userId.length < 10) { res.json({ status: 'empty' }); return };

        const user = await User.findById(userId);
        var index = user.address.findIndex((state) => state._id === addressId);
        user.address.splice(index, 1);
        await user.save()
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}
const editAddress = async (req, res) => {
    try {
        const { userId, addressId, address } = req.body;
        if (userId.length < 10) { res.json({ status: 'empty' }); return };

        const user = await User.findById(userId);
        var index = user.address.findIndex((state) => state._id === addressId);
        user.address.splice(index, 1);
        user.address.push(address)
        await user.save()
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = { getAddress, addAddress, deleteAddress, editAddress }