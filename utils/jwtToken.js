var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config()

const createToken = async (data) => {

    try {
        var token = jwt.sign(JSON.stringify({
            email: data.email, _id: data._id, name: data.name,
        }), process.env.secretTokenKey);
        data.tokens.push({ token });
        return token;
    } catch (error) {
        console.log(error);
        return 'false'
    }

}

const verifyToken = async (data) => {

    try {
        var token = jwt.verify(data, process.env.secretTokenKey);
        return token;
    } catch (error) {
        console.log(error);
        return 'false'
    }
    
}

module.exports = { createToken, verifyToken };