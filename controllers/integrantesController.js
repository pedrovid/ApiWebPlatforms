const express = require('express');
const Integrante = require('../models/integrante');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

//login = email y password

//const jwtKey = config.get("secret.key");
//user => email, name, last_name, password

// todos los elementos GET / => list
function list(req, res, next) {
  Integrante.find().populate({path:'_miembro'})
    .then(obj =>
      res.status(200).json({
       message:res.__('succeed'),
       objs:obj
    })).catch(err => res.status(500).json({
      message: res.__('err.load.many', {"item":"integrantes"}),
      objs: err
    }));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Integrante.findOne({"_id":id}).populate({path:'_miembro'})
    .then(obj => res.status(200).json({
      message:res.__('succeed'),
      objs: obj
    })).catch(err => res.status(500).json({
      //message: `error al cargar el usuario del sistema con id = ${id}`,
      message: res.__('err.load.one', {"id":id,"item":"integrante"}),
      objs: err
    }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let miembro = req.body.miembro;
  let rol = req.body.rol;

  let integrante = new Integrante({
    _miembro:miembro,
    _rol:rol,
  });

  integrante.save().then(obj => res.status(200).json({
          message : res.__('succeed'),
          objs: obj
        })).catch(err => res.status(500).json({
          message:res.__('err.create.one', {"item":"integrante"}),
          objs: err
      }));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  let miembro = req.body.miembro;
  let rol = req.body.rol;

  Integrante.findOne({"_id":id}).then(exp => {
    exp._miembro = (miembro!=null) ? miembro:exp._miembro;
    exp._rol = (rank!=null) ? rank:exp._rol;

    exp.save().then(obj => {
      res.status(200).json({
          message : res.__('succeed'),
          objs: obj
        }).catch(err => res.status(500).json({
          message: res.__('err.update.one', {"id":id,"item":"integrante"}),
          objs: err
      }))
    })

  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Integrante.remove({"_id":id}).then(obj => res.status(200).json({
    message:res.__('succeed'),
    objs: obj
  })).catch(err => res.status(500).json({
    message: res.__('err.delete.one', {"id":id,"item":"integrante"}),
    objs: err
  }));
}

module.exports = {
  list, index, create, update, destroy
}
