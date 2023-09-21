const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json()); // to parse JSON data
app.use(cookieParser()); // to parse cookie data

// Parse incoming form data and files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// root import
const product = require('./routes/ProductRoute'); // import product route
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

module.exports = app;
