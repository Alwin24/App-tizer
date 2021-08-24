const express = require('express');
const app = express();
// const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });
// dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ limit: "40mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());


const dishes = require('./routes/dish');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

app.use('/api/v1', dishes);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', order);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);

module.exports = app