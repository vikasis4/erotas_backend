const User = require('../modals/user')

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users);
    } catch (error) {
        res.status(500);
        console.log(error);
    }
}

module.exports = { getUsers };