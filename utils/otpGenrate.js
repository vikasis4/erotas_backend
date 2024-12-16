const dotenv = require('dotenv');
dotenv.config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.mail_account,
        pass: process.env.mail_pass,
    },
});
async function SendOtp(otp, email) {
    await transporter.sendMail({
        from: process.env.mail_account,
        to: email,
        subject: "EROTAS - OTP Verification",
        html: `<b>Use this OTP to verify your credentials :- ${otp}</b>`,
    });
}

module.exports = SendOtp