const User = require("../modals/user");

const getPrice = async (userId) => {
    try {
        var user = await User.findById(userId);
        var cart = user.cart;
        var price = 0;
        for (let i = 0; i < cart.length; i++) {
            for (let j = 0; j < cart[i].qty; j++) {
                price = price + cart[i].price
            }
        }
        return price;
    } catch (error) {
        console.log(error);
        return 0
    }
}

module.exports = getPrice