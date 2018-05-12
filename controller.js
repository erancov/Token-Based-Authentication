const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const User = require('./model');

module.exports = (req, res, next)=>{
    if(req.body.username && req.body.password){
        User.findOne({username: req.body.username}, (err, result)=>{
            if(err){
               return res.status(400).json({data:null, message:'Username sau Parola e gresita!'});
            }else{
                result.comparePassword(req.body.password, function(err, isMatch){

                    if(isMatch && !err){
                      //create the token
                      let user ={
                        id:result._id
                      }
                      let token = jwt.sign(user, process.env.SECRET_KEY);
                     return res.status(200).json({ resType:'Success', token:'Bearer ' + token, userId:user});
                    }else{
                     return res.json({success: false, message: 'Eroare la autentificare! Verificati Parola sau Username.'});
                    }
                  })
            }
        });
    }else{
        return res.status(401).json({data:null, message:'Username si Parola sunt obligatorii!'});
    }
    

}