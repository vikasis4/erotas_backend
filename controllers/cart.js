const User = require('../modals/user');
const createCart = require('../utils/createCart')

const AddToCart = async (req, res) => {
    try {
        var { userId, productId } = req.body;
        var user = await User.findById(userId);
        var index = user.cart.findIndex((state) => state.productId === productId);
        if (index === -1) {
            var newCart = await createCart(productId)
            user.cart.push(newCart);
        } else {
            user.cart[index].qty += 1
        }
        await user.save()
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

const RemoveFromCart = async (req, res) => {
    try {
        var { userId, productId } = req.body;
        if (!userId || !productId) {
            res.json({ status: 'error' })
            return            
        }
        var user = await User.findById(userId);
        var index = user.cart.findIndex((data) => data.productId === productId);
        if (user.cart[index].qty === 1) {
            user.cart.splice(index, 1)
        } else {
            user.cart[index].qty -= 1
        }
        await user.save()
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}
const GetCart = async (req, res) => {
    try {
        var { userId } = req.params;
        if (userId.length < 20) {
            res.json({ status: 'empty' });
            return
        }
        var user = await User.findById(userId);
        res.json({ status: 'true', cart: user.cart })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = { AddToCart, RemoveFromCart, GetCart }