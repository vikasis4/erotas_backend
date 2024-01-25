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
const rzp_router = require('./routes/razorpay')
const address_router = require('./routes/address')
const order_router = require('./routes/order')
const support_router = require('./routes/support')
const wishlist_router = require('./routes/wishList')
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
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.json({ status: "Yes Server Is Working" })
})


/////////////////////////// ROUTE USE /////////////////////////////
app.use('/api/pay', rzp_router)
app.use('/api/auth', auth_routes)
app.use('/api/cart', cart_router)
app.use('/api/order', order_router)
app.use('/api/address', address_router)
app.use('/api/product', product_router)
app.use('/api/support', support_router)
app.use('/api/wishlist', wishlist_router)

app.listen(port, "0.0.0.0", () => {
    console.log("Server is Listening at port : " + port);
});