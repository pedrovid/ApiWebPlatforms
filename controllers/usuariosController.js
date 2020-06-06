const express = require('express');
const Usuario = require('../models/usuario');
const async = require('async');
const bcrypt = require('bcrypt');


//user => email, name, last_name, password

// todos los elementos GET / => list
function list(req, res, next) {
  Usuario.find().then(obj => res.status(200).json({
    message:res.__('succeed'),
    objs: obj
  })).catch(err => res.status(500).json({
    message: res.__('err.load.many', {"id":id, "type":"usuarios"}),
    objs: err
  }));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Usuario.findOne({"_id":id}).then(obj => res.status(200).json({
    message:res.__('succeed'),
    objs: obj
  })).catch(err => res.status(500).json({
    //message: `error al cargar el usuario del sistema con id = ${id}`,
    message: res.__('err.load.one', {"id":id, "type":"usuario"}),
    objs: err
  }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let email = req.body.email;
  let name = req.body.name;
  let lastName = req.body.lastName;
  let password = req.body.password;

  async.parallel({
    salt:(callback)=>{
      bcrypt.genSalt(10, callback);
    }
  }, (err, result)=>{
    bcrypt.hash(password, result.salt, (err, hash) =>{

      let user = new Usuario({
        _email :email,
        _name: name,
        _lastName: lastName,
        _password : hash,
        _salt:result.salt
      });

      user.save().then(obj => res.status(200).json({
          message : res.__('succeed'),
          objs: obj
        })).catch(err => res.status(500).json({
          message: res.__('err.create.one', {"type":"usuario"}),
          objs: err
      }));
    });
  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Usuario.remove({"_id":id}).then(obj => res.status(200).json({
    message:res.__('succeed'),
    objs: obj
  })).catch(err => res.status(500).json({
    message: res.__('err.delete.one', {"id":id, "type":"usuario"}),
    objs: err
  }));
}

module.exports = {
  list, index, create, destroy
}
