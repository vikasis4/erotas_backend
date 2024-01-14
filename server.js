const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const cookieParser = require('cookie-parser');
const connectToDb = require('./mongodb');

/////////////////////////// ROUTE DECLARE /////////////////////////////
const auth_routes = require('./routes/auth')
const product_router = require('./routes/product')
const cart_router = require('./routes/cart')

/////////////////////////// INITIALIZE /////////////////////////////
const app = express();
app.use(cookieParser());

app.use(cors('*'));
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var make = path.join(__dirname, 'public');
app.use(express.static(make));
dotenv.config();
const port = 3001;



/////////////////////////// ROUTE USE /////////////////////////////
app.use('/api/auth', auth_routes)
app.use('/api/product', product_router)
app.use('/api/cart', cart_router)

app.listen(port, () => {
    console.log("Server is Listening at port : " + port);
});