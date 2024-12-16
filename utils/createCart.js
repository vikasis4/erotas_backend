const Products = require('../modals/products');

const createCart = async (productId) => {
    try {
        var product = await Products.findOne({ productId });
        var cart = {
            name: product.name,
            price: product.price,
            productId,
            imageLink: product.imagesLink[0],
            qty: 1
        }
        return cart
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = createCart;