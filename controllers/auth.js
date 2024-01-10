const User = require('../modals/user');
const SendOtp = require('../utils/otpGenrate')

const login = async (req, res) => {

}
const register = async (req, res) => {
    const { email, name } = req.body.email;
    try {
        var user = await User.findOne({ email: email });
        if (user) {
            return res.json({ status: 'user' })
        }
        var otp = Math.floor(1000 + Math.random() * 9000);
        await User.create({
            email,
            name,
            otp
        });
        await SendOtp(otp);
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

const otpVerify = (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}
module.exports = { login, register, otpVerify }