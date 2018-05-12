const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const port = process.env.LOCAL_PORT;
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const expressJwt = require("express-jwt");
const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

app.use(passport.initialize());
require('./passport/passport_auth')(passport);

app.use(expressJwt({ secret: process.env.SECRET_KEY}).unless({path: ['/api/login']}));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(403).send('Unauthorized! Please provide a valid token.');
        return
    }
    next();
  });

app.use('/api', require('./route'));


app.listen(port, ()=> console.log('Running on port: ' + port));