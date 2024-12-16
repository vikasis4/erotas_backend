const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()


const URL = process.env.mongoLiveConnectionString
// const URL = 'mongodb+srv://vikasisgen:qMvYX54J6E92GeGw@erota.3pfcjhe.mongodb.net/?retryWrites=true&w=majority'
mongoose.set("strictQuery", false);

const connectToDb = async () => {
    await mongoose.connect(URL).then(() => {
        console.log('Connected to Database successfully');
    }).catch((error) => {
        console.log('Failed to connect to Database : ' + error);
    })
}

module.exports = connectToDb