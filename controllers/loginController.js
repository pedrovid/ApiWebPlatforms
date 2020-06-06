const express = require('express');
const Usuario = require('../models/usuario');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//login = email y password

const jwtKey = config.get("secret.key");

module.exports = {
  login: (req, res, next) => {
    async.parallel({
      user: callback => Usuario.findOne({_email:req.body.email})
          .select('_password _salt')
          .exec(callback)
    }, (err, result)=>{
      if(result.user){
        bcrypt.hash(req.body.password, result.user.salt, (err, hash) =>{
          if(hash === result.user.password){
            res.status(200).json(
              {
                "message":"login ok",
                "objs": jwt.sign(result.user.id, jwtKey)
              });
          }else{
            res.status(403).json({"message":"user or password are wrong"});
          }
        });
      }else{
        res.status(403).json({"message":"user or password are wrong"});
      }
    });
  }
}
