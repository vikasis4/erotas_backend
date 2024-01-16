const User = require('../modals/user');
const SendOtp = require('../utils/otpGenrate');
const { createToken, verifyToken } = require('../utils/jwtToken');

////////////////////////////// LOGIN /////////////////////////////
const login = async (req, res) => {
    try {
        var { email } = req.body;
        var user = await User.findOne({ email });
        if (!user) {
            res.json({ status: 'nouser' })
            return
        }
        var otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp;
        await user.save();
        await SendOtp(otp, email);
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

////////////////////////////// REGISTER /////////////////////////////
const register = async (req, res) => {
    try {
        const { email, name } = req.body;
        var user = await User.findOne({ email: email });
        if (user) {
            return res.json({ status: 'user' })
        }
        var newOtp = Math.floor(1000 + Math.random() * 9000);
        await User.create({
            email,
            name,
            otp: newOtp
        });
        await SendOtp(newOtp, email);
        res.json({ status: 'true' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

////////////////////////////// OTP HANDLE /////////////////////////////
const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;
        var user = await User.findOne({ email: email });
        if (!user) { return res.json({ status: 'error' }) };
        if (user.otp === JSON.parse(otp)) {
            var token = await createToken(user);
            if (token === 'false') { return res.json({ status: 'error' }) };
            await user.save();
            res.json({ status: 'true', token })
        } else {
            res.json({ status: 'false' })
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

const otpGenrate = (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}


////////////// JWT TOKEN HANDLE //////////////////////////////////
const tokenVerify = async (req, res) => {
    try {
        var { token } = req.params;
        if (token === 'null') { return res.json({ status: 'null' }) }
        var data = await verifyToken(token);
        res.json({ status: 'true', data });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

module.exports = { login, register, otpVerify, otpGenrate, tokenVerify }