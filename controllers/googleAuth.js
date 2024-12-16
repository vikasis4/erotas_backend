const User = require('../modals/user');
const { createToken } = require('../utils/jwtToken');

const googleAuth = async (req, res) => {
    try {
        const { email, name } = req.body;
        var user = await User.findOne({ email: email });
        if (user) {
            var token = await createToken(user);
            return res.json({ status: 'true', token })
        }
        var newUser = await User.create({
            email,
            name,
        });
        var token = await createToken(newUser);
        res.json({ status: 'true', token })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = googleAuth