const Support = require('../modals/support');

const addQuery = async (req, res) => {
    try {
        var { userId, phone } = req.body;
        await Support.create({
            userId,
            phone
        })
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' });
    }
}

const getQuery = async (req, res) => {
    try {
        var { userId } = req.params;
        var support = await Support.findOne({ userId });
        res.json({ status: 'true', support })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' });
    }
}

module.exports = { addQuery, getQuery }