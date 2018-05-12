const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model');

module.exports = (passport)=>{
    let opts = {
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    };
    passport.use(new JwtStrategy(opts, (jwt_playload, done)=>{
        User.findOne({_id:jwt_playload.id},(err, user)=>{
            if(err) done(err, false);
            if(user) done(null, user);
            else done(null, false);
        });
    }));
};