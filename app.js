// Basic Lib Import
const express = require('express')
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// env implementation
dotenv.config({path: "./config.env"});

// Security middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


// Database Lib Import
const mongoose = require('mongoose');
const path = require('path');


// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())


// Body Parser Implement
app.use(bodyParser.json());


// Request Rate Limit
const limiter = rateLimit({windowMs: 15*60*1000, max: 3000})
app.use(limiter)


// Mongo DB Database Connection
let URI = 'mongodb://127.0.0.1:27017/NewTodo';
let OPTION = {user: '', pass: ''}
mongoose.connect(URI, OPTION, error => {
    if (error){
        console.log('Database connection fail, the error is: ' + error)
    }else{
        console.log('DB Connection Success')
    }
})


//Tagging frontend
// app.use(express.static('client/build'));
// app.use('*', (req, res) => {
//     req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });


// Routing Implement
app.use('/api/v1', router);


// Undefined Route Implement
// app.use('*', (req, res) => {
//     res.status(404)/json({ status: 'fail', data: 'Not Found'});
// });

module.exports = app;
