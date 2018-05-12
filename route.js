const express = require('express');
const Ctrl = require('./controller');
let route = express.Router();
const passport = require('passport');

route.post('/login', Ctrl);
route.post('/protected',passport.authenticate('jwt', { session: false }), (req,res)=>{
    res.status(200).json({header:req.headers});
    console.log('protected ',  req.body);
})

module.exports = route;