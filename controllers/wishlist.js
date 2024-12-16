const User = require('../modals/user');
const createCart = require('../utils/createCart')

const AddToWishList = async (req, res) => {
    try {
        var { userId, productId } = req.body;
        if (!userId || !productId) {
            res.json({ status: 'error' })
            return
        }
        var user = await User.findById(userId);
        var wishList = await createCart(productId)
        user.wishList.push(wishList);
        await user.save()
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

const RemoveFromWishList = async (req, res) => {
    try {
        var { userId, productId } = req.body;
        if (!userId || !productId) {
            res.json({ status: 'error' })
            return
        }
        var user = await User.findById(userId);
        var index = user.wishList.findIndex((data) => data.productId === productId);
        user.wishList.splice(index, 1)
        await user.save()
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}
const GetWishList = async (req, res) => {
    try {
        var { userId } = req.params;
        if (userId.length < 20) {
            res.json({ status: 'empty' });
            return
        }

        var user = await User.findById(userId);
        res.json({ status: 'true', wishList: user.wishList })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = { GetWishList, RemoveFromWishList, AddToWishList }