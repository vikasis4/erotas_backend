const Products = require('../modals/products')

const AddProduct = async (req, res) => {
    try {
        const { productId, name, price, description, imagesLink, reviews, searchWords } = req.body;
        await Products.create({
            productId, name, price, description, imagesLink, reviews, searchWords
        });
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error })
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        var product = await Products.findOne({ productId: id });
        res.json({ status: 'true', product })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}
const getAll = async (req, res) => {
    try {
        console.log('Working');
        var product = await Products.find({ });
        res.json({ status: 'true', product })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = { AddProduct, getProduct, getAll }